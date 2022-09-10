import React, { useState } from "react";

import moment from "moment";
import { motion } from "framer-motion";

import { MdDelete } from "react-icons/md";

import { getUsers, updateRole, deleteUser } from "../../api";
import { actionType, useStateValue } from "../../context/index";

const Userscard = ({ data, index }) => {
	const [{ user, allUsers }, dispatch] = useStateValue();
	const [userRoleUpdated, setUserRoleUpdated] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const updateUserRole = (userid, role) => {
		updateRole(userid, role).then((res) => {
			if (res) {
				getUsers().then((data) => {
					dispatch({
						type: actionType.SET_ALL_USERS,
						allUsers: data.data,
					});
				});
			}
		});
	};

	const removeUser = (userId) => {
		deleteUser(userId).then((res) => {
			if (res) {
				getUsers().then((data) => {
					dispatch({
						type: actionType.SET_ALL_USERS,
						allUsers: data.data,
					});
				});
			}
		});
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: index * 0.1 }}
			className='w-full min-w-[750px] flex items-center justify-between hover:bg-card hover:shadow-md cursor-pointer '
		>
			{/* {data._id !== user?.user._id && (
				<motion.div
					whileTap={{ scale: 0.8 }}
					onClick={() => deleteUser(data._id)}
					className='absolute flex items-center justify-center w-8 h-8 bg-gray-200 rounded-md left-4'
				>
					<MdDelete className='text-xl text-red-400 hover:text-red-500' />
				</motion.div>
			)} */}

			<img
				src={data?.imageURL}
				alt=''
				className='w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md'
			/>

			<p className=' text-textColor  w-275 min-w-[160px]  '>
				{data?.name}
			</p>
			<p className=' text-textColor  w-275 min-w-[160px]  '>
				{data?.email}
			</p>
			<p className=' text-textColor capitalize  w-275 min-w-[160px]  '>
				{data?.email_verified ? "verified" : "unverified"}
			</p>
			<p className=' text-textColor  w-275 min-w-[160px]  '>
				{moment(new Date(data?.createdAt)).format("ll")}
			</p>
			<p className=' text-textColor capitalize  w-275 min-w-[160px]  '>
				{data?.role}
			</p>
			<div className='w-275 min-w-[160px] text-center flex items-center  px-3  justify-between  relative'>
				{/* <p className='capitalize text-textColor'>{data?.role}</p> */}
				{data._id !== user?.user._id && (
					<motion.p
						onClick={() => setUserRoleUpdated(true)}
						whileTap={{ scale: 0.8 }}
						className='px-1.5 py-1 text-xs font-semibold bg-purple-200 rounded-sm text-textColor hover:shadow-md'
					>
						{data?.role === "admin"
							? "Mark as member"
							: "Mark as admin"}
					</motion.p>
				)}
				{userRoleUpdated && (
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.5 }}
						className='absolute z-10 flex flex-col items-start gap-4 p-4 bg-white rounded-md shadow-xl top-6 right-4'
					>
						<div className='text-sm font-semibold text-textColor'>
							Are you sure, do you want to mark the user as{" "}
							<span>
								{data?.role === "admin" ? "Member" : "Admin"}
							</span>
							<div className='flex items-center justify-between gap-4 px-3 '>
								<motion.button
									whileTap={{ scale: 0.85 }}
									onClick={() =>
										updateUserRole(
											data._id,
											data.role === "admin"
												? "member"
												: "admin",
										)
									}
									className='px-4 py-1 text-xs text-black bg-blue-400 border-none rounded-md outline-none hover:shadow-md'
								>
									Yes
								</motion.button>
								<motion.button
									whileTap={{ scale: 0.85 }}
									className='px-4 py-1 text-sm text-black bg-blue-100 border-none rounded-md outline-none hover:shadow-md'
								>
									No
								</motion.button>
							</div>
						</div>
					</motion.div>
				)}
				{data._id !== user?.user._id && (
					<motion.p
						onClick={() => setIsDeleting(true)}
						whileTap={{ scale: 0.8 }}
						className='px-1.5 py-1 flex  items-center gap-1 justify-center  rounded-sm text-textColor hover:shadow-md'
					>
						Delete
						<MdDelete className='text-xl text-red-400 hover:text-red-500' />
					</motion.p>
				)}
				{isDeleting && (
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.5 }}
						className='absolute z-10 flex flex-col items-start gap-4 p-4 bg-white rounded-md shadow-xl top-6 right-4'
					>
						<div className='text-sm font-normal text-textColor'>
							Are you sure, do you want to delete this user?
							<div className='flex items-center justify-between gap-4 px-3 mt-2 '>
								<motion.button
									whileTap={{ scale: 0.85 }}
									onClick={() => removeUser(data?._id)}
									className='px-2 py-1 text-xs text-black bg-blue-400 border-none rounded-md outline-none hover:shadow-md'
								>
									Yes
								</motion.button>
								<motion.button
									whileTap={{ scale: 0.85 }}
									className='px-2 py-1 text-sm text-black bg-blue-100 border-none rounded-md outline-none hover:shadow-md'
								>
									No
								</motion.button>
							</div>
						</div>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
};

export default Userscard;
