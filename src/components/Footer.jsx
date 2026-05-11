import { FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { TbCube } from "react-icons/tb";
import { Link } from "react-router-dom";

const Footer = () => {
  const company = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about-us" },
    { label: "Careers", path: "#" },
    { label: "Contact", path: "/contact-us" },
  ];
  const brands = [
    { label: "Sozoo Today", path: "https://www.facebook.com/sozootoday" },
    { label: "Get The Fame", path: "https://www.facebook.com/getthefaaame" },
    { label: "Sozoo Entertainment", path: "https://www.facebook.com/sozooentertainmentmedia" },
    { label: "Best Bangladeshi Ads", path: "https://www.facebook.com/profile.php?id=61584016537480" },
  ];
  const services = [
    { label: "Brand Strategy", path: "#" },
    { label: "Content Creation", path: "#" },
    { label: "Talent Management", path: "#" },
    { label: "Media Buying", path: "#" },
  ];

  const sections = [
    { title: "Company", links: company },
    { title: "Our Brands", links: brands },
    { title: "Services", links: services },
  ];

  const socials = [
    { icon: <FaTwitter />, label: "Twitter", url: "https://x.com/SozooToday" },
    { icon: <FaInstagram />, label: "Instagram", url: "https://www.instagram.com/sozoo.today" },
    { icon: <FaLinkedinIn />, label: "LinkedIn", url: "https://www.linkedin.com/company/sozootoday/" },
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
                  <li key={link.label}>
                    {link.path === "#" ? (
                      <a
                        href="#"
                        className="text-slate-400 text-sm hover:text-teal-400 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : link.path.startsWith("/") ? (
                      <Link
                        to={link.path}
                        className="text-slate-400 text-sm hover:text-teal-400 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 text-sm hover:text-teal-400 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    )}
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
            {socials.map(({ icon, label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
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