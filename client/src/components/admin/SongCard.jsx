import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { motion } from "framer-motion";

const SongCard = ({ index, data }) => {
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
				<span className='block my-1 text-sm text-gray-400'>
					{data?.artist.length > 25
						? `${data?.artist.slice(0, 25)}...  `
						: data?.artist}
				</span>
			</p>
			<div className='absolute flex items-center justify-between w-full px-4 bottom-2 right-2'>
				<motion.i
					whileTap={{ scale: 0.75 }}
					className='text-red-400 drop-shadow-md hover:text-red-600'
				>
					<HiOutlineTrash className='text-xl' />
				</motion.i>
			</div>
		</motion.div>
	);
};

export default SongCard;
