const CultureAtScale = () => {
    return (
        <section
            className="w-full bg-cover bg-center py-20"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left text column */}
                    <div className="lg:col-span-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-wider mb-6">CULTURE AT SCALE</h2>
                        <p className="text-base text-[#94A3B8] max-w-xl">Our Entertainment brand connects with digital natives globally, delivering the stories they care about most. From cinematic deep-dives to real-time pop culture updates, we set the narrative.</p>
                    </div>

                    {/* Right cards */}
                    <div className="lg:col-span-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-[#0b1722]/80 rounded-xl p-6">
                                <div className="w-12 h-12 rounded-md flex items-center justify-center mb-4" style={{background: 'rgba(255,107,53,0.06)'}}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="#FF6B35"/>
                                        <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4v1H4v-1z" fill="#FF6B35" opacity="0.9"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Gen-Z & Millennials</h3>
                                <p className="text-sm text-[#94A3B8]">Core audience demographic shaping modern trends.</p>
                            </div>

                            <div className="bg-[#0b1722]/80 rounded-xl p-6">
                                <div className="w-12 h-12 rounded-md flex items-center justify-center mb-4" style={{background: 'rgba(255,107,53,0.06)'}}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="6" width="20" height="12" rx="2" stroke="#FF6B35" strokeWidth="1.5" fill="none"/>
                                        <path d="M8 10l4 2-4 2V10z" fill="#FF6B35"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Video First Content</h3>
                                <p className="text-sm text-[#94A3B8]">Short-form vertical video focus for high engagement.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CultureAtScale;