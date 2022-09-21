import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsPatchPlus } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";

import { getArtists } from "../../api";
import { actionType, useStateValue } from "../../context/index";
import SongCard from "./SongCard";

const Artists = () => {
	const [songFilter, setSongFilter] = useState("");
	const [inputFocus, setInputFocus] = useState(false);

	const [{ allArtists }, dispatch] = useStateValue();

	useEffect(() => {
		if (!allArtists) {
			getArtists().then((res) => {
				dispatch({
					type: actionType.SET_ALL_ARTISTS,
					allArtists: res.data,
				});
			});
		}
	}, []);

	return (
		<div className='flex flex-col items-center justify-center w-full p-4'>
			<div className='flex items-center justify-center w-full gap-20'>
				<NavLink
					to='/dashboard/newsong'
					className='flex items-center justify-center p-2 transition ease-in-out border border-gray-300 rounded-full duration-15 hover:border-gray-500 text-emerald-700 hover:bg-emerald-700 hover:text-emerald-100 hover:shadow-md'
				>
					<BsPatchPlus className='text-xl ' />
				</NavLink>
				<input
					type='text'
					value={songFilter}
					placeholder='Search here...'
					onChange={(e) => setSongFilter(e.target.value)}
					className={`w-52 px-4 py-2 border ${
						inputFocus
							? "border-gray-500 shadow-md"
							: "border-gray-300"
					} rounded-md bg-transparent outline-none transition duration-150 ease-in-out text-textColor
					`}
					onFocus={() => setInputFocus(true)}
					onBlur={() => setInputFocus(false)}
				/>
				<i>
					<AiOutlineClear className='text-3xl cursor-pointer text-textColor' />
				</i>
			</div>

			{/* Main Container */}
			<div className='relative w-full p-4 my-4 border border-gray-300 rounded-md'>
				{/* number of songs */}
				<div className='absolute top-4 left-4'>
					<p className='font-bold '>
						Count:{" "}
						<span className='text-sm font-semibold text-textColor'>
							{allArtists?.length}
						</span>
					</p>
				</div>
				{/* songs */}
				<ArtistsContainer data={allArtists} />
			</div>
		</div>
	);
};

export default Artists;

export const ArtistsContainer = ({ data }) => {
	return (
		<div className='flex flex-wrap items-center w-full gap-3 justify-evenly'>
			{data &&
				data.map((artist, index) => (
					<SongCard
						key={artist._id}
						data={artist}
						index={index}
						type={"artist"}
					/>
				))}
		</div>
	);
};
