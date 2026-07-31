import {useEffect, useMemo, useState} from "react";

const API_BASE = "https://graph.facebook.com/v23.0";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

const getTimestampValue = (timestamp) => new Date(timestamp).getTime();

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

	// Latest News
	const latestNews = useMemo(() => {
		return [...posts].sort((a, b) => getTimestampValue(b.timestamp) - getTimestampValue(a.timestamp));
	}, [posts]);

	// Popular Now
	const popularNews = useMemo(() => {
		return [...posts].sort((a, b) => (b.like_count || 0) - (a.like_count || 0)).slice(0, 20);
	}, [posts]);

	const displayPosts = activeTab === "latest" ? latestNews : popularNews;

	const visiblePosts = displayPosts.slice(0, visibleCount);

	const changeTab = (tab) => {
		setActiveTab(tab);
		setVisibleCount(9);
	};

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
		<section id="news-section" className="bg-base-100 py-10">
			<div className="mx-auto max-w-7xl px-4">
				{/* Tabs */}

				<div className="mb-8 flex justify-center">
					<div className="flex border-b border-base-300">
						<button onClick={() => changeTab("latest")} className={`px-5 pb-3 text-lg font-semibold transition ${activeTab === "latest" ? "border-b-2 border-cyan-500 text-cyan-500" : "text-gray-500 hover:text-white"}`}>
							Latest News
						</button>

						<button onClick={() => changeTab("popular")} className={`px-5 pb-3 text-lg font-semibold transition ${activeTab === "popular" ? "border-b-2 border-cyan-500 text-cyan-500" : "text-gray-500 hover:text-white"}`}>
							Popular Now
						</button>
					</div>
				</div>

				{/* Grid */}

				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{visiblePosts.map((post) => (
						<a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer" className="group relative block aspect-4/5 overflow-hidden rounded-2xl border border-white/10 bg-base-300 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/60">
							<img src={post.media_url} alt={post.caption || "News"} loading="lazy" onError={() => console.log(post.media_url)} className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105" />

							<div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/15 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-60" />

							<div className="absolute inset-x-0 bottom-0 translate-y-full  text-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-50">
								<span className="text-lg font-semibold text-white">Read More</span>
							</div>
						</a>
					))}
				</div>

				{/* Load More */}

				{visibleCount < displayPosts.length && (
					<div className="mt-10 flex justify-center">
						<button onClick={() => setVisibleCount((prev) => prev + 9)} className="btn btn-primary px-8">
							Load More
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default NewsSection;
