import { useState } from "react";
import logo from "../assets/logo.svg";
import { List } from "@phosphor-icons/react";

const Navbar = () => {
	const [showMenu, setShowMenu] = useState<boolean>(false);

	return (
		<nav className="grid md:grid-cols-6 px-8 md:px-14 bg-[#0B0819] py-3">
			<div className="flex justify-between items-center">
				<a href="/">
					<img
						src={logo}
						alt="neofi logo"
						className="md:col-span-1 place-items-center"
					/>
				</a>
				<List
					className="md:hidden"
					size={32}
					weight="bold"
					color="#627EEA"
					onClick={() => setShowMenu((prev) => !prev)}
				/>
			</div>
			<ul
				className={`${showMenu ? "flex flex-col space-y-3" : "hidden"}
				 md:flex md:col-span-4 md:flex-row items-center justify-center md:space-y-0 md:space-x-14 text-[#5A5A5A] font-semibold`}
			>
				<li className="hover:text-[#627EEA] no-underline md:hover:underline underline-offset-[29px]">
					<a href="#trade">Trade</a>
				</li>
				<li className="hover:text-[#627EEA] no-underline md:hover:underline underline-offset-[29px]">
					<a href="#earn">Earn</a>
				</li>
				<li className="hover:text-[#627EEA] no-underline md:hover:underline underline-offset-[29px]">
					<a href="#support">Support</a>
				</li>
				<li className="hover:text-[#627EEA] no-underline md:hover:underline underline-offset-[29px]">
					<a href="#about">About</a>
				</li>
			</ul>
			{/* <div className="w-1/2 mx-auto md:w-full lg:w-3/4"> */}
			<a
				href="#cta"
				className={`${
					showMenu ? "flex justify-center items-center mt-2" : "hidden"
				} md:flex justify-center items-center md:col-span-1 font-bold bg-gradient-to-r from-[#3387D5] to-[#7A06C9]
                                rounded-full py-3 w-1/2 mx-auto md:w-full md:text-xs lg:text-base`}
			>
				Contact wallet
			</a>
			{/* </div> */}
		</nav>
	);
};

export default Navbar;
