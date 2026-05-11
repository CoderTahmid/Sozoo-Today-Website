import { useNavigate } from "react-router-dom";

const GetInTouch = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className="relative overflow-hidden bg-[#081427] text-white lg:hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{
                        backgroundImage: "url(/src/assets/GetInTouch_Mobile_Background.png)",
                    }}
                />

                <div className="absolute inset-0 bg-linear-to-b from-white/25 via-[#081427]/25 to-[#081427]/60" />

                <div className="relative z-10 px-5 py-14 sm:px-8 sm:py-16">
                    <div className="mx-auto flex max-w-md flex-col items-center text-center">
                        <h2 className="text-3xl font-black uppercase leading-[1.05] tracking-wide text-white sm:text-4xl">
                            Ready to reach young Bangladesh?
                        </h2>

                        <p className="mt-5 max-w-sm text-sm font-semibold leading-6 text-white/90 sm:max-w-md sm:text-base sm:leading-7">
                            Whether you’re an advertiser, a brand, or an investor — let’s talk about how Sozoo Media can work for you.
                        </p>

                        <div className="mt-8 w-full max-w-sm sm:max-w-md">
                            <img
                                src="/src/assets/Logo_Mobile_Design_All_In_One.png"
                                alt="Sozoo Media brands"
                                className="w-full object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
                            />
                        </div>

                        <div className="mt-10 w-full max-w-sm sm:max-w-md">
                            <button
                                type="button"
                                onClick={() => navigate("/contact-us")}
                                className="btn w-full rounded-2xl border-none text-white font-bold tracking-widest text-sm py-4 sm:text-base sm:py-5"
                                style={{
                                    background: "linear-gradient(135deg, #4ecdc4, #2a9d8f, #1a7a6e)",
                                    boxShadow: "0 0 20px rgba(78, 205, 196, 0.3)",
                                }}
                            >
                                GET IN TOUCH
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative hidden overflow-hidden text-white lg:block ">
                <div
                    className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url(/src/assets/GetInTouch_PC_Background.png)",
                    }}
                />

                <div className="relative z-10 flex min-h-130 items-center justify-center px-10 py-20 xl:min-h-155 xl:px-16">
                    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                        <h2 className="text-5xl font-black uppercase leading-[1.05] tracking-wide text-white xl:text-6xl">
                            Ready to reach young Bangladesh?
                        </h2>

                        <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/90 xl:text-xl xl:leading-9">
                            Whether you’re an advertiser, a brand, or an investor — let’s talk about how Sozoo Media can work for you.
                        </p>

                        <div className="mt-10 w-full max-w-sm xl:mt-12">
                            <button
                                type="button"
                                onClick={() => navigate("/contact-us")}
                                className="btn w-full rounded-2xl border-none text-white font-bold tracking-widest text-base py-5 xl:text-lg xl:py-6"
                                style={{
                                    background: "linear-gradient(135deg, #4ecdc4, #2a9d8f, #1a7a6e)",
                                    boxShadow: "0 0 20px rgba(78, 205, 196, 0.3)",
                                }}
                            >
                                GET IN TOUCH
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default GetInTouch;