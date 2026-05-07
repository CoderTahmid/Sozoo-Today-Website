const ServicesHero = () => {
    return (
		<>
			{/* Desktop / PC Hero (visible on lg and up) */}
			<div className="hidden lg:block">
				<div
					className="w-full min-h-screen bg-cover bg-center relative flex items-center justify-center px-10 py-24 overflow-hidden"
					style={{
						backgroundImage: "url(/src/assets/Background_Grid_PC.png)",
					}}
				>
					{/* Center content */}
					<div className="relative z-10 flex flex-col items-center text-center max-w-3xl px-6">
						<div className="inline-block mb-6">
							<span className="text-sm uppercase border border-[#1a7a6f] bg-[#1a7a6f39] bg-opacity-20 text-[#1A8A7D] px-5 py-3 rounded-full font-semibold">SOZOO SERVICES</span>
						</div>

						<h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
							WE BUILD AUDIENCES.
							<br />
							WE MANAGE NARRATIVES.
							<br />
							WE DELIVER RESULTS.
						</h1>

						<p className="text-lg text-[#94A3B8] mb-10 max-w-2xl">Sozoo Media isn't just a publisher. We're a full-service digital media partner for brands.</p>

						<div className="flex gap-6 w-full max-w-lg">
							<button
								className="btn flex-1 rounded-xl border-none text-white font-bold tracking-widest text-base px-8 py-4"
								style={{
									background: "linear-gradient(135deg, #4ecdc4, #2a9d8f, #1a7a6e)",
									boxShadow: "0 12px 40px rgba(34,197,94,0.12)",
								}}
							>
								EXPLORE OUR BRANDS
							</button>

							<button className="btn btn-outline text-white border-white/30 rounded-xl px-6 py-4">PARTNER WITH US</button>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Hero Section (unchanged) */}
			<div className="lg:hidden">
				<div
					className="w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-6 py-12 text-center text-white"
					style={{
						backgroundImage: "url(/src/assets/background_grid_mobile.png)",
					}}
				>
					<div className="max-w-lg">
						<div className="inline-block mb-6">
							<span className="text-xs uppercase border border-[#1a7a6f] bg-[#1a7a6f39] bg-opacity-20 text-white px-4 py-2 rounded-full font-semibold">SOZOO SERVICES</span>
						</div>

						<h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
							WE BUILD AUDIENCES.
							<br />
							WE MANAGE NARRATIVES.
							<br />
							WE DELIVER RESULTS.
						</h1>

						<p className="text-sm text-[#94A3B8] mb-8">Sozoo Media is a full-service digital media partner for brands.</p>

						<div className="space-y-3">
							<button
								className="btn w-full rounded-2xl border-none text-white font-bold tracking-widest text-sm py-4"
								style={{
									background: "linear-gradient(135deg, #4ecdc4, #2a9d8f, #1a7a6e)",
									boxShadow: "0 0 24px rgba(34,197,94,0.12)",
								}}
							>
								EXPLORE OUR BRANDS
							</button>

							<button className="w-full btn btn-outline text-white border-cyan-500 hover:bg-cyan-500 hover:border-cyan-500 rounded-2xl py-3">PARTNER WITH US</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ServicesHero;    