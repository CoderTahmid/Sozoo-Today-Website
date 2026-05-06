import { FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { TbCube } from "react-icons/tb";

const Footer = () => {
  const company = ["Home", "About Us", "Careers", "Contact"];
  const brands = ["Sozoo Today", "Get The Fame", "Sozoo Entertainment", "Best Bangladeshi Ads"];
  const services = ["Brand Strategy", "Content Creation", "Talent Management", "Media Buying"];

  const sections = [
    { title: "Company", links: company },
    { title: "Our Brands", links: brands },
    { title: "Services", links: services },
  ];

  const socials = [
    { icon: <FaTwitter />, label: "Twitter" },
    { icon: <FaInstagram />, label: "Instagram" },
    { icon: <FaLinkedinIn />, label: "LinkedIn" },
  ];

  return (
    <footer style={{ backgroundColor: "#0A1628" }} className="w-full text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TbCube className="text-teal-400 text-3xl" />
              <span className="text-2xl font-bold">Sozoo Media</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Bangladesh's premier digital media network building next-generation brands and audiences.
            </p>
          </div>

          {/* Nav Columns */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-white mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-400 text-sm hover:text-teal-400 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 Sozoo Media. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 text-sm hover:text-teal-400 hover:border-teal-400 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;