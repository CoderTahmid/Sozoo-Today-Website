import { useState } from "react";

import featuredContentImg from "../assets/Featured_Content.png";

const sampleData = [
    { id: 1, title: "Red Carpet Exclusives", subtitle: "Behind the scenes looks" },
    { id: 2, title: "Live Event Coverage", subtitle: "Front row experiences" },
    { id: 3, title: "Industry Inside", subtitle: "Creators & filmmakers" },
    { id: 4, title: "Trend Reports", subtitle: "What's next in culture" },
    { id: 5, title: "Viral Moments", subtitle: "Content that breaks out" },
    { id: 6, title: "Interviews", subtitle: "Creators & talent" },
];

const FeaturedContent = () => {
    const [showAll, setShowAll] = useState(false);

    return (
		<section className="w-full bg-cover bg-center py-12">
			<div className="max-w-7xl mx-auto px-6">
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-2xl md:text-3xl font-extrabold text-white">FEATURED CONTENT</h3>

					<button className="text-sm text-white/90 underline-offset-4" onClick={() => setShowAll(true)}>
						View All
					</button>
				</div>

				{/* Desktop: grid-cols-4; Mobile: horizontal slider */}
				<div>
					<div className="hidden lg:grid lg:grid-cols-4 gap-6">
						{sampleData.slice(0, 4).map((item) => (
							<article key={item.id} className="bg-[#07529822] rounded-lg overflow-hidden">
								<div className="h-48 bg-cover bg-center" style={{backgroundImage: `url(${featuredContentImg})`}} />
								<div className="p-4">
									<h4 className="text-white font-semibold mb-1">{item.title}</h4>
									<p className="text-sm text-[#94A3B8]">{item.subtitle}</p>
								</div>
							</article>
						))}
					</div>

					{/* Horizontal slider for small screens */}
					<div className="flex gap-6 overflow-x-auto pb-4 lg:hidden">
						{sampleData.map((item) => (
							<article key={item.id} className="min-w-55 sm:min-w-65 bg-[#07529822] rounded-lg overflow-hidden">
								<div className="h-40 bg-cover bg-center" style={{backgroundImage: `url(${featuredContentImg})`}} />
								<div className="p-4">
									<h4 className="text-white font-semibold mb-1">{item.title}</h4>
									<p className="text-sm text-[#94A3B8]">{item.subtitle}</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>

			{/* Modal / overlay for View All on click */}
			{showAll && (
				<div className="fixed inset-0 z-50 flex items-start justify-center p-6">
					<div className="absolute inset-0 bg-black/60" onClick={() => setShowAll(false)} />
					<div className="relative max-w-6xl w-full bg-[#07101a] rounded-xl p-6 overflow-auto" style={{maxHeight: "85vh"}}>
						<div className="flex items-center justify-between mb-4">
							<h4 className="text-xl font-bold text-white">All Featured Content</h4>
							<button className="text-white/80" onClick={() => setShowAll(false)}>
								Close
							</button>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{sampleData.map((item) => (
								<article key={item.id} className="bg-[#07529822] rounded-lg overflow-hidden">
									<div className="h-40 bg-cover bg-center" style={{backgroundImage: `url(${featuredContentImg})`}} />
									<div className="p-4">
										<h4 className="text-white font-semibold mb-1">{item.title}</h4>
										<p className="text-sm text-[#94A3B8]">{item.subtitle}</p>
									</div>
								</article>
							))}
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default FeaturedContent;