import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";

const Community = () => {
    const socialLinks = [
        { icon: FaInstagram, label: "Instagram", url: "#" },
        { icon: FaTwitter, label: "Twitter", url: "#" },
        { icon: FaFacebook, label: "Facebook", url: "#" },
        { icon: FaYoutube, label: "YouTube", url: "#" },
    ];

    return (
        <section className="border-t w-[90%] mx-auto border-b border-white/10 py-16">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-8">Join the Community</h3>
                
                <div className="flex justify-center gap-8">
                    {socialLinks.map((link, index) => {
                        const IconComponent = link.icon;
                        return (
                            <a
                                key={index}
                                href={link.url}
                                aria-label={link.label}
                                className="text-[#FF6B35] hover:text-[#FF6B35]/80 transition-colors duration-200"
                            >
                                <IconComponent size={32} />
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Community;