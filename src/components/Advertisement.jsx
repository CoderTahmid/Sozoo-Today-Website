import {useEffect, useRef, useState} from "react";
import Advertisement2 from "../assets/Advertisement2.png";

const ADS = [Advertisement2];

const Advertisement = () => {
	const [current, setCurrent] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [, setImgStatus] = useState({src: '', loaded: false, error: false});
	const containerRef = useRef(null);

	useEffect(() => {
		if (isPaused) return;
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % ADS.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [isPaused]);

	// debug: print resolved image URLs (helpful if images fail to load in browser)
	useEffect(() => {
		console.debug('Advertisement image URLs:', ADS);
	}, []);

	const goPrev = () => setCurrent((c) => (c - 1 + ADS.length) % ADS.length);
	const goNext = () => setCurrent((c) => (c + 1) % ADS.length);

	const handleKeyDown = (e) => {
		if (e.key === "ArrowLeft") goPrev();
		if (e.key === "ArrowRight") goNext();
	};

	return (
		<div
			ref={containerRef}
			role="region"
			aria-label="Advertisement carousel"
			tabIndex={0}
			onKeyDown={handleKeyDown}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			className="max-w-3xl mx-auto rounded-lg shadow-lg overflow-hidden relative bg-black"
		>
			{/* Slides */}
			<div className="w-full overflow-hidden">
				<div
					className="flex transition-transform duration-700 ease-in-out"
					style={{transform: `translateX(-${current * 100}%)`}}
				>
					{ADS.map((ad, index) => (
						<div key={index} className="w-full shrink-0 relative">
							<img
								src={ad}
								alt={`Advertisement ${index + 1}`}
								loading="lazy"
								className="w-full h-56 sm:h-72 object-cover block bg-black relative z-0"
								onLoad={(e) => {
									setImgStatus({src: e.currentTarget.src, loaded: true, error: false});
									console.debug('Ad loaded:', e.currentTarget.src);
								}}
							/>

							{/* Overlay content */}
							<div className="absolute inset-0 flex items-end pointer-events-none">
								<div className="p-4 sm:p-6 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 z-20">
									<div>
										<span className="inline-block bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-md">Sponsored</span>
										<h3 className="text-white text-sm sm:text-lg font-semibold mt-2">Discover trending stories</h3>
										<p className="text-gray-200 text-xs sm:text-sm mt-1">Tap to learn more about this featured content.</p>
									</div>

									<div>
										<a href="#" className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-md shadow">Learn More</a>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Controls: Prev / Next */}
			<button
				aria-label="Previous advertisement"
				onClick={goPrev}
				className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md focus:outline-none"
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H5a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
				</svg>
			</button>

			<button
				aria-label="Next advertisement"
				onClick={goNext}
				className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md focus:outline-none"
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700 rotate-180" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H5a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
				</svg>
			</button>

			{/* Dots */}
			<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
				{ADS.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrent(index)}
						aria-label={`Go to slide ${index + 1}`}
						className={`w-3 h-3 rounded-full transition-all ${current === index ? "bg-white ring-2 ring-blue-400" : "bg-white/50"}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Advertisement;
