const SozooEntertainmentHero = () => {
    return (
		<>
			{/* Desktop / PC Hero (visible on lg and up) */}
			<div className="hidden lg:block">
				<div
					className="w-full min-h-screen bg-cover bg-center relative flex items-center justify-center px-10 py-24 overflow-hidden"
					style={{
						backgroundImage: "url(/src/assets/Orange_Background_Grid_PC.png)",
					}}
				>
					{/* Center content */}
					<div className="relative z-10 flex flex-col items-center text-center max-w-3xl px-6">
						<div className="inline-block mb-6">
							<span className="text-sm uppercase border border-[#FF6B35] bg-[#FF6B3533] bg-opacity-20 text-[#FF6B35] px-5 py-3 rounded-full font-semibold">SOZOO ENTERTAINMENT</span>
						</div>

						<h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
							ENTERTAINMENT
							<br />
							REDEFINED.
						</h1>

						<p className="text-lg text-[#94A3B8] mb-10 max-w-2xl">The pulse of pop culture. Engaging millions daily with breaking news, trending topics, and viral moments.</p>

						<div className="flex gap-6 w-full max-w-lg">
							<button
								className="btn flex-1 rounded-xl border-none text-white font-bold tracking-widest text-base px-8 py-4"
								style={{
									background: "linear-gradient(135deg, #FF6B35, #ff8c58, #e85a2a)",
									boxShadow: "0 12px 40px rgba(255,107,53,0.12)",
								}}
							>
								FOLLOW US ON SOCIALS
							</button>

							<button className="btn btn-outline text-white border-[#FF6B35] rounded-xl px-6 py-4">ADVERTISE WITH US</button>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Hero Section (unchanged layout from ServicesHero) */}
			<div className="lg:hidden">
				<div
					className="w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-6 py-12 text-center text-white"
					style={{
						backgroundImage: "url(/src/assets/Orange_Background_Grid_Mobile.png)",
					}}
				>
					<div className="max-w-lg">
						<div className="inline-block mb-6">
							<span className="text-xs uppercase border border-[#FF6B35] bg-[#FF6B3533] bg-opacity-20 text-white px-4 py-2 rounded-full font-semibold">SOZOO ENTERTAINMENT</span>
						</div>

						<h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
							ENTERTAINMENT
							<br />
							REDEFINED.
						</h1>

						<p className="text-sm text-[#94A3B8] mb-8">The pulse of pop culture. Engaging millions daily with breaking news, trending topics, and viral moments.</p>

						<div className="space-y-3">
							<button
								className="btn w-full rounded-2xl border-none text-white font-bold tracking-widest text-sm py-4"
								style={{
									background: "linear-gradient(135deg, #FF6B35, #ff8c58, #e85a2a)",
									boxShadow: "0 0 24px rgba(255,107,53,0.12)",
								}}
							>
								FOLLOW US ON SOCIALS
							</button>

							<button className="w-full btn btn-outline text-white border-white/30 rounded-2xl py-3">ADVERTISE WITH US</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SozooEntertainmentHero;