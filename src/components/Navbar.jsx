import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
		<div className="navbar bg-base-100 shadow-sm">
			{/* Mobile Layout */}
			<div className="lg:hidden flex justify-between w-full">
				<a className="btn btn-ghost text-xl">Sozoo Media</a>
				<div className="dropdown dropdown-end">
					<div tabIndex={0} role="button" className="btn btn-ghost">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							{" "}
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{" "}
						</svg>
					</div>
					<ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
						<li>
							<NavLink to={"/"}>Home</NavLink>
						</li>
						<li>
							<a>About</a>
						</li>
						<li>
							<a>Sozoo Today</a>
						</li>
						<li>
							<a>Sozoo Entertainment</a>
						</li>
						<li>
							<a>Get The Fame</a>
						</li>
						<li>
							<a>Best Bangaldeshi Ads</a>
						</li>
						<li>
							<NavLink to="/services">Services</NavLink>
						</li>
						<li>
							<a>Contact</a>
						</li>
					</ul>
				</div>
			</div>

			{/* Desktop Layout */}
			<div className="hidden lg:flex w-full">
				<div className="navbar-start flex-1">
					<ul className="menu menu-horizontal px-1">
						<li>
							<NavLink to={"/"}>Home</NavLink>
						</li>
						<li>
							<a>About</a>
						</li>
						<li>
							<NavLink to={"/"}>Sozoo Today</NavLink>
						</li>
						<li>
							<a>Sozoo Entertainment</a>
						</li>
					</ul>
				</div>
				<div className="navbar-center">
					<NavLink to={"/"} className="text-xl">Sozoo Media</NavLink>
				</div>
				<div className="navbar-end flex-1">
					<ul className="menu menu-horizontal px-1">
						<li>
							<a>Get The Fame</a>
						</li>
						<li>
							<a>Best Bangaldeshi Ads</a>
						</li>
						<li>
							<NavLink to="/services">Services</NavLink>
						</li>
						<li>
							<a>Contact</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;