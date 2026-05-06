const OurServices = () => {
    const services = [
        { title: "Social management" },
        { title: "Crisis communication" },
        { title: "Reputation management" },
        { title: "Monthly reporting" }
    ];

    return (
        <div className="w-full text-white py-12 md:py-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Main heading */}
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16">
                    OUR SERVICES
                </h2>

                {/* Blue badge with service type */}
                <div className="flex justify-center mb-8 md:mb-10">
                    <div className="border border-blue-500 rounded-full px-6 md:px-8 py-3 inline-block">
                        <span className="text-blue-400 md:text-lg flex items-center gap-2">
                            <span style={{ color: "#3B82F6" }}>Media Buying & Campaigns</span>
                        </span>
                    </div>
                </div>

                {/* Large heading */}
                <h3 className="text-2xl md:text-5xl font-bold text-center mb-6 md:mb-8 leading-tight">
                    REACH THE RIGHT AUDIENCE.
                </h3>

                {/* Description */}
                <p className="text-center text-gray-300 text-sm md:text-lg mb-12 md:mb-16 max-w-3xl mx-auto">
                    Manage conversations, shape perception, and maintain consistent messaging across all digital platforms.
                </p>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="border text-center border-gray-700 rounded-3xl p-6 md:p-8 hover:border-blue-500 transition-colors duration-300 shadow-amber-800"
                        >
                            <h4 className="text-xl md:text-2xl font-semibold text-white">
                                {service.title}
                            </h4>
                        </div>  
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurServices;