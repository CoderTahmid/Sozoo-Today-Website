import {FaArrowRight, FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {FiCheckCircle} from "react-icons/fi";
import {useState} from "react";

const ContactUs = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		company: "",
		inquiryType: "Advertising & Sponsorship",
		message: "",
	});

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission
		console.log("Form submitted:", formData);
	};

	return (
		<div className="w-full text-white">
			{/* Form Section */}
			<section className="px-4 py-12 md:px-8 md:py-16 lg:py-20">
				<div className="mx-auto max-w-2xl lg:max-w-5xl">
					<div className="mb-8 md:mb-10">
						<h1 className="text-4xl font-black uppercase leading-none tracking-tight md:text-5xl lg:text-6xl">Let's talk.</h1>
						<p className="mt-4 text-base leading-7 text-slate-400 md:text-lg">Whether you're looking to advertise, partner, invest, or just say hello — we'd love to hear from you.</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/8 bg-[#0d1b2b] p-4 lg:p-8 lg:shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
						<div className="space-y-6 p-0 lg:space-y-7">
							<div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">
								{/* Full Name */}
								<div>
									<label className="block text-sm font-semibold text-white md:text-base mb-2">Full Name</label>
									<input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#1A8A7D]/50 focus:outline-none focus:ring-2 focus:ring-[#1A8A7D]/20 transition-colors md:px-5 md:py-4" />
								</div>

								{/* Email Address */}
								<div>
									<label className="block text-sm font-semibold text-white md:text-base mb-2">Email Address</label>
									<input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#1A8A7D]/50 focus:outline-none focus:ring-2 focus:ring-[#1A8A7D]/20 transition-colors md:px-5 md:py-4" />
								</div>

								{/* Company / Organization */}
								<div>
									<label className="block text-sm font-semibold text-white md:text-base mb-2">Company / Organization</label>
									<input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="e.g. Acme Corp" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#1A8A7D]/50 focus:outline-none focus:ring-2 focus:ring-[#1A8A7D]/20 transition-colors md:px-5 md:py-4" />
								</div>

								{/* Inquiry Type */}
								<div>
									<label className="block text-sm font-semibold text-white md:text-base mb-2">Inquiry Type</label>
									<select name="inquiryType" value={formData.inquiryType} onChange={handleChange} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#1A8A7D]/50 focus:outline-none focus:ring-2 focus:ring-[#1A8A7D]/20 transition-colors cursor-pointer md:px-5 md:py-4">
										<option value="Advertising & Sponsorship">Advertising & Sponsorship</option>
										<option value="Partnership">Partnership</option>
										<option value="Investment">Investment</option>
										<option value="General Inquiry">General Inquiry</option>
									</select>
								</div>
							</div>

							{/* Message */}
							<div>
								<label className="block text-sm font-semibold text-white md:text-base mb-2">Message</label>
								<textarea name="message" value={formData.message} onChange={handleChange} placeholder="How can we help you?" rows="5" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#1A8A7D]/50 focus:outline-none focus:ring-2 focus:ring-[#1A8A7D]/20 transition-colors resize-none md:px-5 md:py-4 md:text-base" />
							</div>

							{/* Submit Button */}
							<div className="pt-2 lg:pt-1">
								<button
									type="submit"
									className="btn flex w-full items-center justify-center gap-2 rounded-xl border-none px-8 py-4 text-base font-bold tracking-widest text-white transition-transform duration-300 hover:scale-[1.01]"
									style={{
										background: "linear-gradient(135deg, #4ecdc4, #2a9d8f, #1a7a6e)",
										boxShadow: "0 12px 40px rgba(34,197,94,0.12)",
									}}
								>
									SEND MESSAGE
									<FaArrowRight className="text-lg" />
								</button>
							</div>

							{/* Response Time Note */}
							<p className="text-center text-xs text-slate-400 md:text-sm">We usually respond within 24 hours</p>
						</div>
					</form>
				</div>
			</section>

			{/* Email & Social Section */}
			<section className="border-b border-white/10 px-4 py-12 md:px-8 md:py-16 lg:py-20">
				<div className="mx-auto max-w-2xl">
					<div className="space-y-8 md:space-y-10">
						{/* Email Contact */}
						<div className="text-center">
							<div className="mb-4 flex justify-center">
								<div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#1A8A7D]/25 text-[#7fd6cb] md:h-20 md:w-20">
									<MdEmail className="text-4xl md:text-5xl" />
								</div>
							</div>
							<p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400 md:text-sm">Email Us</p>
							<h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl lg:text-4xl break-all">connect@sozooday.com</h3>
						</div>

						{/* Social Channels */}
						<div className="text-center">
							<p className="text-sm text-slate-400 md:text-base mb-6">Or reach out to us directly on our social channels</p>
							<div className="flex items-center justify-center gap-4 md:gap-6">
								<a href="#" className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#1A8A7D] transition-all duration-300 hover:border-[#1A8A7D]/50 hover:bg-[#1A8A7D]/10 md:h-14 md:w-14">
									<FaFacebook className="text-xl md:text-2xl" />
								</a>
								<a href="#" className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#1A8A7D] transition-all duration-300 hover:border-[#1A8A7D]/50 hover:bg-[#1A8A7D]/10 md:h-14 md:w-14">
									<FaTwitter className="text-xl md:text-2xl" />
								</a>
								<a href="#" className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#1A8A7D] transition-all duration-300 hover:border-[#1A8A7D]/50 hover:bg-[#1A8A7D]/10 md:h-14 md:w-14">
									<FaInstagram className="text-xl md:text-2xl" />
								</a>
								<a href="#" className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#1A8A7D] transition-all duration-300 hover:border-[#1A8A7D]/50 hover:bg-[#1A8A7D]/10 md:h-14 md:w-14">
									<FaLinkedinIn className="text-xl md:text-2xl" />
								</a>
							</div>
						</div>

						{/* Trusted By */}
						<div className="border-t border-white/10 pt-8 text-center md:pt-10">
							<div className="flex items-center justify-center gap-2">
								<FiCheckCircle className="h-5 w-5 text-[#1A8A7D] md:h-6 md:w-6" />
								<p className="text-sm text-slate-400 md:text-base">Trusted by innovative brands worldwide</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ContactUs;
