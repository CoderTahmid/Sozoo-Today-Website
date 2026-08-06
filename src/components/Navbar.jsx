import logo from "../assets/Sozoo_Today_Logo.png";

const Navbar = () => {
	const newsHref = "/#news-section";

	return (
		<div className="navbar  shadow-sm text-white justify-between bg-black">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							{" "}
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{" "}
						</svg>
					</div>
						<ul tabIndex="-1" className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-black text-white border border-gray-800">
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href={newsHref}>News section</a>
						</li>
					</ul>
				</div>
				<a href="/" className="">
					<img src={logo} alt="Sozoo Today" className="h-10 w-auto" />
				</a>
			</div>
			<div className=" hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href={newsHref}>News section</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
