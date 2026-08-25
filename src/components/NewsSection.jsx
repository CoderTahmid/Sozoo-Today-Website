import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {FiArrowUpRight, FiClock, FiShare2} from "react-icons/fi";

const API_BASE = "https://graph.facebook.com/v23.0";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
const SCROLL_GESTURE_LOCK_IN_MS = 620;
const WHEEL_DELTA_THRESHOLD = 12;
const TOUCH_DELTA_THRESHOLD = 36;

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

const NewsSection = () => {
	const accountId = import.meta.env.VITE_SOZOO_TODAY_IG_ACCOUNT_ID;
	const accessToken = import.meta.env.VITE_SOZOO_TODAY_ACCESS_TOKEN;

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const [activeTab, setActiveTab] = useState("latest");
	const [visibleCount, setVisibleCount] = useState(9);
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

	// Sozoo Picks
	const latestNews = useMemo(() => {
		return [...posts].sort((a, b) => getTimestampValue(b.timestamp) - getTimestampValue(a.timestamp));
	}, [posts]);

	// External Picks
	const popularNews = useMemo(() => {
		return [...posts].sort((a, b) => (b.like_count || 0) - (a.like_count || 0)).slice(0, 20);
	}, [posts]);

	const visiblePosts = activeTab === "latest" ? latestNews : popularNews.slice(0, visibleCount);
	const safeActiveIndex = visiblePosts.length > 0 ? Math.min(activeIndex, visiblePosts.length - 1) : 0;
	const activePost = visiblePosts[safeActiveIndex] ?? null;
	const textParallaxY = (0.5 - scrollProgress) * 12;
	const textParallaxOpacity = 0.9 + scrollProgress * 0.1;

	const changeTab = (tab) => {
		setActiveTab(tab);
		setVisibleCount(9);
		setActiveIndex(0);
		setScrollProgress(0);
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

	const navigateByStep = useCallback((step) => {
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
	}, [activeTab, visiblePosts.length]);

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

		feedElement.addEventListener("wheel", handleWheel, {passive: false});
		feedElement.addEventListener("touchstart", handleTouchStart, {passive: true});
		feedElement.addEventListener("touchmove", handleTouchMove, {passive: false});

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
								<motion.div key={activePost.id} initial={{opacity: 0, scale: 0.99}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 1.01}} transition={{duration: 0.34, ease: "easeOut"}} className="relative min-h-0 flex-1">
									{getMediaType(activePost.media_url) === "video" ? (
										<video className="absolute inset-0 h-full w-full object-cover object-center" src={activePost.media_url} autoPlay muted loop playsInline />
									) : (
										<img className="absolute inset-0 h-full w-full object-cover object-center" src={activePost.media_url} alt="News background" loading="lazy" />
									)}

									<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%),linear-gradient(to_bottom,rgba(3,6,11,0.08)_0%,rgba(3,6,11,0.5)_55%,rgba(3,6,11,0.94)_100%)]" />
								</motion.div>
							</AnimatePresence>

							<div className="shrink-0 border-t border-white/10 bg-[#f7f4ef] px-4 py-3 text-slate-900 sm:px-5 sm:py-4">
								<AnimatePresence mode="wait" custom={scrollDirection}>
									<motion.div key={activePost.id} custom={scrollDirection} variants={postTextVariants} initial="initial" animate="animate" exit="exit" transition={{duration: 0.24, ease: "easeOut"}} className="mx-auto flex w-full max-w-3xl flex-col">
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
												<button type="button" onClick={() => handleShare(activePost)} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700 transition active:scale-[0.98]">
													<FiShare2 className="text-[15px]" />
													Share
												</button>

												<button type="button" onClick={() => handleLike(activePost.id)} className={`inline-flex items-center justify-center gap-2 rounded-full border px-3 py-3 text-sm font-semibold transition active:scale-[0.98] ${likedPosts.has(activePost.id) ? "border-rose-200 bg-rose-50 text-rose-600" : "border-slate-200 bg-white text-slate-700"}`}>
													{likedPosts.has(activePost.id) ? (
														<AiFillHeart className="text-[15px]" />
													) : (
														<AiOutlineHeart className="text-[15px]" />
													)}
													Like
												</button>

												<button type="button" onClick={() => handleReadMore(activePost)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f1724] px-3 py-3 text-sm font-semibold text-white transition active:scale-[0.98]">
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

	const popularSection = (
		<div className="mx-auto my-12 max-w-md rounded-4xl border border-white/10 bg-white/5 px-6 py-12 text-center shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
			<p className="text-xl font-semibold tracking-wide text-white/80">Feature is coming</p>
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
			<div className="mx-auto max-w-7xl px-4">
				<div className="mb-8 flex justify-center">
					<div className="flex border-b border-base-300">
						<button onClick={() => changeTab("latest")} className={`px-5 pb-3 text-lg font-semibold transition ${activeTab === "latest" ? "border-b-2 border-cyan-500 text-cyan-500" : "text-gray-500 hover:text-white"}`}>
							Sozoo Picks
						</button>

						<button onClick={() => changeTab("popular")} className={`px-5 pb-3 text-lg font-semibold transition ${activeTab === "popular" ? "border-b-2 border-cyan-500 text-cyan-500" : "text-gray-500 hover:text-white"}`}>
							External Picks
						</button>
					</div>
				</div>

				{activeTab === "latest" ? latestSection : popularSection}
			</div>
		</section>
	);
};

export default NewsSection;
