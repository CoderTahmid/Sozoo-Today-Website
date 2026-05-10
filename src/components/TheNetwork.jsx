import { FiBriefcase, FiChevronRight, FiGrid, FiMonitor, FiUsers } from "react-icons/fi";

const groups = [
    {
        title: "Content Pages",
        icon: FiGrid,
        items: ["Sozoo Today", "Sozoo Entertainment", "Get the Fame", "Best Bangladeshi Ads", "Dhakastic", "Deshi Talks", "Satiristic"],
    },
    {
        title: "Community Groups",
        icon: FiUsers,
        items: ["Territory of University", "Universe of University", "Uni Talks"],
    },
    {
        title: "Services",
        icon: FiBriefcase,
        items: ["Community Management", "Media Buying", "Branded Content Production"],
    },
];

const TheNetwork = () => {
    return (
        <section className="w-full px-4 py-12 text-white md:px-8 md:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 text-center md:mb-10">
                    <p className="text-3xl font-black uppercase leading-none tracking-tight md:text-5xl lg:text-6xl">
                        The Network
                    </p>
                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
                        Every property in the ecosystem fuels growth across the network.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {groups.map((group) => {
                        const Icon = group.icon;

                        return (
                            <article
                                key={group.title}
                                className="rounded-3xl border border-white/8 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] md:p-6 lg:p-7"
                            >
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#1A8A7D]/25 text-[#7fd6cb]">
                                        <Icon className="text-xl" />
                                    </span>
                                    <h3 className="text-xl font-bold text-white md:text-2xl">
                                        {group.title}
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    {group.items.map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 rounded-2xl border border-white/6 px-4 py-3 text-sm font-medium text-slate-200 transition-colors duration-300 hover:border-[#1A8A7D]/30 hover:text-white"
                                        >
                                            <FiChevronRight className="text-slate-500" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TheNetwork;