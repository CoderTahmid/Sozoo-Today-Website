import {useEffect, useMemo, useRef, useState} from "react";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

const API_BASE = "https://graph.facebook.com/v23.0";
const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_POSTS = 15;

const getTimestampValue = (timestamp) => new Date(timestamp).getTime();

const isImagePost = (post) => {
	if (post.media_type) {
		return post.media_type === "IMAGE";
	}

	return /\.(avif|gif|jpe?g|png|webp)(\?|$)/i.test(post.media_url || "");
};

const PopularNow = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [failedImageIds, setFailedImageIds] = useState(() => new Set());
	const carouselRef = useRef(null);

	const accountId = import.meta.env.VITE_SOZOO_TODAY_IG_ACCOUNT_ID;
	const accessToken = import.meta.env.VITE_SOZOO_TODAY_ACCESS_TOKEN;

	useEffect(() => {
		const controller = new AbortController();

		const loadPosts = async () => {
			if (!accountId || !accessToken) {
				setError("Missing Instagram credentials in the environment file.");
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				setError("");

				const fields = "id,caption,media_url,permalink,timestamp,like_count,media_type";
				const url = `${API_BASE}/${accountId}/media?fields=${fields}&access_token=${encodeURIComponent(accessToken)}`;
				const response = await fetch(url, {signal: controller.signal});

				if (!response.ok) {
					throw new Error(`Request failed with status ${response.status}`);
				}

				const data = await response.json();
				const cutoffTime = Date.now() - SEVEN_DAYS_IN_MS;
				const topPosts = (Array.isArray(data?.data) ? data.data : [])
					.filter((post) => {
						const postedAt = getTimestampValue(post.timestamp);
						return !Number.isNaN(postedAt) && postedAt >= cutoffTime && post.media_url && post.permalink && isImagePost(post);
					})
					.sort((left, right) => (right.like_count ?? 0) - (left.like_count ?? 0))
					.slice(0, MAX_POSTS);

				setPosts(topPosts);
			} catch (fetchError) {
				if (fetchError.name !== "AbortError") {
					setError("Unable to load popular posts right now.");
				}
			} finally {
				setLoading(false);
			}
		};

		loadPosts();

		return () => controller.abort();
	}, [accountId, accessToken]);

	const statusContent = useMemo(() => {
		if (loading) {
			return <div className="mx-auto flex min-h-56 w-full max-w-5xl items-center justify-center rounded-2xl border border-white/10 bg-black px-6 text-center text-sm text-white/70">Loading popular posts...</div>;
		}

		if (error) {
			return <div className="mx-auto flex min-h-56 w-full max-w-5xl items-center justify-center rounded-2xl border border-rose-400/20 bg-black px-6 text-center text-sm text-rose-100">{error}</div>;
		}

		if (posts.length === 0) {
			return <div className="mx-auto flex min-h-56 w-full max-w-5xl items-center justify-center rounded-2xl border border-white/10 bg-black px-6 text-center text-sm text-white/70">No image posts from the last 7 days yet.</div>;
		}

		return null;
	}, [error, loading, posts.length]);

	const scrollCarousel = (direction) => {
		const carousel = carouselRef.current;

		if (!carousel) {
			return;
		}

		const cardWidth = carousel.querySelector("[data-popular-card]")?.clientWidth ?? 280;
		carousel.scrollBy({
			left: direction * (cardWidth + 20),
			behavior: "smooth",
		});
	};

	return (
		<section id="popular-now" className="scroll-mt-24 bg-black py-10 text-white sm:px-6 lg:px-8">
			<div className="mx-auto">
				<div className="mb-6 flex items-center justify-center gap-4 sm:mb-8">
					<button type="button" onClick={() => scrollCarousel(-1)} className="btn btn-circle btn-ghost hidden border border-white/10 text-white hover:border-cyan-400/50 hover:bg-cyan-400/10 md:inline-flex" aria-label="Scroll popular posts left">
						<FiChevronLeft className="text-xl" />
					</button>

					<h2 className="text-center text-3xl font-bold leading-tight sm:text-4xl">Popular Now</h2>

					<button type="button" onClick={() => scrollCarousel(1)} className="btn btn-circle btn-ghost hidden border border-white/10 text-white hover:border-cyan-400/50 hover:bg-cyan-400/10 md:inline-flex" aria-label="Scroll popular posts right">
						<FiChevronRight className="text-xl" />
					</button>
				</div>

				{statusContent}

				{!statusContent && (
					<div className="relative">
						<div ref={carouselRef} className="carousel carousel-center scrollbar-none w-full gap-4 overflow-x-auto scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden sm:gap-5">
							{posts.map((post, index) => (
								<a
									key={post.id}
									data-popular-card
									href={post.permalink}
									target="_blank"
									rel="noopener noreferrer"
									className={`carousel-item group relative block aspect-4/5 w-[72vw] max-w-[18rem] shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-black transition duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-[0_22px_70px_rgba(34,211,238,0.24)] sm:w-[38vw] sm:max-w-[20rem] md:w-[28vw] lg:w-[21vw] ${index === 0 ? "ml-[14vw] sm:ml-0" : ""}`}
									aria-label="Read more on Instagram"
								>
									{failedImageIds.has(post.id) ? (
										<div className="flex h-full w-full items-center justify-center bg-black px-4 text-center text-sm text-white/80">Open on Instagram</div>
									) : (
										<img
											src={post.media_url}
											alt={post.caption || "Popular Sozoo Today post"}
											loading="lazy"
											referrerPolicy="no-referrer"
											onError={() => setFailedImageIds((prev) => new Set(prev).add(post.id))}
											className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
										/>
									)}
								</a>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default PopularNow;
