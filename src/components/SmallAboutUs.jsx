const SmallAboutUs = () => {
    return (
        <section className="relative overflow-hidden bg-[#081427] text-white">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{
                    backgroundImage: "url(/src/assets/background_grid_mobile.png)",
                }}
            />

            <div className="absolute inset-0 bg-linear-to-b from-[#07111f]/30 via-[#081427]/70 to-[#081427]" />

            <div className="relative z-10 px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-24 xl:px-16 xl:py-28">
                <div className="mx-auto flex max-w-md flex-col items-center text-center lg:max-w-6xl">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#7ddad1] lg:text-sm lg:tracking-[0.45em]">About Us</p>
                    <h2 className="mt-4 text-4xl font-black uppercase leading-[1.05] text-white sm:text-5xl lg:max-w-4xl lg:text-7xl xl:text-[5.5rem]">
                        We don’t just create content.
                        <br />
                        We manage narratives.
                    </h2>

                    <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300 sm:max-w-xl sm:text-base sm:leading-7 lg:mt-7 lg:max-w-3xl lg:text-lg lg:leading-8">
                        Sozoo Media offers end-to-end community management, media buying, and branded content services to companies that want to win in Bangladesh’s digital space.
                    </p>

                    <div className="mt-8 grid w-full grid-cols-2 gap-4 sm:gap-5 lg:mt-12 lg:grid-cols-4 lg:gap-6 xl:gap-8">
                        <div className="flex items-center justify-center rounded-2xl bg-white/5 px-4 py-4 shadow-[0_0_35px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:px-6 sm:py-5 lg:min-h-32 lg:px-8 lg:py-6 xl:min-h-36">
                            <img src="/src/assets/Sozoo_Today_Logo.png" alt="Sozoo Today" className="h-10 w-auto object-contain sm:h-12 lg:h-14 xl:h-16" />
                        </div>
                        <div className="flex items-center justify-center rounded-2xl bg-white/5 px-4 py-4 shadow-[0_0_35px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:px-6 sm:py-5 lg:min-h-32 lg:px-8 lg:py-6 xl:min-h-36">
                            <img src="/src/assets/Sozoo_Entertainment_Logo.png" alt="Sozoo Entertainment" className="h-10 w-auto object-contain sm:h-12 lg:h-14 xl:h-16" />
                        </div>
                        <div className="flex items-center justify-center rounded-2xl bg-white/5 px-4 py-4 shadow-[0_0_35px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:px-6 sm:py-5 lg:min-h-32 lg:px-8 lg:py-6 xl:min-h-36">
                            <img src="/src/assets/Get_The_Fame_Logo.png" alt="Get The Fame" className="h-10 w-auto object-contain sm:h-12 lg:h-14 xl:h-16" />
                        </div>
                        <div className="flex items-center justify-center rounded-2xl bg-white/5 px-4 py-4 shadow-[0_0_35px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:px-6 sm:py-5 lg:min-h-32 lg:px-8 lg:py-6 xl:min-h-36">
                            <img src="/src/assets/Best_Bangladeshi_Ads_Logo.png" alt="Best Bangladeshi Ads" className="h-10 w-auto object-contain sm:h-12 lg:h-14 xl:h-16" />
                        </div>
                    </div>

                    <div className="mt-9 w-full max-w-sm space-y-3 sm:max-w-md lg:mt-12 lg:max-w-lg">
                        <button
                            className="btn w-full rounded-2xl border-none text-white font-bold tracking-widest text-sm py-4 sm:text-base sm:py-5 lg:text-lg lg:py-6"
                            style={{
                                background: "linear-gradient(135deg, #4ecdc4, #2a9d8f, #1a7a6e)",
                                boxShadow: "0 0 20px rgba(78, 205, 196, 0.3)",
                            }}
                        >
                            OUR SERVICES →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SmallAboutUs;