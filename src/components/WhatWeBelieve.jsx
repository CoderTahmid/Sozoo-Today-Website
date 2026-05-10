const WhatWeBelieve = () => {
    const beliefs = [
        {
            icon: "🔗",
            title: "Media = network",
            description: "It's not just a single page, but a connected ecosystem of diverse voices."
        },
        {
            icon: "👥",
            title: "Respect the audience",
            description: "Young users value smart, efficient content. We don't talk down to them."
        },
        {
            icon: "⚙️",
            title: "Algorithms are tools",
            description: "They are not the enemy — we leverage them to deliver the right story to the right person."
        },
        {
            icon: "⚡",
            title: "Fast + shallow",
            description: "Concise and credible content can coexist. Speed shouldn't compromise quality."
        }
    ];

    return (
        <div className="w-full py-12 md:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Main Title */}
                <h1 className="text-white text-center text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                    What we believe
                </h1>

                {/* Subheading */}
                <h2 className="text-center text-gray-400 text-lg md:text-xl lg:text-2xl font-light mb-8 md:mb-12 lg:mb-16">
                    Our philosophy for modern media.
                </h2>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {beliefs.map((belief, index) => (
                        <div
                            key={index}
                            className="rounded-3xl border border-slate-700/40 p-8 md:p-10 lg:p-12 backdrop-blur-sm hover:border-slate-600/60 transition-colors duration-300"
                        >
                            {/* Icon */}
                            <div className="text-4xl md:text-5xl mb-6 text-cyan-400">
                                {belief.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-white text-2xl md:text-2xl lg:text-3xl font-semibold mb-4">
                                {belief.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-300 text-base md:text-base lg:text-lg leading-relaxed">
                                {belief.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhatWeBelieve;