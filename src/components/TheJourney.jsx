const TheJourney = () => {
    return (
		<section className="relative overflow-hidden bg-[#081427] text-white">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.08),transparent_32%),linear-gradient(180deg,#081427_0%,#07111f_100%)]" />
			<div className="relative z-10 px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-24 xl:px-16 xl:py-28">
				<div className="mx-auto max-w-6xl">
					<div className="text-center">
						<p className="text-xs uppercase tracking-[0.35em] text-[#7ddad1] lg:text-sm lg:tracking-[0.45em]">The Journey</p>
						<h2 className="mt-4 text-3xl font-black uppercase leading-[1.05] text-white sm:text-4xl lg:text-6xl">How we evolved to meet the needs of a new generation.</h2>
						<p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7 lg:mt-5 lg:text-lg lg:leading-8">Sozoo Media grew by responding to each shift in Bangladesh’s digital landscape, from fast news to branded storytelling and audience communities.</p>
					</div>

					<div className="mt-12 hidden lg:block">
						<div className="relative mx-auto max-w-5xl">
							<div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />

							<div className="space-y-16">
								{[
									{
										title: "The Gap",
										description: "Bangladesh has a young digital audience, but media wasn’t built for them.",
										align: "left",
									},
									{
										title: "The Shift",
										description: "Audiences moved to social, but traditional media didn’t adapt fast enough.",
										align: "right",
									},
									{
										title: "The Beginning",
										description: "Sozoo Today delivered fast, shareable, and verified news.",
										align: "left",
									},
									{
										title: "Expansion",
										description: "Growth into entertainment, ads, and niche communities.",
										align: "right",
									},
									{
										title: "Today",
										description: "A multi-brand media network reaching millions daily.",
										align: "left",
									},
								].map((milestone, index) => (
									<div key={milestone.title} className={`grid grid-cols-[1fr_auto_1fr] items-center gap-6 ${milestone.align === "right" ? "" : ""}`}>
										<div className={`flex ${milestone.align === "left" ? "justify-end" : "justify-start"}`}>
											{milestone.align === "left" ?
												<div className="max-w-md rounded-2xl border border-white/6 bg-white/3 px-8 py-7 shadow-[0_0_30px_rgba(0,0,0,0.18)] backdrop-blur-sm">
													<h3 className="text-2xl font-bold text-[#15a79b]">{milestone.title}</h3>
													<p className="mt-3 text-base leading-7 text-slate-400">{milestone.description}</p>
												</div>
											:	null}
										</div>

										<div className="relative flex items-center justify-center">
											<div className="h-3 w-3 rounded-full border-2 border-[#15a79b] bg-[#081427] shadow-[0_0_18px_rgba(21,167,155,0.8)]" />
											{index < 4 ?
												<div className="absolute top-full h-16 w-px bg-white/10" />
											:	null}
										</div>

										<div className={`flex ${milestone.align === "right" ? "justify-start" : "justify-start"}`}>
											{milestone.align === "right" ?
												<div className="max-w-md rounded-2xl border border-white/6 bg-white/3 px-8 py-7 shadow-[0_0_30px_rgba(0,0,0,0.18)] backdrop-blur-sm">
													<h3 className="text-2xl font-bold text-[#15a79b]">{milestone.title}</h3>
													<p className="mt-3 text-base leading-7 text-slate-400">{milestone.description}</p>
												</div>
											:	null}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="mt-12 space-y-6 lg:hidden">
						{[
							{
								title: "The Gap",
								description: "Bangladesh has a young digital audience, but media wasn’t built for them.",
							},
							{
								title: "The Shift",
								description: "Audiences moved to social, but traditional media didn’t adapt fast enough.",
							},
							{
								title: "The Beginning",
								description: "Sozoo Today delivered fast, shareable, and verified news.",
							},
							{
								title: "Expansion",
								description: "Growth into entertainment, ads, and niche communities.",
							},
							{
								title: "Today",
								description: "A multi-brand media network reaching millions daily.",
							},
						].map((milestone) => (
							<div key={milestone.title} className="relative pl-8">
								<div className="absolute left-3 top-0 h-full w-px bg-white/10" />
								<div className="absolute left-0 top-3 h-6 w-6 rounded-full border border-[#15a79b] bg-[#081427] shadow-[0_0_18px_rgba(21,167,155,0.8)]" />

								<div className="rounded-2xl border border-white/6 bg-white/3 px-5 py-5 shadow-[0_0_30px_rgba(0,0,0,0.18)] backdrop-blur-sm">
									<h3 className="text-lg font-bold text-[#15a79b]">{milestone.title}</h3>
									<p className="mt-2 text-sm leading-6 text-slate-400">{milestone.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default TheJourney;