import {useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const SozooEntertainmentStats = () => {
	const stats = [
		{main: "5+", sub: "YEARS OF EXCELLENCE"},
		{main: "4", sub: "CORE BRANDS"},
		{main: "12M+", sub: "MONTHLY IMPRESSIONS"},
		{main: "158K+", sub: "NETWORK FOLLOWERS"},
	];

	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});
	}, []);

	return (
		<div className="mt-15 px-4">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-[90%] mx-auto border-t border-b border-[#94a3b843]">
				{stats.map((stat, index) => (
					<div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="flex flex-col items-center py-8 ">
						<div className=" py-6 px-4 w-full text-center">
							<h3 className="text-[40px] font-black text-[#FF6B35] leading-tight md:text-3xl lg:text-5xl" style={{fontWeight: 900}}>
								{stat.main}
							</h3>
							<p className="text-[12px] font-semibold text-[#94A3B8] mt-3 md:text-sm">{stat.sub}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SozooEntertainmentStats;
