import {
    FiMessageCircle,
    FiShield,
    FiTrendingUp,
    FiUsers,
    FiCheckCircle,
    FiArrowUpRight
} from "react-icons/fi";

const CommunityManagement = () => {
    const services = [
        {
            title: "Social management",
            icon: FiUsers
        },
        {
            title: "Crisis communication",
            icon: FiShield
        },
        {
            title: "Reputation management",
            icon: FiMessageCircle
        },
        {
            title: "Monthly reporting",
            icon: FiTrendingUp
        }
    ];

    const highlights = [
        { label: "Response time", value: "15 min" },
        { label: "Coverage", value: "24/7" },
        { label: "Sentiment lift", value: "+32%" }
    ];

    return (
        <section className="w-full px-4 py-12 text-white md:px-8 md:py-20">
            <div className="mx-auto max-w-6xl">
                <div className="overflow-hidden rounded-4xl border border-white/10 bg-[#071521] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                    <div className="grid gap-10 p-6 lg:grid-cols-[1.15fr_0.85fr] md:p-10 lg:p-12">
                        <div className="flex flex-col justify-between gap-8">
                            <div>
                                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1A8A7D]/40 bg-[#1A8A7D]/10 px-4 py-2 text-sm font-medium text-[#7fd6cb]">
                                    <FiMessageCircle className="text-base" />
                                    Community Management
                                </div>

                                <h2 className="max-w-xl text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">
                                    Not just social media management.
                                </h2>

                                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-lg">
                                    Manage conversations, shape perception, and maintain consistent messaging across all digital platforms.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {services.map((service) => {
                                    const Icon = service.icon;

                                    return (
                                        <div
                                            key={service.title}
                                            className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-4 text-sm font-medium text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.16)] transition-transform duration-300 hover:-translate-y-0.5 hover:border-[#1A8A7D]/50 hover:bg-[#1A8A7D]/10"
                                        >
                                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A8A7D]/15 text-[#7fd6cb]">
                                                <Icon className="text-lg" />
                                            </span>
                                            <span>{service.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="relative flex items-stretch">
                            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-[#1A8A7D]/20 via-transparent to-transparent blur-2xl" />

                            <div className="relative flex w-full flex-col justify-between rounded-3xl border border-[#1A8A7D]/20 bg-[#0c1d2b] p-5 md:p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7fd6cb]">
                                            Community snapshot
                                        </p>
                                        <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                                            Keep the conversation in your corner.
                                        </h3>
                                    </div>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A8A7D]/15 text-[#7fd6cb]">
                                        <FiArrowUpRight className="text-xl" />
                                    </div>
                                </div>

                                <div className="mt-8 rounded-3xl border border-white/8 bg-[#081320] p-5 md:p-6">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                                Team status
                                            </p>
                                            <p className="mt-2 text-3xl font-black text-white md:text-4xl">
                                                Always ready
                                            </p>
                                        </div>

                                        <div className="rounded-full border border-[#1A8A7D]/35 bg-[#1A8A7D]/10 px-4 py-2 text-sm font-semibold text-[#7fd6cb]">
                                            Active now
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                        {highlights.map((item) => (
                                            <div
                                                key={item.label}
                                                className="rounded-2xl bg-white/4 p-4"
                                            >
                                                <p className="text-sm text-slate-400">{item.label}</p>
                                                <p className="mt-2 text-xl font-bold text-white md:text-2xl">
                                                    {item.value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 space-y-3 border-t border-white/8 pt-5 text-sm text-slate-300">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A8A7D]/15 text-[#7fd6cb]">
                                                <FiCheckCircle className="text-sm" />
                                            </span>
                                            <span>Clear escalation paths for sensitive conversations</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A8A7D]/15 text-[#7fd6cb]">
                                                <FiCheckCircle className="text-sm" />
                                            </span>
                                            <span>Fast, on-brand replies across every platform</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A8A7D]/15 text-[#7fd6cb]">
                                                <FiCheckCircle className="text-sm" />
                                            </span>
                                            <span>Reporting that turns engagement into action</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommunityManagement;