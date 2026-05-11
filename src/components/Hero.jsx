import { useNavigate } from "react-router-dom";

import backgroundGridPc from "../assets/Background_Grid_PC.png";
import backgroundGridMobile from "../assets/background_grid_mobile.png";
import sozooTodayImg from "../assets/Sozoo_Today.png";
import sozooEntertainmentImg from "../assets/Sozoo_Entertainment.png";
import getTheFameImg from "../assets/Get_The_Fame.svg";
import bestBangladeshiAdsImg from "../assets/Best_Bangladeshi_Ads.png";
import heroTextImg from "../assets/Hero_Text.png";
import heroVisualMobileImg from "../assets/Hero_Visual_Mobile.png";

const Hero = () => {

	const navigate = useNavigate();

	return (
		<>
			{/* Desktop / PC Hero Section (visible on lg and up) */}
			<div className="hidden lg:block">
				<div
					className="w-full min-h-screen bg-cover bg-center relative flex items-center justify-center px-8 py-24 overflow-hidden"
					style={{
						backgroundImage: `url(${backgroundGridPc})`,
					}}
				>
					{/* Top-left brand */}
					<img src={sozooTodayImg} alt="Sozoo Today" className="absolute top-6 left-1 w-[34%] transform -rotate-12 drop-shadow-2xl" />

					{/* Top-right brand */}
					<img src={sozooEntertainmentImg} alt="Sozoo Entertainment" className="absolute top-6 right-1 w-[34%] transform rotate-6 drop-shadow-2xl" />

					{/* Bottom-left brand */}
					<img src={getTheFameImg} alt="Get The Fame" className="absolute bottom-6 left-1 w-[34%] transform rotate-6 drop-shadow-2xl" />

					{/* Bottom-right brand */}
					<img src={bestBangladeshiAdsImg} alt="Best Bangladeshi Ads" className="absolute bottom-6 right-1 w-[34%] transform -rotate-6 drop-shadow-2xl" />

					{/* Center content */}
					<div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-6">
						<img src={heroTextImg} alt="Bangladesh's Next-Generation Media Network" className="w-[80%] max-w-3xl" />

						<p className="text-center text-[#94A3B8] mt-6 mb-6">Reaching Millions Monthly Across 4 Media Brands</p>

						<div className="flex flex-col items-center space-y-4 mt-4">
							<button
								type="button"
								className="btn w-full rounded-xl border-none text-white font-bold tracking-widest text-base px-8 py-3"
								style={{
									background: "linear-gradient(135deg, #4ecdc4, #2a9d8f, #1a7a6e)",
									boxShadow: "0 8px 30px rgba(34,197,94,0.12)",
								}}
							>
								EXPLORE OUR BRANDS
							</button>

							<button
								type="button"
								onClick={() => navigate('/contact-us')}
								className="btn w-full btn-outline text-white border-[#1A8A7D] hover:bg-cyan-500 hover:border-cyan-500 rounded-xl px-8 py-3"
							>
								PARTNER WITH US
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Hero Section (unchanged) */}
			<div className="lg:hidden">
				<div
					className="w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-12"
					style={{
						backgroundImage: `url(${backgroundGridMobile})`,
					}}
				>
					<div className="">
						<img src={heroTextImg} alt="Bangladesh's Next-Generation Media Network" className="w-full max-w-lg" />
					</div>

					<div className="">
						<img src={heroVisualMobileImg} alt="Sozoo Media Brands" className="w-full max-w-sm" />
					</div>

					<p className="text-center text-gray-400 mb-8 text-sm">Reaching Millions Monthly Across 4 Media Brands</p>

					<div className="w-full max-w-sm space-y-3">
						<button
							className="btn w-full rounded-2xl border-none text-white font-bold tracking-widest text-sm py-4"
							style={{
								background: "linear-gradient(135deg, #4ecdc4, #2a9d8f, #1a7a6e)",
								boxShadow: "0 0 20px rgba(78, 205, 196, 0.3)",
							}}
						>
							EXPLORE OUR BRANDS
						</button>
						<button onClick={() => navigate("/contact-us")} className="w-full btn btn-outline text-white border-cyan-500 hover:bg-cyan-500 hover:border-cyan-500 rounded-2xl">
							PARTNER WITH US
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Hero;