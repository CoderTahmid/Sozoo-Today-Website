import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import logo from "../assets/Sozoo_Today_Logo.png";

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "Popular Now", href: "/#popular-now" },
		{ name: "News Section", href: "/#news-section" },
	];

	return (
		<header
			className={`z-50 w-full transition-all duration-300 mb-10 ${
				isScrolled
					? "border-b border-zinc-700/80 bg-zinc-900/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
					: "border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
			}`}
		>
			<div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
				{/* Brand Logo */}
				<Link
					to="/"
					className="group flex items-center gap-3 transition-transform duration-200 hover:opacity-90 active:scale-95"
				>
					<img
						src={logo}
						alt="Sozoo Today"
						className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105 sm:h-11"
					/>
				</Link>

				{/* Desktop Navigation Links */}
				<nav className="hidden items-center gap-3 lg:flex">
					<div className="flex items-center gap-1 rounded-full border border-zinc-750 border-zinc-700/70 bg-zinc-950/70 p-1.5 backdrop-blur-md">
						{navLinks.map((link) => (
							<a
								key={link.name}
								href={link.href}
								className="rounded-full px-5 py-2 text-sm font-medium tracking-wide text-zinc-300 transition duration-200 hover:bg-zinc-800 hover:text-cyan-300"
							>
								{link.name}
							</a>
						))}
					</div>
				</nav>

				{/* Mobile Hamburger Button */}
				<div className="flex items-center gap-3 lg:hidden">
					<button
						type="button"
						onClick={() => setMobileMenuOpen((prev) => !prev)}
						aria-label="Toggle navigation menu"
						className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950/80 p-2 text-zinc-300 transition duration-200 hover:border-zinc-600 hover:text-white active:scale-95"
					>
						{mobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
					</button>
				</div>
			</div>

			{/* Mobile Dropdown Menu */}
			{mobileMenuOpen && (
				<div className="border-b border-zinc-800 bg-zinc-900/98 px-4 pb-6 pt-2 backdrop-blur-2xl lg:hidden">
					<div className="mx-auto max-w-md space-y-2">
						{navLinks.map((link) => (
							<a
								key={link.name}
								href={link.href}
								onClick={() => setMobileMenuOpen(false)}
								className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm font-medium text-zinc-200 transition duration-150 hover:border-cyan-400/40 hover:bg-zinc-800 hover:text-cyan-300"
							>
								<span>{link.name}</span>
								<FiArrowUpRight className="text-zinc-500" />
							</a>
						))}
					</div>
				</div>
			)}
		</header>
	);
};

export default Navbar;
