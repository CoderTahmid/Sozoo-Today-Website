import TeamMember from "../assets/TeamMember.png";

const teamMembers = [
    {
        name: "Tanvir Hasan",
        role: "Creative Director",
        description: "Shaping the visual identity and storytelling of Sozoo properties.",
    },
    {
        name: "Tanvir Hasan",
        role: "Creative Director",
        description: "Shaping the visual identity and storytelling of Sozoo properties.",
    },
    {
        name: "Tanvir Hasan",
        role: "Creative Director",
        description: "Shaping the visual identity and storytelling of Sozoo properties.",
    },
    {
        name: "Tanvir Hasan",
        role: "Creative Director",
        description: "Shaping the visual identity and storytelling of Sozoo properties.",
    },
];

const TheTeam = () => {
    return (
		<section className="w-full bg-[#091424] px-4 py-12 text-white md:px-8 md:py-16 lg:py-20">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 text-center md:mb-10">
					<h2 className="text-3xl font-black uppercase leading-none tracking-tight md:text-5xl lg:text-6xl">The Team</h2>
					<p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">Built by people who understand the digital pulse.</p>
				</div>

				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{teamMembers.map((member, index) => (
						<article key={`${member.name}-${index}`} className="overflow-hidden rounded-2xl border border-white/8 bg-[#0d1b2b] shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:-translate-y-1">
							<div className="aspect-square overflow-hidden bg-[#d7d1c8]">
								<img src={TeamMember} alt={member.name} className="h-full w-full object-cover object-center" loading="lazy" />
							</div>

							<div className="p-4 md:p-5">
								<h3 className="text-xl font-semibold text-white md:text-2xl">{member.name}</h3>
								<p className="mt-1 text-sm font-medium text-[#1A8A7D] md:text-base">{member.role}</p>
								<p className="mt-3 text-sm leading-6 text-slate-400 md:text-[15px]">{member.description}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default TheTeam;