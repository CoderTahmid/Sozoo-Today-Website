import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {
	FiArrowUpRight,
	FiClock,
	FiFilter,
	FiFlag,
	FiGlobe,
	FiRefreshCw,
	FiSearch,
	FiShare2,
} from "react-icons/fi";

const API_BASE = "https://graph.facebook.com/v23.0";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
const SCROLL_GESTURE_LOCK_IN_MS = 620;
const WHEEL_DELTA_THRESHOLD = 12;
const TOUCH_DELTA_THRESHOLD = 36;

const NATIONAL_FEEDS = [
	{ name: "Dhaka Tribune", url: "https://www.dhakatribune.com/feed/" },
	{ name: "Prothom Alo English", url: "https://prod-qt-images.s3.amazonaws.com/production/prothomalo-english/feed.xml" },
	{ name: "The Business Standard", url: "https://www.tbsnews.net/top-news/rss.xml" },
	{ name: "The Daily Ittefaq", url: "https://en.ittefaq.com.bd/feed/" },
	{ name: "Prothom Alo Bangla", url: "https://prod-qt-images.s3.amazonaws.com/production/prothomalo-bangla/feed.xml" },
	{ name: "Bangla News 24", url: "https://www.banglanews24.com/rss/rss.xml" },
	{ name: "Samakal", url: "https://samakal.com/rss" },
	{ name: "Dhaka Post", url: "https://www.dhakapost.com/rss/rss.xml" },
	{ name: "Channel 24", url: "https://www.channel24bd.tv/rss/rss.xml" },
	{ name: "Kaler Kantho", url: "https://www.kalerkantho.com/rss.xml" },
];

const INTERNATIONAL_FEEDS = [
	{ name: "BBC News", url: "https://feeds.bbci.co.uk/news/world/rss.xml" },
	{ name: "New York Times", url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml" },
	{ name: "ABC News", url: "https://abcnews.go.com/abcnews/usheadlines" },
	{ name: "CNN", url: "https://rss.app/feeds/9F5p3m4XQpJbsBbL.xml" },
	{ name: "The Guardian", url: "https://www.theguardian.com/international/rss" },
	{ name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml" },
	{ name: "The Wall Street Journal", url: "https://feeds.content.dowjones.io/public/rss/RSSWorldNews" },
	{ name: "The Washington Post", url: "https://feeds.washingtonpost.com/rss/world" },
	{ name: "Bloomberg", url: "https://feeds.bloomberg.com/markets/news.rss" },
];

const postTextVariants = {
	initial: (direction) => ({
		opacity: 0,
		y: direction === "up" ? -16 : 16,
	}),
	animate: {
		opacity: 1,
		y: 0,
	},
	exit: (direction) => ({
		opacity: 0,
		y: direction === "up" ? 12 : -12,
	}),
};

const formatTimestamp = (timestamp) => {
	const date = new Date(timestamp);

	if (Number.isNaN(date.getTime())) {
		return "Just now";
	}

	return new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
	}).format(date);
};

const getTimestampValue = (timestamp) => new Date(timestamp).getTime();

const getMediaType = (mediaUrl = "") => {
	if (/\.(mp4|mov|webm)(\?|$)/i.test(mediaUrl)) {
		return "video";
	}

	return "image";
};

const isImagePost = (post) => {
	if (post.media_type) {
		return post.media_type === "IMAGE";
	}

	return /\.(avif|gif|jpe?g|png|webp)(\?|$)/i.test(post.media_url || "");
};

// RSS helpers
const decodeHtmlEntities = (text) => {
	if (!text) return "";
	const txt = document.createElement("textarea");
	txt.innerHTML = text;
	return txt.value;
};

const parseRssDate = (dateStr) => {
	if (!dateStr) return null;
	const str = String(dateStr).trim();

	// 1. Direct standard parse
	let date = new Date(str);
	if (!Number.isNaN(date.getTime()) && date.getFullYear() >= 2020) {
		return date;
	}

	// 2. Clean weekday names (Wednesday, Wed, etc.) and commas
	const cleanStr = str.replace(/^[A-Za-z]+,\s*/, "").replace(/,\s*/g, " ");
	date = new Date(cleanStr);
	if (!Number.isNaN(date.getTime()) && date.getFullYear() >= 2020) {
		return date;
	}

	// 3. Try ISO format with T and Z
	if (cleanStr.includes(" ") && !cleanStr.includes("T")) {
		date = new Date(cleanStr.replace(" ", "T") + "Z");
		if (!Number.isNaN(date.getTime()) && date.getFullYear() >= 2020) {
			return date;
		}
	}

	// 4. Try replacing slashes
	date = new Date(cleanStr.replace(/-/g, "/"));
	if (!Number.isNaN(date.getTime()) && date.getFullYear() >= 2020) {
		return date;
	}

	return null;
};

const formatTimeAgo = (timestamp) => {
	const diffMs = Date.now() - timestamp;
	const diffMins = Math.max(1, Math.floor(diffMs / (60 * 1000)));
	if (diffMins < 60) {
		return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
	}
	const hours = Math.floor(diffMins / 60);
	const mins = diffMins % 60;
	if (mins === 0) {
		return `${hours} hr${hours > 1 ? "s" : ""} ago`;
	}
	return `${hours} hr${hours > 1 ? "s" : ""} ${mins}m ago`;
};

const formatExactTime = (timestamp) => {
	const date = new Date(timestamp);
	if (Number.isNaN(date.getTime())) return "Recent";
	return new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	}).format(date);
};

const parseRssXml = (xmlText, sourceName, fallbackUrl) => {
	if (!xmlText) return [];
	try {
		const parser = new DOMParser();
		const doc = parser.parseFromString(xmlText, "text/xml");
		if (doc.querySelector("parsererror")) {
			return [];
		}

		const items = Array.from(doc.querySelectorAll("item, entry"));
		return items.map((el) => {
			const title = el.querySelector("title")?.textContent?.trim() || "Untitled";

			let link =
				el.querySelector("link")?.textContent?.trim() ||
				el.querySelector("link")?.getAttribute("href") ||
				el.querySelector("guid")?.textContent?.trim() ||
				el.querySelector("id")?.textContent?.trim() ||
				fallbackUrl;

			if (!link || link.length < 5) {
				link = el.querySelector("link")?.getAttribute("href") || fallbackUrl;
			}

			const pubDate =
				el.querySelector("pubDate, published, updated, dc\\:date, date")?.textContent?.trim() || "";

			return {
				title: decodeHtmlEntities(title),
				link,
				pubDate,
				source: sourceName,
			};
		});
	} catch (err) {
		void err;
		return [];
	}
};

const fetchSingleRssFeed = async (feed, signal) => {
	// Strategy 1: Vite / Backend Server Proxy (Fastest & No CORS)
	try {
		const res = await fetch(`/api/rss?url=${encodeURIComponent(feed.url)}`, { signal });
		if (res.ok) {
			const xmlText = await res.text();
			const parsed = parseRssXml(xmlText, feed.name, feed.url);
			if (parsed.length > 0) {
				return parsed;
			}
		}
	} catch (err) {
		void err;
	}

	// Strategy 2: api.rss2json.com
	try {
		const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`, { signal });
		if (res.ok) {
			const data = await res.json();
			if (data.status === "ok" && Array.isArray(data.items) && data.items.length > 0) {
				return data.items.map((item) => ({
					title: decodeHtmlEntities(item.title || "Untitled"),
					link: item.link || item.guid || feed.url,
					pubDate: item.pubDate || "",
					source: feed.name,
				}));
			}
		}
	} catch (err) {
		void err;
	}

	// Strategy 3: allorigins.win JSON wrapper
	try {
		const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`, { signal });
		if (res.ok) {
			const data = await res.json();
			const xmlText = data.contents;
			const parsed = parseRssXml(xmlText, feed.name, feed.url);
			if (parsed.length > 0) {
				return parsed;
			}
		}
	} catch (err) {
		void err;
	}

	// Strategy 4: Direct fetch (for S3 or CORS-enabled origins)
	try {
		const res = await fetch(feed.url, { signal });
		if (res.ok) {
			const xmlText = await res.text();
			const parsed = parseRssXml(xmlText, feed.name, feed.url);
			if (parsed.length > 0) {
				return parsed;
			}
		}
	} catch (err) {
		void err;
	}

	return [];
};

const NewsSection = () => {
	const accountId = import.meta.env.VITE_SOZOO_TODAY_IG_ACCOUNT_ID;
	const accessToken = import.meta.env.VITE_SOZOO_TODAY_ACCESS_TOKEN;

	// Instagram posts state
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Tab states
	const [activeTab, setActiveTab] = useState("latest"); // 'latest' (Sozoo Picks) | 'external' (External Picks)
	const [externalCategory, setExternalCategory] = useState("national"); // 'national' | 'international' (national by default)

	// External RSS state
	const [rssNews, setRssNews] = useState({
		national: [],
		international: [],
	});
	const [rssLoading, setRssLoading] = useState(false);
	const [rssError, setRssError] = useState("");
	const [selectedPlatform, setSelectedPlatform] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [lastRefreshedAt, setLastRefreshedAt] = useState(null);

	// Instagram interaction state
	const [likedPosts, setLikedPosts] = useState(() => new Set());
	const [activeIndex, setActiveIndex] = useState(0);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [scrollDirection, setScrollDirection] = useState("down");
	const [shareMessage, setShareMessage] = useState("");
	const feedRef = useRef(null);
	const activeIndexRef = useRef(0);
	const scrollLockRef = useRef(false);
	const scrollLockTimeoutRef = useRef(0);
	const touchStartYRef = useRef(null);
	const wheelDeltaRef = useRef(0);

	// Fetch Instagram posts
	useEffect(() => {
		const controller = new AbortController();

		const fetchPosts = async () => {
			try {
				setLoading(true);
				setError("");

				const fields = "id,caption,media_url,permalink,timestamp,like_count,media_type";
				const url = `${API_BASE}/${accountId}/media?fields=${fields}&access_token=${encodeURIComponent(accessToken)}`;

				const response = await fetch(url, {
					signal: controller.signal,
				});

				if (!response.ok) {
					throw new Error("Failed to fetch posts.");
				}

				const data = await response.json();
				const cutoff = Date.now() - SEVEN_DAYS;

				const filtered = (data.data || []).filter((post) => {
					const time = getTimestampValue(post.timestamp);
					return !Number.isNaN(time) && time >= cutoff && post.media_url && post.permalink && isImagePost(post);
				});

				setPosts(filtered);
			} catch (err) {
				if (err.name !== "AbortError") {
					setError("Unable to load news.");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();

		return () => controller.abort();
	}, [accountId, accessToken]);

	// Fetch RSS Feeds for current external category
	useEffect(() => {
		if (activeTab !== "external") {
			return undefined;
		}

		const controller = new AbortController();
		const feeds = externalCategory === "national" ? NATIONAL_FEEDS : INTERNATIONAL_FEEDS;

		const loadRss = async () => {
			try {
				setRssLoading(true);
				setRssError("");

				const results = await Promise.allSettled(
					feeds.map((feed) => fetchSingleRssFeed(feed, controller.signal))
				);

				const cutoff = Date.now() - TWO_HOURS_MS;
				const allItems = [];

				results.forEach((result) => {
					if (result.status === "fulfilled" && Array.isArray(result.value)) {
						result.value.forEach((item) => {
							const dateObj = parseRssDate(item.pubDate);
							if (dateObj) {
								const timestamp = dateObj.getTime();
								// Filter last 2 hours (with 10-minute future buffer for clock skews)
								if (timestamp >= cutoff && timestamp <= Date.now() + 10 * 60 * 1000) {
									allItems.push({
										...item,
										timestamp,
										dateObj,
									});
								}
							}
						});
					}
				});

				// Sort by publish date descending
				allItems.sort((a, b) => b.timestamp - a.timestamp);

				setRssNews((prev) => ({
					...prev,
					[externalCategory]: allItems,
				}));
				setLastRefreshedAt(Date.now());
			} catch (err) {
				if (err.name !== "AbortError") {
					setRssError("Failed to fetch live RSS news. Please click Refresh.");
				}
			} finally {
				setRssLoading(false);
			}
		};

		loadRss();

		return () => controller.abort();
	}, [activeTab, externalCategory]);

	// Manual refresh function
	const refreshRss = useCallback(async () => {
		const feeds = externalCategory === "national" ? NATIONAL_FEEDS : INTERNATIONAL_FEEDS;

		try {
			setRssLoading(true);
			setRssError("");

			const results = await Promise.allSettled(
				feeds.map((feed) => fetchSingleRssFeed(feed))
			);

			const cutoff = Date.now() - TWO_HOURS_MS;
			const allItems = [];

			results.forEach((result) => {
				if (result.status === "fulfilled" && Array.isArray(result.value)) {
					result.value.forEach((item) => {
						const dateObj = parseRssDate(item.pubDate);
						if (dateObj) {
							const timestamp = dateObj.getTime();
							if (timestamp >= cutoff && timestamp <= Date.now() + 10 * 60 * 1000) {
								allItems.push({
									...item,
									timestamp,
									dateObj,
								});
							}
						}
					});
				}
			});

			allItems.sort((a, b) => b.timestamp - a.timestamp);

			setRssNews((prev) => ({
				...prev,
				[externalCategory]: allItems,
			}));
			setLastRefreshedAt(Date.now());
		} catch (err) {
			void err;
			setRssError("Failed to refresh live RSS news.");
		} finally {
			setRssLoading(false);
		}
	}, [externalCategory]);

	// Sozoo Picks
	const latestNews = useMemo(() => {
		return [...posts].sort((a, b) => getTimestampValue(b.timestamp) - getTimestampValue(a.timestamp));
	}, [posts]);

	const visiblePosts = latestNews;
	const safeActiveIndex = visiblePosts.length > 0 ? Math.min(activeIndex, visiblePosts.length - 1) : 0;
	const activePost = visiblePosts[safeActiveIndex] ?? null;
	const textParallaxY = (0.5 - scrollProgress) * 12;
	const textParallaxOpacity = 0.9 + scrollProgress * 0.1;

	const changeTab = (tab) => {
		setActiveTab(tab);
		setActiveIndex(0);
		setScrollProgress(0);
		setSelectedPlatform("all");
		setSearchQuery("");
	};

	const changeExternalCategory = (cat) => {
		setExternalCategory(cat);
		setSelectedPlatform("all");
		setSearchQuery("");
	};

	const handleLike = (postId) => {
		setLikedPosts((currentLikes) => {
			const nextLikes = new Set(currentLikes);
			if (nextLikes.has(postId)) {
				nextLikes.delete(postId);
			} else {
				nextLikes.add(postId);
			}
			return nextLikes;
		});
	};

	const handleShare = async (post) => {
		const shareData = {
			title: "Sozoo Today Picks",
			text: post.caption?.slice(0, 120) || "Open this post from Sozoo Today Picks.",
			url: post.permalink,
		};

		try {
			if (navigator.share) {
				await navigator.share(shareData);
				return;
			}

			await navigator.clipboard.writeText(post.permalink);
			setShareMessage("Link copied");
		} catch {
			setShareMessage("Share unavailable");
		}
	};

	const handleReadMore = (post) => {
		if (!post.permalink) {
			setShareMessage("Post link unavailable");
			return;
		}

		window.open(post.permalink, "_blank", "noopener,noreferrer");
	};

	const navigateByStep = useCallback(
		(step) => {
			if (activeTab !== "latest" || step === 0 || scrollLockRef.current) {
				return false;
			}

			const currentIndex = activeIndexRef.current;
			const nextIndex = Math.min(Math.max(currentIndex + step, 0), visiblePosts.length - 1);

			if (nextIndex === currentIndex) {
				return false;
			}

			scrollLockRef.current = true;
			wheelDeltaRef.current = 0;
			setScrollDirection(step < 0 ? "up" : "down");
			activeIndexRef.current = nextIndex;
			setActiveIndex(nextIndex);
			setScrollProgress(0.5);

			window.clearTimeout(scrollLockTimeoutRef.current);
			scrollLockTimeoutRef.current = window.setTimeout(() => {
				scrollLockRef.current = false;
			}, SCROLL_GESTURE_LOCK_IN_MS);

			return true;
		},
		[activeTab, visiblePosts.length]
	);

	useEffect(() => {
		activeIndexRef.current = safeActiveIndex;
	}, [safeActiveIndex]);

	useEffect(() => {
		if (!shareMessage) {
			return undefined;
		}

		const timeout = window.setTimeout(() => setShareMessage(""), 2200);
		return () => window.clearTimeout(timeout);
	}, [shareMessage]);

	useEffect(() => {
		const feedElement = feedRef.current;

		if (activeTab !== "latest" || !feedElement || visiblePosts.length <= 1) {
			return undefined;
		}

		const handleWheel = (event) => {
			event.preventDefault();

			if (scrollLockRef.current) {
				return;
			}

			wheelDeltaRef.current += event.deltaY;

			if (Math.abs(wheelDeltaRef.current) < WHEEL_DELTA_THRESHOLD) {
				return;
			}

			navigateByStep(wheelDeltaRef.current > 0 ? 1 : -1);
		};

		const handleTouchStart = (event) => {
			touchStartYRef.current = event.touches[0]?.clientY ?? null;
		};

		const handleTouchMove = (event) => {
			const touchStartY = touchStartYRef.current;
			const currentY = event.touches[0]?.clientY;

			if (touchStartY === null || currentY === undefined) {
				return;
			}

			event.preventDefault();

			const deltaY = touchStartY - currentY;

			if (Math.abs(deltaY) < TOUCH_DELTA_THRESHOLD) {
				return;
			}

			if (navigateByStep(deltaY > 0 ? 1 : -1)) {
				touchStartYRef.current = currentY;
			}
		};

		feedElement.addEventListener("wheel", handleWheel, { passive: false });
		feedElement.addEventListener("touchstart", handleTouchStart, { passive: true });
		feedElement.addEventListener("touchmove", handleTouchMove, { passive: false });

		return () => {
			feedElement.removeEventListener("wheel", handleWheel);
			feedElement.removeEventListener("touchstart", handleTouchStart);
			feedElement.removeEventListener("touchmove", handleTouchMove);
		};
	}, [activeTab, navigateByStep, visiblePosts.length]);

	useEffect(() => {
		return () => {
			window.clearTimeout(scrollLockTimeoutRef.current);
		};
	}, []);

	// Filter RSS news based on platform and search query
	const currentRssList = useMemo(() => {
		return rssNews[externalCategory] || [];
	}, [rssNews, externalCategory]);

	const availablePlatforms = useMemo(() => {
		const counts = {};
		currentRssList.forEach((item) => {
			counts[item.source] = (counts[item.source] || 0) + 1;
		});
		return counts;
	}, [currentRssList]);

	const filteredRssNews = useMemo(() => {
		return currentRssList.filter((item) => {
			const matchesPlatform = selectedPlatform === "all" || item.source === selectedPlatform;
			const matchesSearch =
				!searchQuery.trim() ||
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.source.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesPlatform && matchesSearch;
		});
	}, [currentRssList, selectedPlatform, searchQuery]);

	// Sozoo Picks Section
	const latestSection = !activePost ? (
		<div className="rounded-4xl border border-white/10 bg-white/6 px-5 py-8 text-center text-sm text-white/70 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
			No posts available yet.
		</div>
	) : (
		<div className="mx-auto w-full max-w-107.5 px-4 pb-8 pt-4 sm:px-6">
			<div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/55">
				<span>Sozoo Today Picks</span>
				<span>{visiblePosts.length > 0 ? `${safeActiveIndex + 1}/${visiblePosts.length}` : "0/0"}</span>
			</div>

			<div ref={feedRef} className="relative touch-none overscroll-contain pt-2">
				<div className="sticky top-3 z-10 mx-auto w-full max-w-4xl sm:top-4">
					<div className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#0b1220] shadow-[0_22px_70px_rgba(0,0,0,0.45)]">
						<div className="flex h-[clamp(35rem,calc(100svh-2rem),56rem)] flex-col sm:h-[clamp(38rem,calc(100svh-2.5rem),60rem)]">
							<AnimatePresence mode="wait">
								<motion.div
									key={activePost.id}
									initial={{ opacity: 0, scale: 0.99 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 1.01 }}
									transition={{ duration: 0.34, ease: "easeOut" }}
									className="relative min-h-0 flex-1"
								>
									{getMediaType(activePost.media_url) === "video" ? (
										<video
											className="absolute inset-0 h-full w-full object-cover object-center"
											src={activePost.media_url}
											autoPlay
											muted
											loop
											playsInline
										/>
									) : (
										<img
											className="absolute inset-0 h-full w-full object-cover object-center"
											src={activePost.media_url}
											alt="News background"
											loading="lazy"
										/>
									)}

									<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%),linear-gradient(to_bottom,rgba(3,6,11,0.08)_0%,rgba(3,6,11,0.5)_55%,rgba(3,6,11,0.94)_100%)]" />
								</motion.div>
							</AnimatePresence>

							<div className="shrink-0 border-t border-white/10 bg-[#f7f4ef] px-4 py-3 text-slate-900 sm:px-5 sm:py-4">
								<AnimatePresence mode="wait" custom={scrollDirection}>
									<motion.div
										key={activePost.id}
										custom={scrollDirection}
										variants={postTextVariants}
										initial="initial"
										animate="animate"
										exit="exit"
										transition={{ duration: 0.24, ease: "easeOut" }}
										className="mx-auto flex w-full max-w-3xl flex-col"
									>
										<div
											style={{
												transform: `translate3d(0, ${textParallaxY}px, 0)`,
												opacity: textParallaxOpacity,
												willChange: "transform",
											}}
										>
											<div className="mb-3 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.26em] text-slate-500">
												<span className="inline-flex items-center gap-1.5">
													<FiClock className="text-[12px]" />
													{formatTimestamp(activePost.timestamp)}
												</span>
												<span>
													{safeActiveIndex + 1} of {visiblePosts.length}
												</span>
											</div>

											<p
												className="text-[1.02rem] leading-[1.55] text-slate-900"
												style={{
													display: "-webkit-box",
													WebkitBoxOrient: "vertical",
													WebkitLineClamp: 5,
													overflow: "hidden",
													whiteSpace: "pre-line",
												}}
											>
												{activePost.caption || "No description was provided for this post."}
											</p>

											<div className="mt-4 grid grid-cols-3 gap-3">
												<button
													type="button"
													onClick={() => handleShare(activePost)}
													className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700 transition active:scale-[0.98]"
												>
													<FiShare2 className="text-[15px]" />
													Share
												</button>

												<button
													type="button"
													onClick={() => handleLike(activePost.id)}
													className={`inline-flex items-center justify-center gap-2 rounded-full border px-3 py-3 text-sm font-semibold transition active:scale-[0.98] ${
														likedPosts.has(activePost.id)
															? "border-rose-200 bg-rose-50 text-rose-600"
															: "border-slate-200 bg-white text-slate-700"
													}`}
												>
													{likedPosts.has(activePost.id) ? (
														<AiFillHeart className="text-[15px]" />
													) : (
														<AiOutlineHeart className="text-[15px]" />
													)}
													Like
												</button>

												<button
													type="button"
													onClick={() => handleReadMore(activePost)}
													className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f1724] px-3 py-3 text-sm font-semibold text-white transition active:scale-[0.98]"
												>
													Read More
													<FiArrowUpRight className="text-[15px]" />
												</button>
											</div>
										</div>
									</motion.div>
								</AnimatePresence>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	// External Picks (RSS Feeds) Section
	const externalSection = (
		<div className="mx-auto w-full max-w-6xl pb-12 pt-2">
			{/* Sub-Tabs: National News vs International News */}
			<div className="mb-6 flex flex-col items-center justify-between gap-4 border-b border-zinc-800 pb-4 sm:flex-row">
				<div className="flex items-center gap-6">
					<button
						type="button"
						onClick={() => changeExternalCategory("national")}
						className={`inline-flex items-center gap-2 pb-2 text-sm font-semibold transition ${
							externalCategory === "national"
								? "border-b-2 border-cyan-400 text-cyan-400"
								: "text-zinc-400 hover:text-white"
						}`}
					>
						<FiFlag className="text-base" />
						<span>National News</span>
						{rssNews.national.length > 0 && (
							<span
								className={`ml-1 rounded-full border px-2 py-0.5 text-xs font-bold ${
									externalCategory === "national"
										? "border-cyan-400/40 text-cyan-400"
										: "border-zinc-700 text-zinc-400"
								}`}
							>
								{rssNews.national.length}
							</span>
						)}
					</button>

					<button
						type="button"
						onClick={() => changeExternalCategory("international")}
						className={`inline-flex items-center gap-2 pb-2 text-sm font-semibold transition ${
							externalCategory === "international"
								? "border-b-2 border-cyan-400 text-cyan-400"
								: "text-zinc-400 hover:text-white"
						}`}
					>
						<FiGlobe className="text-base" />
						<span>International News</span>
						{rssNews.international.length > 0 && (
							<span
								className={`ml-1 rounded-full border px-2 py-0.5 text-xs font-bold ${
									externalCategory === "international"
										? "border-cyan-400/40 text-cyan-400"
										: "border-zinc-700 text-zinc-400"
								}`}
							>
								{rssNews.international.length}
							</span>
						)}
					</button>
				</div>

				{/* Live Status & Refresh Button */}
				<div className="flex items-center gap-3 text-xs text-zinc-400">
					<div className="flex items-center gap-2">
						<span className="relative flex h-2.5 w-2.5">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
							<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
						</span>
						<span className="font-medium text-emerald-400">Past 2 Hours</span>
					</div>

					{lastRefreshedAt && (
						<span className="hidden sm:inline">
							• Updated {formatTimeAgo(lastRefreshedAt)}
						</span>
					)}

					<button
						type="button"
						onClick={refreshRss}
						disabled={rssLoading}
						className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-cyan-400/50 hover:text-cyan-300 disabled:opacity-50"
						title="Refresh latest news"
					>
						<FiRefreshCw className={`text-xs ${rssLoading ? "animate-spin text-cyan-400" : ""}`} />
						<span>Refresh</span>
					</button>
				</div>
			</div>

			{/* Search & Platform Filter Bar */}
			<div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				{/* Platform Filter Pills */}
				<div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 text-xs">
					<span className="mr-1 inline-flex items-center gap-1 text-zinc-400">
						<FiFilter className="text-xs" /> Platform:
					</span>
					<button
						type="button"
						onClick={() => setSelectedPlatform("all")}
						className={`rounded-full border px-3 py-1 font-medium transition ${
							selectedPlatform === "all"
								? "border-cyan-400 text-cyan-400 font-semibold bg-zinc-900"
								: "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white bg-zinc-900"
						}`}
					>
						All ({currentRssList.length})
					</button>

					{Object.entries(availablePlatforms).map(([sourceName, count]) => (
						<button
							key={sourceName}
							type="button"
							onClick={() => setSelectedPlatform(sourceName)}
							className={`rounded-full border px-3 py-1 font-medium transition ${
								selectedPlatform === sourceName
									? "border-cyan-400 text-cyan-400 font-semibold bg-zinc-900"
									: "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white bg-zinc-900"
							}`}
						>
							{sourceName} ({count})
						</button>
					))}
				</div>

				{/* Search Input */}
				<div className="relative w-full max-w-xs shrink-0">
					<FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-500" />
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search headlines..."
						className="w-full rounded-full border border-zinc-800 bg-zinc-900 py-1.5 pl-9 pr-3 text-xs text-white placeholder-zinc-500 outline-none transition focus:border-cyan-400"
					/>
					{searchQuery && (
						<button
							type="button"
							onClick={() => setSearchQuery("")}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
						>
							✕
						</button>
					)}
				</div>
			</div>

			{/* Error Notice if any */}
			{rssError && (
				<div className="mb-6 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-center text-sm text-rose-300">
					{rssError}
				</div>
			)}

			{/* Loading Skeletons */}
			{rssLoading && currentRssList.length === 0 ? (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className="animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
						>
							<div className="mb-3 flex items-center justify-between">
								<div className="h-5 w-24 rounded-full bg-zinc-800" />
								<div className="h-4 w-16 rounded bg-zinc-800" />
							</div>
							<div className="mb-2 h-5 w-full rounded bg-zinc-800" />
							<div className="mb-4 h-5 w-3/4 rounded bg-zinc-800" />
							<div className="h-8 w-28 rounded-full bg-zinc-800" />
						</div>
					))}
				</div>
			) : filteredRssNews.length === 0 ? (
				/* Empty State */
				<div className="my-10 rounded-3xl border border-zinc-800 bg-zinc-900 px-6 py-14 text-center">
					<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/20 text-cyan-400 bg-zinc-800">
						<FiClock className="text-2xl" />
					</div>
					<h3 className="text-lg font-semibold text-white">No news in the last 2 hours</h3>
					<p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
						{searchQuery || selectedPlatform !== "all"
							? "No articles matched your active filter or search query. Try clearing your filters."
							: "None of the subscribed feeds have published new articles in the last 2 hours. Click refresh below to check again."}
					</p>
					<div className="mt-6 flex justify-center gap-3">
						{(searchQuery || selectedPlatform !== "all") && (
							<button
								type="button"
								onClick={() => {
									setSelectedPlatform("all");
									setSearchQuery("");
								}}
								className="rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-semibold text-white hover:border-zinc-500"
							>
								Clear Filters
							</button>
						)}
						<button
							type="button"
							onClick={refreshRss}
							disabled={rssLoading}
							className="inline-flex items-center gap-2 rounded-full border border-cyan-400 bg-transparent px-5 py-2 text-xs font-bold text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-950"
						>
							<FiRefreshCw className={`text-xs ${rssLoading ? "animate-spin" : ""}`} />
							Check Again
						</button>
					</div>
				</div>
			) : (
				/* News Grid */
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{filteredRssNews.map((item, idx) => (
						<article
							key={`${item.source}-${item.link}-${idx}`}
							className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-zinc-800/90 hover:shadow-[0_16px_40px_rgba(34,211,238,0.12)]"
						>
							<div>
								{/* Card Header: Platform badge & Published time */}
								<div className="mb-3 flex items-center justify-between gap-2">
									<span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800/90 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-cyan-300">
										<span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
										{item.source}
									</span>

									<span
										className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-400"
										title={formatExactTime(item.timestamp)}
									>
										<FiClock className="text-[11px] text-cyan-400/70" />
										{formatTimeAgo(item.timestamp)}
									</span>
								</div>

								{/* Headline */}
								<h4 className="text-[15px] font-semibold leading-snug text-white transition group-hover:text-cyan-200">
									<a
										href={item.link}
										target="_blank"
										rel="noopener noreferrer"
										className="focus:outline-none after:absolute after:inset-0"
									>
										{item.title}
									</a>
								</h4>
							</div>

							{/* Card Footer: Timestamp & Read button */}
							<div className="mt-4 flex items-center justify-between border-t border-zinc-800/80 pt-3">
								<span className="text-[11px] text-zinc-400">
									{formatExactTime(item.timestamp)}
								</span>

								<a
									href={item.link}
									target="_blank"
									rel="noopener noreferrer"
									className="relative z-10 inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-300"
								>
									Read Article
									<FiArrowUpRight className="text-sm transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
								</a>
							</div>
						</article>
					))}
				</div>
			)}
		</div>
	);

	if (loading) {
		return (
			<section id="news-section" className="py-10">
				<div className="text-center text-lg">Loading News...</div>
			</section>
		);
	}

	if (error) {
		return (
			<section id="news-section" className="py-10">
				<div className="text-center text-red-500">{error}</div>
			</section>
		);
	}

	return (
		<section id="news-section" className="bg-black py-10 text-white">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Top Tab Bar: Sozoo Picks vs External Picks */}
				<div className="mb-8 flex justify-center">
					<div className="flex border-b border-zinc-800">
						<button
							type="button"
							onClick={() => changeTab("latest")}
							className={`px-6 pb-3 text-lg font-semibold transition ${
								activeTab === "latest"
									? "border-b-2 border-cyan-400 text-cyan-400"
									: "text-zinc-400 hover:text-white"
							}`}
						>
							Sozoo Picks
						</button>

						<button
							type="button"
							onClick={() => changeTab("external")}
							className={`px-6 pb-3 text-lg font-semibold transition ${
								activeTab === "external"
									? "border-b-2 border-cyan-400 text-cyan-400"
									: "text-zinc-400 hover:text-white"
							}`}
						>
							External Picks
						</button>
					</div>
				</div>

				{activeTab === "latest" ? latestSection : externalSection}
			</div>
		</section>
	);
};

export default NewsSection;
