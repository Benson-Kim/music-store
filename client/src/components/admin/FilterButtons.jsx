import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { motion } from "framer-motion";

import { actionType, useStateValue } from "../../context/index";

const FilterButtons = ({ filterData, flag }) => {
	const [filterName, setfilterName] = useState(null);
	const [filterMenu, setfilterMenu] = useState(false);

	const [dispatch] = useStateValue();

	const updateFilterBtn = (name) => {
		setfilterMenu(false);
		setfilterName(name);

		if (flag === "Artist") {
			dispatch({
				type: actionType.SET_ARTIST_FILTER,
				artistFilter: name,
			});
		}
		if (flag === "Album") {
			dispatch({
				type: actionType.SET_ALBUM_FILTER,
				albumFilter: name,
			});
		}
		if (flag === "Language") {
			dispatch({
				type: actionType.SET_LANG_FILTER,
				langFilter: name,
			});
		}
		if (flag === "Category") {
			dispatch({
				type: actionType.SET_FILTER_TERM,
				filterTerm: name,
			});
		}
	};

	return (
		<div className='relative px-4 py-1 border border-gray-300 rounded-md cursor-pointer hover:border-gray-400'>
			<div
				onClick={() => setfilterMenu(!filterMenu)}
				className='flex items-center gap-2 tracking-wide text-textColor'
			>
				{!filterName && flag}
				{filterName && (
					<p className=''>
						{filterName.length > 15
							? `${filterName.slice(0, 15)}...`
							: filterName}
					</p>
				)}
				<BiChevronDown
					className={`${
						filterMenu ? "rotate-180" : "rotate-0"
					} text-textColor transition-all duration-150 ease-in-out`}
				/>
				{filterData && filterMenu && (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 50 }}
						className='absolute left-0 z-50 flex flex-col w-48 py-2 overflow-y-scroll rounded-md shadow-md backdrop-blur-sm max-h-44 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 top-8'
					>
						{filterData?.map((data, idx) => (
							<div
								key={idx}
								onClick={() => updateFilterBtn(data.name)}
								className='flex items-center px-4 py-1 hover:bg-gray-200'
							>
								{(flag === "Artist" || flag === "Album") && (
									<img
										src={data.imageURL}
										alt=''
										className='w-8 min-w-[32px] h-8 rounded-full object-cover'
									/>
								)}
								<p className='w-full'>
									{data.name.length > 15
										? `${data.name.slice(0, 15)}...`
										: data.name}
								</p>
							</div>
						))}
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default FilterButtons;
