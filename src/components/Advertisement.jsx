import {useEffect, useState} from "react";
import Advertisement1 from "../assets/Advertisement1.png";
import Advertisement2 from "../assets/Advertisement2.png";

const Advertisement = () => {
	const ads = [Advertisement1, Advertisement2];
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % ads.length);
		}, 2000);

		return () => clearInterval(interval);
	});

	return (
		<div className="w-full mx-auto overflow-hidden ">
			<div
				className="flex transition-transform duration-700 ease-in-out"
				style={{
					transform: `translateX(-${current * 100}%)`,
				}}
			>
				{ads.map((ad, index) => (
					<div key={index} className="w-full shrink-0 flex justify-center items-center bg-black">
						<img src={ad} alt={`Advertisement ${index + 1}`} className="w-full h-auto object-contain" />
					</div>
				))}
			</div>

			{/* Dots */}
			<div className="flex justify-center gap-2 mt-3">
				{ads.map((_, index) => (
					<button key={index} onClick={() => setCurrent(index)} className={`w-3 h-3 rounded-full transition-all ${current === index ? "bg-blue-500" : "bg-gray-400"}`} />
				))}
			</div>
		</div>
	);
};

export default Advertisement;
