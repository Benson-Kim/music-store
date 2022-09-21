import { NavLink, Route, Routes } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import Header from "../Header";
import Home from "./Home";
import Songs from "./Songs";
import Users from "./Users";
import NewSong from "./NewSong";
import Album from "./Album";
import Artists from "./Artists";

import { isActiveStyles, isNotActiveStyles } from "../../utils/styles";

const Dashboard = () => {
	return (
		<div className='flex flex-col items-center justify-center w-full h-auto bg-primary'>
			<Header />
			<div className='my-2 w-[60%] p-4 flex items-center justify-evenly '>
				<NavLink to='/dashboard/home'>
					<AiOutlineHome className='text-2xl text-textColor' />
				</NavLink>
				<NavLink
					to='/dashboard/users'
					className={({ isActive }) =>
						isActive ? isActiveStyles : isNotActiveStyles
					}
				>
					Users
				</NavLink>
				<NavLink
					to='/dashboard/songs'
					className={({ isActive }) =>
						isActive ? isActiveStyles : isNotActiveStyles
					}
				>
					Songs
				</NavLink>
				<NavLink
					to='/dashboard/artists'
					className={({ isActive }) =>
						isActive ? isActiveStyles : isNotActiveStyles
					}
				>
					Artists
				</NavLink>
				<NavLink
					to='/dashboard/albums'
					className={({ isActive }) =>
						isActive ? isActiveStyles : isNotActiveStyles
					}
				>
					Albums
				</NavLink>
			</div>
			<div className='w-full p-4 my-4'>
				<Routes>
					<Route path='/home' element={<Home />} />
					<Route path='/users' element={<Users />} />
					<Route path='/songs' element={<Songs />} />
					<Route path='/artists' element={<Artists />} />
					<Route path='/albums' element={<Album />} />
					<Route path='/newsong' element={<NewSong />} />
				</Routes>
			</div>
		</div>
	);
};

export default Dashboard;
