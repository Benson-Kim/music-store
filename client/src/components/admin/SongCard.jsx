import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { motion } from "framer-motion";
import { useState } from "react";
import { deleteArtist, deleteSong, getArtists, getSongs } from "../../api";
import { toast } from "react-toastify";
import { actionType, useStateValue } from "../../context";

const SongCard = ({ data, type }) => {
	const [isDelete, setIsDelete] = useState(false);
	const [{ allSongs }, dispatch] = useStateValue();

	const deleteObject = (id) => {
		if (type === "song") {
			deleteSong(id).then((res) => {
				if (res.data) {
					getSongs().then((res) => {
						dispatch({
							type: actionType.SET_ALL_SONGS,
							allSongs: res.data,
						});
					});
					toast.success(`Song deleted successfully`);
				}
			});
		}
		if (type === "artist") {
			console.log(id);
			deleteArtist(id).then((res) => {
				if (res.data) {
					getArtists().then((res) => {
						dispatch({
							type: actionType.SET_ALL_ARTISTS,
							allArtists: res.data,
						});
					});
					// toast.success(`Artist deleted successfully`);
				}
			});
		}
		if (type === "album") {
			console.log(id);
			deleteSong(id).then((res) => {
				if (res.data) {
					getSongs().then((res) => {
						dispatch({
							type: actionType.SET_ALL_SONGS,
							allSongs: res.data,
						});
					});
					toast.success(`Song deleted successfully`);
				}
			});
		}
	};

	return (
		<motion.div className='relative flex flex-col items-center w-40 px-2 py-4 border border-gray-300 rounded-lg shadow-md cursor-pointer min-w-210 hover:bg-card bg-inherit'>
			<div className='w-40 min-w-[160px] min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden'>
				<motion.img
					whileHover={{ scale: 1.05 }}
					src={data?.imageURL}
					alt={data?.name}
					className='object-cover w-full h-[160px] rounded-lg'
				/>
			</div>
			<p className='my-2 font-semibold text-headingColor'>
				{data?.name.length > 25
					? `${data?.name.slice(0, 25)}...  `
					: data?.name}
				{data.artist && (
					<span className='block my-1 text-sm text-gray-400'>
						{data?.artist.length > 25
							? `${data?.artist.slice(0, 25)}...  `
							: data?.artist}
					</span>
				)}
			</p>
			<button
				onClick={() => setIsDelete(true)}
				className='absolute flex items-center justify-between w-full px-4 bottom-2 right-2'
			>
				<motion.i
					whileTap={{ scale: 0.75 }}
					className='text-red-400 drop-shadow-md hover:text-red-600'
				>
					<HiOutlineTrash className='text-xl' />
				</motion.i>
			</button>
			{isDelete && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='absolute inset-0 flex flex-col items-center justify-center px-4 py-2 backdrop-blur-md bg-cardOverlay'
				>
					<p className='text-lg font-semibold text-center text-headingColor'>
						Are you sure, do you want to delete
					</p>
					<div className='flex items-center gap-10 mt-3'>
						<motion.button
							onClick={deleteObject(data._id)}
							whileTap={{ scale: 0.75 }}
							className='px-3 py-1 text-sm text-center text-white uppercase transition ease-in-out border border-gray-300 rounded-md duration-15 hover:bg-red-500 hover:shadow-md'
						>
							Yes
						</motion.button>
						<motion.button
							onClick={() => setIsDelete(false)}
							whileTap={{ scale: 0.75 }}
							className='px-3 py-1 text-sm text-center text-white uppercase transition ease-in-out bg-blue-500 border border-gray-300 rounded-md duration-15 hover:bg-emerald-500 hover:shadow-md'
						>
							No
						</motion.button>
					</div>
				</motion.div>
			)}
		</motion.div>
	);
};

export default SongCard;
