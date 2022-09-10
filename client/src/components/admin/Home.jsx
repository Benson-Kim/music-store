import { useEffect } from "react";
import { FaMusic, FaUsers } from "react-icons/fa";
import { MdAlbum } from "react-icons/md";
import { RiUserStarFill } from "react-icons/ri";
import { getAlbums, getArtists, getSongs, getUsers } from "../../api";
import { actionType, useStateValue } from "../../context/index";
import { bgColors } from "../../utils/styles";

export const DashBoardCard = ({ icon, name, count }) => {
	const bg_Color = bgColors[parseInt(Math.random() * bgColors.length)];
	console.log(bg_Color);
	return (
		<div
			style={{ background: `${bg_Color}` }}
			className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}
		>
			{icon}
			<p className='text-xl font-semibold text-textColor'>{name}</p>
			<p className='text-xl text-textColor'>{count}</p>
		</div>
	);
};

const Home = () => {
	const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] =
		useStateValue();

	useEffect(() => {
		if (!allUsers) {
			getUsers().then((res) => {
				dispatch({
					type: actionType.SET_ALL_USERS,
					allUsers: res.data,
				});
			});
		}

		if (!allSongs) {
			getSongs().then((res) => {
				dispatch({
					type: actionType.SET_ALL_SONGS,
					allSongs: res.data,
				});
			});
		}

		if (!allArtists) {
			getArtists().then((res) => {
				dispatch({
					type: actionType.SET_ALL_ARTISTS,
					allArtists: res.data,
				});
			});
		}

		if (!allAlbums) {
			getAlbums().then((res) => {
				dispatch({
					type: actionType.SET_ALL_ALBUMS,
					allAlbums: res.data,
				});
			});
		}
	}, []);
	return (
		<div className='flex flex-wrap items-center w-full justify-evenly'>
			<DashBoardCard
				icon={<FaUsers className='text-3xl text-textColor' />}
				name={"Users"}
				count={allUsers?.length}
			/>
			<DashBoardCard
				icon={<RiUserStarFill className='text-3xl text-textColor' />}
				name={"Artists"}
				count={allArtists?.length}
			/>
			<DashBoardCard
				icon={<FaMusic className='text-3xl text-textColor' />}
				name={"Songs"}
				count={allSongs?.length}
			/>
			<DashBoardCard
				icon={<MdAlbum className='text-3xl text-textColor' />}
				name={"Albums"}
				count={allAlbums?.length}
			/>
		</div>
	);
};

export default Home;
