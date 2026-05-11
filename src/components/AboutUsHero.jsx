import { useNavigate } from "react-router-dom";

const AboutUsHero = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* Desktop / PC Hero (visible on lg and up) */}
            <div className="hidden lg:block">
                <div
                    className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center px-10 py-24"
                    style={{
                        backgroundImage: "url(/src/assets/Background_Grid_PC.png)",
                    }}
                >
                    <div className="relative z-10 flex max-w-4xl flex-col items-center px-6 text-center">
                        <div className="mb-6 inline-block">
                            <span className="rounded-full border border-[#1a7a6f] bg-[#1a7a6f39] px-5 py-3 text-sm font-semibold uppercase text-[#1A8A7D]">
                                ABOUT US
                            </span>
                        </div>

                        <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white md:text-6xl">
                            WE’VE BEEN DOING THIS FOR FIVE YEARS.
                            <br />
                            WE’RE JUST GETTING STARTED.
                        </h1>

                        <p className="mb-10 max-w-3xl text-lg text-[#94A3B8]">
                            Sozoo Media was founded with a simple observation: Bangladesh has one of the youngest, most digitally connected populations in the world — and the media landscape wasn’t keeping up.
                        </p>

                        <div className="flex w-full max-w-lg gap-6">
                            <button
                                type="button"
                                onClick={() => navigate("/contact-us")}
                                className="btn flex-1 rounded-xl border-none px-8 py-4 text-base font-bold tracking-widest text-white"
                                style={{
                                    background: "linear-gradient(135deg, #4ecdc4, #2a9d8f, #1a7a6e)",
                                    boxShadow: "0 12px 40px rgba(34,197,94,0.12)",
                                }}
                            >
                                GET A PROPOSAL
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/contact-us")}
                                className="btn btn-outline rounded-xl border-white/30 px-6 py-4 text-white"
                            >
                                CONTACT US
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Hero Section */}
            <div className="lg:hidden">
                <div
                    className="flex min-h-screen w-full flex-col items-center justify-center bg-cover bg-center px-6 py-12 text-center text-white"
                    style={{
                        backgroundImage: "url(/src/assets/background_grid_mobile.png)",
                    }}
                >
                    <div className="max-w-lg">
                        <div className="mb-6 inline-block">
                            <span className="rounded-full border border-[#1a7a6f] bg-[#1a7a6f39] px-4 py-2 text-xs font-semibold uppercase text-white">
                                ABOUT US
                            </span>
                        </div>

                        <h1 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl">
                            WE’VE BEEN DOING THIS FOR FIVE YEARS.
                            <br />
                            WE’RE JUST GETTING STARTED.
                        </h1>

                        <p className="mb-8 text-sm text-[#94A3B8]">
                            Sozoo Media was founded with a simple observation: Bangladesh has one of the youngest, most digitally connected populations in the world — and the media landscape wasn’t keeping up.
                        </p>

                        <div className="space-y-3">
                            <button
                                type="button"
                                onClick={() => navigate("/contact-us")}
                                className="btn w-full rounded-2xl border-none py-4 text-sm font-bold tracking-widest text-white"
                                style={{
                                    background: "linear-gradient(135deg, #4ecdc4, #2a9d8f, #1a7a6e)",
                                    boxShadow: "0 0 24px rgba(34,197,94,0.12)",
                                }}
                            >
                                GET A PROPOSAL
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/contact-us")}
                                className="btn btn-outline w-full rounded-2xl border-cyan-500 py-3 text-white hover:border-cyan-500 hover:bg-cyan-500"
                            >
                                CONTACT US
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUsHero;