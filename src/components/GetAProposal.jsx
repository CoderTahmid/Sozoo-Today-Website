import { FaArrowRight } from "react-icons/fa6";
import GetAProposalPCBackground from "../assets/GetAProposal_PC_Background.png";
import GetInTouchMobileBackground from "../assets/GetInTouch_Mobile_Background.png";
import LogoMobileDesignAllInOne2 from "../assets/Logo_Mobile_Design_All_In_One_2.png";

const proposalButtonStyles = {
    background: "linear-gradient(135deg, #4ecdc4, #2a9d8f, #1a7a6e)",
    boxShadow: "0 12px 40px rgba(34,197,94,0.12)",
};

const GetAProposal = () => {
    return (
        <section className="relative overflow-hidden text-white">
            <div className="hidden lg:block">
                <div className="relative flex h-[clamp(520px,60vw,760px)] items-center justify-center overflow-hidden bg-center bg-no-repeat px-8 xl:px-14" style={{ backgroundImage: `url(${GetAProposalPCBackground})`, backgroundSize: "contain", backgroundPosition: "center" }}>
                    <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
                        <div className="max-w-2xl">
                            <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold tracking-[0.18em] text-white/90 uppercase backdrop-blur-sm">
                                Get a proposal
                            </div>

                            <h2 className="mt-4 font-[Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif] text-5xl leading-[0.98] uppercase text-white xl:text-6xl">
                                Let’s build something together.
                            </h2>

                            <p className="mt-4 text-base leading-7 text-white/80 xl:text-lg lg:w-[90%] lg:mx-auto">
                                Tell us what you need and we’ll shape a clear proposal around your brand, goals, and timeline.
                            </p>

                            <div className="mt-8 flex justify-center">
                                <button
                                    className="btn inline-flex items-center justify-center gap-3 rounded-xl border-none text-sm font-bold tracking-widest text-white px-6 py-3 xl:text-base"
                                    style={proposalButtonStyles}
                                >
                                    GET A PROPOSAL
                                    <FaArrowRight className="text-lg" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden">
                <div
                    className="relative overflow-hidden bg-cover bg-center px-5 py-12 sm:px-6"
                    style={{ backgroundImage: `url(${GetInTouchMobileBackground})` }}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_34%),linear-gradient(180deg,rgba(4,20,23,0.08),rgba(4,20,23,0.35))]" />

                    <div className="relative z-10 mx-auto flex min-h-svh max-w-lg flex-col items-center justify-center text-center">
                        <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.7rem] font-semibold tracking-[0.22em] text-white/90 uppercase backdrop-blur-sm">
                            Get a proposal
                        </div>

                        <h2 className="mt-5 max-w-md font-[Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif] text-4xl leading-[0.95] uppercase text-white sm:text-5xl">
                            Let’s build something together.
                        </h2>

                        <p className="mt-4 max-w-md text-sm leading-7 text-white/82 sm:text-base">
                            Tell us what you need and we’ll show you how Sozoo Media can deliver.
                        </p>

                        <div className="mt-8 w-full max-w-sm">
                            <img
                                src={LogoMobileDesignAllInOne2}
                                alt="Sozoo proposal design preview"
                                className="mx-auto w-full max-w-88 object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.28)]"
                            />
                        </div>

                        <button
                            className="btn mt-8 inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-2xl border-none text-base font-bold tracking-widest text-white px-8 py-4"
                            style={proposalButtonStyles}
                        >
                            GET A PROPOSAL
                            <FaArrowRight className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GetAProposal;