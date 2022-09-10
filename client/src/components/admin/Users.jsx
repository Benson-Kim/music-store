import React from "react";
import { useStateValue } from "../../context/StateProvider";
import Userscard from "./Userscard";

const Users = () => {
	const [{ allUsers }, dispatch] = useStateValue();
	return (
		<div className='flex flex-col items-center justify-center w-full p-4'>
			{/* filters */}
			{/* Tabular data form */}
			<div className='w-full relative py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center p-4 border border-gray-300 rounded-md gap-3'>
				<div className='absolute top-4 left-4'>
					<p className='text-xl font-semibold text-textColor'>
						Count:
						<span className='font-bold text-slate-800 '>
							{" " + allUsers?.length}
						</span>
					</p>
				</div>
				{/* table header */}
				<div className='w-full min-w-[750px] flex items-center justify-between'>
					<p className='text-sm text-textColor font-semibold w-275 min-w-[160px]  '>
						Image
					</p>
					<p className='text-sm text-textColor font-semibold w-275 min-w-[160px]  '>
						Name
					</p>
					<p className='text-sm text-textColor font-semibold w-275 min-w-[160px]  '>
						Email
					</p>
					<p className='text-sm text-textColor font-semibold w-275 min-w-[160px]  '>
						Verified
					</p>
					<p className='text-sm text-textColor font-semibold w-275 min-w-[160px]  '>
						Created
					</p>
					<p className='text-sm text-textColor font-semibold w-275 min-w-[160px]  '>
						Role
					</p>
					<p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center '>
						Action
					</p>
				</div>
				{/* table content */}
				{allUsers?.map((data, idx) => (
					<Userscard key={idx} index={idx} data={data} />
				))}
			</div>
		</div>
	);
};

export default Users;
