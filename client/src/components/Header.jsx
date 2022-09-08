import React, { useState } from "react";
import { Logo } from "../assets/img";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";

import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { useStateValue } from "../context/index";
import { app } from "../config/firebase.config";

import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";

const Header = () => {
	const [{ user }] = useStateValue();
	const navigate = useNavigate();

	const [isMenu, setIsMenu] = useState(false);

	const logout = () => {
		const auth = getAuth(app);
		auth.signOut()
			.then(() => {
				window.localStorage.setItem("auth", "false");
			})
			.catch((e) => {
				console.log(e);
				navigate("/login", { replace: true });
			});
	};

	return (
		<header className='flex items-center w-full p-4 md:px-6 md:py-2'>
			<Link to='/'>
				<img src={Logo} alt='logo' className='w-16' />
			</Link>
			<ul className='flex items-center justify-center ml-7'>
				<li className='mx-5 text-lg '>
					<NavLink
						to='/home'
						className={({ isActive }) =>
							isActive ? isActiveStyles : isNotActiveStyles
						}
					>
						Home
					</NavLink>
				</li>

				<li className='mx-5 text-lg'>
					<NavLink
						to='/music'
						className={({ isActive }) =>
							isActive ? isActiveStyles : isNotActiveStyles
						}
					>
						Musics
					</NavLink>
				</li>

				<li className='mx-5 text-lg'>
					<NavLink
						to='/premium'
						className={({ isActive }) =>
							isActive ? isActiveStyles : isNotActiveStyles
						}
					>
						Premium
					</NavLink>
				</li>

				<li className='mx-5 text-lg'>
					<NavLink
						to='/contact'
						className={({ isActive }) =>
							isActive ? isActiveStyles : isNotActiveStyles
						}
					>
						Contact Us
					</NavLink>
				</li>
			</ul>
			<div
				onMouseEnter={() => setIsMenu(true)}
				onMouseLeave={() => setIsMenu(false)}
				className='relative flex gap-2 ml-auto cursor-pointer '
			>
				<img
					src={user?.user?.imageURL}
					alt='avatar'
					referrerPolicy='no-referrer'
					className='w-12 h-12 min-w-[44px] rounded-full shadow-lg object-cover'
				/>
				<div className='flex flex-col'>
					<p className='text-lg font-semibold text-textColor hover:text-headingColor'>
						{user?.user?.name}
					</p>
					<p className='flex items-center gap-2 text-xs font-normal text-gray-500'>
						Premium Member{" "}
						<FaCrown className='-ml-1 text-sm text-yellow-500' />{" "}
					</p>
				</div>
				{isMenu && (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 50 }}
						className='absolute z-10 flex flex-col gap-2 p-3 rounded-lg shadow-lg right-2 top-14 w-275 bg-card backdrop-blur-sm'
					>
						<NavLink to='/userprofile'>
							<p className='transition-all duration-150 ease-in-out cursor-pointer text-textColor hover:font-semibold'>
								Profile
							</p>
						</NavLink>
						<p className='transition-all duration-150 ease-in-out cursor-pointer text-textColor hover:font-semibold'>
							My Favourites
						</p>

						<hr />
						{user?.user?.role === "admin" && (
							<>
								<NavLink to='/dashboard/home'>
									<p className='transition-all duration-150 ease-in-out cursor-pointer text-textColor hover:font-semibold'>
										Dashboard
									</p>
								</NavLink>
								<hr />
							</>
						)}

						<p
							onClick={logout}
							className='transition-all duration-150 ease-in-out cursor-pointer text-textColor hover:font-semibold'
						>
							Sign Out
						</p>
					</motion.div>
				)}
			</div>
		</header>
	);
};

export default Header;
