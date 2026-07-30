import logo from "../assets/Sozoo_Today_Logo.png";

import {FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaYoutube, FaLinkedinIn, FaEnvelope, FaPhoneAlt} from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-black text-white border-t border-gray-800">
			<div className="max-w-7xl mx-auto px-6 py-12">
				{/* Top Section */}
				<div className="grid lg:grid-cols-3 gap-10">
					{/* Logo */}
					<div className="flex justify-center lg:justify-start">
						<img src={logo} alt="Sozoo Today" className="w-32 h-auto" />
					</div>

					{/* Description */}
					<div className="lg:col-span-2 text-gray-300 text-sm leading-7 text-center lg:text-left">Lorem ipsum dolor sit amet consectetur. Posuere aliquam euismod a sed integer maecenas. Integer eu condimentum faucibus ultricies nibh feugiat condimentum vitae dui. Sed pellentesque mauris donec interdum adipiscing eu. Porta rutrum enim tellus integer lobortis tellus venenatis tempus.</div>
				</div>

				{/* Contact */}
				<div className="mt-10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 border-t border-gray-800 pt-8">
					<div className="flex items-center gap-3 text-gray-300">
						<FaEnvelope className="text-lg" />
						<span>sozootoday@gmail.com</span>
					</div>

					<div className="flex items-center gap-3 text-gray-300">
						<FaPhoneAlt className="text-lg" />
						<span>+1 (555) 123-4567</span>
					</div>
				</div>

				{/* Social */}
				<div className="mt-12 text-center">
					<h3 className="font-bold tracking-wide uppercase mb-6">Find Us On Your</h3>

					<div className="flex justify-center gap-5 flex-wrap">
						<a href="#" className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-white hover:text-black duration-300 flex items-center justify-center text-xl">
							<FaFacebookF />
						</a>

						<a href="#" className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-white hover:text-black duration-300 flex items-center justify-center text-xl">
							<FaInstagram />
						</a>

						<a href="#" className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-white hover:text-black duration-300 flex items-center justify-center text-xl">
							<FaTiktok />
						</a>

						<a href="#" className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-white hover:text-black duration-300 flex items-center justify-center text-xl">
							<FaTwitter />
						</a>

						<a href="#" className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-white hover:text-black duration-300 flex items-center justify-center text-xl">
							<FaYoutube />
						</a>

						<a href="#" className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-white hover:text-black duration-300 flex items-center justify-center text-xl">
							<FaLinkedinIn />
						</a>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-gray-800">
				<div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
					<p>Copyright © 2026 Brand. All Rights Reserved.</p>

					<div className="flex flex-wrap justify-center gap-6">
						<a href="#" className="hover:text-white transition">
							Terms of Service
						</a>

						<a href="#" className="hover:text-white transition">
							Privacy Policy
						</a>

						<a href="#" className="hover:text-white transition">
							Cookie Policy
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
