import { FaChartLine, FaCommentDots, FaHeart, FaPlay, FaShareNodes, FaShieldHalved, FaVideo } from "react-icons/fa6";
import AcmeCorp from "../assets/AcmeCorp.png";
import Global from "../assets/Global.png";
import BrandContentVideoDemo from "../assets/BrandContentVideoDemo.png";
import Nexus from "../assets/Nexus.png";
import Starlight from "../assets/Starlight.png";
import VertexSquare from "../assets/VertextSquare.png";
import VertexTriangle from "../assets/VertexTriangle.png";

const featurePills = [
    { title: "Sponsored posts", icon: FaHeart },
    { title: "Campaign strategy", icon: FaChartLine },
    { title: "Creative production", icon: FaVideo },
    { title: "Branded video content", icon: FaPlay },
    { title: "Native advertising", icon: FaShieldHalved },
    { title: "Campaign analytics", icon: FaCommentDots },
];

const clientLogos = [
    { name: "Acme Corp", logo: AcmeCorp, className: "h-8 sm:h-9 lg:h-10" },
    { name: "Global", logo: Global, className: "h-8 sm:h-9 lg:h-10" },
    { name: "Nexus", logo: Nexus, className: "h-8 sm:h-9 lg:h-10" },
    { name: "Starlight", logo: Starlight, className: "h-8 sm:h-9 lg:h-10" },
    { name: "Vertex Square", logo: VertexSquare, className: "h-8 sm:h-9 lg:h-10" },
    { name: "Vertex Triangle", logo: VertexTriangle, className: "h-8 sm:h-9 lg:h-10" },
];

const BrandedContent = () => {
    return (
        <section className="relative overflow-hidden py-16 text-white md:py-24 lg:py-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_34%)]" />

            <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
                    <div className="max-w-2xl lg:w-[44%]">
                        <div className="mb-6 inline-flex rounded-full border border-[#A855F7]/40 px-5 py-2 text-sm font-medium tracking-[0.18em] text-[#D8B4FE] uppercase shadow-[0_0_30px_rgba(168,85,247,0.25)]">
                            Branded content
                        </div>

                        <h2 className="max-w-lg font-[Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif] text-4xl leading-none uppercase text-white sm:text-5xl lg:text-7xl">
                            Your brand, our audience.
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                            Native content designed for engagement, integrated seamlessly into the feeds people already scroll.
                        </p>

                        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {featurePills.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="flex items-center gap-3 rounded-2xl border border-[#24324f] bg-[#0f1a32] px-4 py-4 shadow-[0_18px_35px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-0.5 hover:border-[#A855F7]/55"
                                    >
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#A855F7]/15 text-[#C084FC]">
                                            <Icon className="text-lg" />
                                        </span>
                                        <span className="text-sm font-medium text-slate-100 sm:text-base">{item.title}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:w-[56%]">
                        <div className="rounded-4xl border border-white/5 bg-[#0b1630] p-4 shadow-[0_0_0_1px_rgba(168,85,247,0.05),0_35px_90px_rgba(0,0,0,0.65)] md:p-5 lg:p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-teal-500 to-cyan-700 text-lg font-semibold text-white">
                                        SZ
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-lg font-semibold text-white">
                                            Sozoo Media
                                            <FaShieldHalved className="text-sm text-[#60A5FA]" />
                                        </div>
                                        <div className="text-sm text-slate-400">Sponsored</div>
                                    </div>
                                </div>

                                <div className="text-2xl leading-none text-slate-400">...</div>
                            </div>

                            <div className="relative overflow-hidden rounded-3xl bg-black">
                                <img
                                    src={BrandContentVideoDemo}
                                    alt="Sozoo branded content video thumbnail"
                                    className="h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0f766e]/80 shadow-[0_0_0_10px_rgba(15,118,110,0.16)] backdrop-blur-sm transition-transform duration-300 hover:scale-105">
                                        <FaPlay className="ml-1 text-3xl text-white" />
                                    </div>
                                </div>
                            </div>

                            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                                Experience the next generation of digital storytelling. Engaging, authentic, and native to your feed. <span className="text-[#60A5FA]">#DigitalMarketing</span> <span className="text-[#60A5FA]">#Innovation</span>
                            </p>

                            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-slate-300">
                                <div className="flex items-center gap-6 text-base sm:text-lg">
                                    <span className="flex items-center gap-2">
                                        <FaHeart className="text-xl text-white" />
                                        <span>24.5k</span>
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FaCommentDots className="text-xl text-slate-400" />
                                        <span>1.2k</span>
                                    </span>
                                </div>

                                <span className="flex items-center gap-2 text-base sm:text-lg">
                                    <FaShareNodes className="text-xl text-slate-400" />
                                    <span>Share</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 rounded-4xl border border-white/8 bg-white/5 px-5 py-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:mt-12 md:px-7 md:py-7 lg:mt-14 lg:px-8 lg:py-8">
                    <div className="flex flex-col gap-6">
                        <div className="max-w-xl">
                            <p className="text-sm font-semibold tracking-[0.28em] text-slate-400 uppercase">
                                Trusted by forward-thinking brands
                            </p>
                            <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                                A client lineup that works across feeds, screens, and devices.
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                            {clientLogos.map((client) => (
                                <div
                                    key={client.name}
                                    className="flex min-h-24 items-center justify-center rounded-2xl border border-white/10 bg-[#071123]/80 px-4 py-4 shadow-[0_14px_35px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-0.5 hover:border-[#60A5FA]/40"
                                >
                                    <img
                                        src={client.logo}
                                        alt={client.name}
                                        className={`w-full max-w-38 object-contain opacity-85 transition-opacity duration-300 hover:opacity-100 ${client.className}`}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandedContent;