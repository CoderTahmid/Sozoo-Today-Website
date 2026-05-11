import brandPreviewImg from "../assets/Brand_Preview.png";
import bestBangladeshiAdsLogoImg from "../assets/Best_Bangladeshi_Ads_Logo.png";
import getTheFameLogoImg from "../assets/Get_The_Fame_Logo.png";
import sozooEntertainmentLogoImg from "../assets/Sozoo_Entertainment_Logo.png";
import sozooTodayLogoImg from "../assets/Sozoo_Today_Logo.png";

const OurPortfolio = () => {
    return (
		<div className="text-center mt-10">
			<h1 className="text-[32px] md:text-[40px]">OUR PORTFOLIO</h1>
			<p className="text-xs text-[#94A3B8] mb-15">Distinct voices. One powerful network.</p>
			<div className="grid grid-cols-1 w-[95%] mx-auto md:grid-cols-2 space-y-6 md:gap-10 lg:gap-15">
				{/* Card 1 */}
				<div className="bg-[#0b1a2a] rounded-2xl p-6 border border-[#1f2f45] border-t-6 border-t-white mx-auto shadow-lg">
					<div className="bg-black rounded-xl flex items-center justify-center h-24 mb-5 w-[50%] mx-auto md:mx-0 md:mb-5 md:w-40">
						<img src={sozooTodayLogoImg} alt="Brand Logo" className="h-12 object-contain md:ml-0" />
					</div>

					<h2 className="text-white text-xl font-semibold text-center mb-2 md:text-left">Sozoo Today</h2>

					<p className="text-gray-400 text-sm text-center mb-5 leading-relaxed md:text-left">Connecting top-tier influencers with global brands. Fame, structured and monetized.</p>

					<div className="rounded-xl overflow-hidden">
						<img src={brandPreviewImg} alt="Preview" className="w-full object-cover" />
					</div>
				</div>

				{/* Card 2  */}
				<div className="bg-[#0b1a2a] rounded-2xl p-6 border border-[#1f2f45] border-t-6 border-t-[#9B59B6] mx-auto shadow-lg">
					<div className="bg-black rounded-xl flex items-center justify-center h-24 mb-5 w-[50%] mx-auto md:mx-0 md:mb-5 md:w-40">
						<img src={sozooEntertainmentLogoImg} alt="Brand Logo" className="h-12 object-contain" />
					</div>

					<h2 className="text-white text-xl font-semibold text-center mb-2 md:text-left">Sozoo Entertainment</h2>

					<p className="text-gray-400 text-sm text-center mb-5 leading-relaxed md:text-left">Connecting top-tier influencers with global brands. Fame, structured and monetized.</p>

					<div className="rounded-xl overflow-hidden">
						<img src={brandPreviewImg} alt="Preview" className="w-full object-cover" />
					</div>
				</div>

				{/* Card 3  */}
				<div className="bg-[#0b1a2a] rounded-2xl p-6 border border-[#1f2f45] border-t-6 border-t-[#FF6B35] mx-auto shadow-lg">
					<div className="bg-black rounded-xl flex items-center justify-center h-24 mb-5 w-[50%] mx-auto md:mx-0 md:mb-5 md:w-40">
						<img src={getTheFameLogoImg} alt="Brand Logo" className="h-12 object-contain" />
					</div>

					<h2 className="text-white text-xl font-semibold text-center mb-2 md:text-left">Get The Fame</h2>

					<p className="text-gray-400 text-sm text-center mb-5 leading-relaxed md:text-left">Connecting top-tier influencers with global brands. Fame, structured and monetized.</p>

					<div className="rounded-xl overflow-hidden">
						<img src={brandPreviewImg} alt="Preview" className="w-full object-cover" />
					</div>
				</div>

				{/* Card 4  */}
				<div className="bg-[#0b1a2a] rounded-2xl p-6 border border-[#1f2f45] border-t-6 border-t-[#1A8A7D] mx-auto shadow-lg">
					<div className="bg-black rounded-xl flex items-center justify-center h-24 mb-5 w-[50%] mx-auto md:mx-0 md:mb-5 md:w-40">
						<img src={bestBangladeshiAdsLogoImg} alt="Brand Logo" className="h-12 object-contain" />
					</div>

					<h2 className="text-white text-xl font-semibold text-center mb-2 md:text-left">Best Bangladeshi Ads</h2>

					<p className="text-gray-400 text-sm text-center mb-5 leading-relaxed md:text-left">Connecting top-tier influencers with global brands. Fame, structured and monetized.</p>

					<div className="rounded-xl overflow-hidden">
						<img src={brandPreviewImg} alt="Preview" className="w-full object-cover" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default OurPortfolio;