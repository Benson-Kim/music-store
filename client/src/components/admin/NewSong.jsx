import { useState, useEffect } from "react";
import { BiCloudUpload, BiTrash } from "react-icons/bi";
import { motion } from "framer-motion";

import { storage } from "../../config/firebase.config";

import FilterButtons from "./FilterButtons";
import { getAlbums, getArtists, getSongs, saveNewSong } from "../../api";
import { actionType, useStateValue } from "../../context/index";
import { genreFilters, langFilters } from "../../utils/SupportFunctions";

import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from "firebase/storage";

const NewSong = () => {
	const [songName, setSongName] = useState("");

	const [imageLoading, setImageLoading] = useState(false);
	const [songImageCover, setSongImageCover] = useState(null);
	const [imgUploadProgress, setImgUploadProgress] = useState(0);

	const [audioLoading, setAudioLoading] = useState(false);
	const [audioFileCover, setAudioFileCover] = useState(null);
	const [audioUploadProgress, setAudioUploadProgress] = useState(0);

	const [
		{
			allArtists,
			allAlbums,
			filterTerm,
			artistFilter,
			albumFilter,
			langFilter,
		},
		dispatch,
	] = useStateValue();

	useEffect(() => {
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

	const deleteFileObject = (url, isImage) => {
		if (isImage) {
			setImageLoading(true);
			setAudioLoading(true);
		}

		const deleteRef = ref(storage, url);

		deleteObject(deleteRef).then(() => {
			setSongImageCover(null);
			setImageLoading(false);

			setAudioFileCover(null);
			setAudioLoading(false);
		});
	};

	const saveSong = () => {
		if (!songImageCover || !audioFileCover) {
			// throw a warning alert
		} else {
			setAudioLoading(true);
			setImageLoading(true);

			const data = {
				name: songName,
				songURL: audioFileCover,
				imageURL: songImageCover,
				artist: artistFilter,
				album: albumFilter,
				language: langFilter,
				category: filterTerm,
			};
			saveNewSong(data).then(() => {
				getSongs().then((res) => {
					dispatch({
						type: actionType.SET_ALL_SONGS,
						allSongs: res.data,
					});
				});
			});
			// setSongName("");
			setAudioLoading(false);
			setImageLoading(false);
			setSongImageCover(null);
			setAudioFileCover(null);

			dispatch({
				type: actionType.SET_ARTIST_FILTER,
				artistFilter: null,
			});
			dispatch({
				type: actionType.SET_ALBUM_FILTER,
				albumFilter: null,
			});
			dispatch({
				type: actionType.SET_LANG_FILTER,
				langFilter: null,
			});
			dispatch({
				type: actionType.SET_FILTER_TERM,
				filterTerm: null,
			});
		}
	};

	return (
		<div className='flex flex-col items-center justify-between w-full gap-4 p-4 border border-gray-300 rounded-md lg:w-880'>
			<input
				value={songName}
				onChange={(e) => setSongName(e.target.value)}
				type='text'
				placeholder='Type your song name'
				className='w-full my-3 px-3 py-1.5 font-semibold shadow-sm rounded-md bg-transparent border outline-none border-gray-300 focus:border-gray-500 '
			/>

			<div className='flex flex-wrap items-center justify-between w-full gap-4'>
				<FilterButtons filterData={allArtists} flag={"Artist"} />
				<FilterButtons filterData={allAlbums} flag={"Album"} />
				<FilterButtons filterData={langFilters} flag={"Language"} />
				<FilterButtons filterData={genreFilters} flag={"Category"} />
			</div>

			<div className='w-full border-2 border-gray-300 border-dotted rounded-md cursor-pointer bg-card backdrop-blur-md h-300'>
				{imageLoading && <FileLoader progress={imgUploadProgress} />}
				{!imageLoading && (
					<>
						{!songImageCover ? (
							<FileUploader
								updateState={setSongImageCover}
								setProgress={setImgUploadProgress}
								isLoading={setImageLoading}
								isImage={true}
							/>
						) : (
							<div className='relative w-full h-full overflow-hidden rounded-md'>
								<img
									src={songImageCover}
									alt=''
									className='object-cover w-full h-full'
								/>

								<i className='absolute p-3 text-xl text-white transition duration-200 ease-in-out bg-red-500 rounded-full cursor-pointer bottom-3 right-3 hover:shadow-md hover:bg-red-700 '>
									<BiTrash
										className=''
										onClick={() =>
											deleteFileObject(
												songImageCover,
												"image",
											)
										}
									/>
								</i>
							</div>
						)}
					</>
				)}
			</div>

			{/* Uploading audio file */}
			<div className='w-full border-2 border-gray-300 border-dotted rounded-md cursor-pointer bg-card backdrop-blur-md h-300'>
				{audioLoading && <FileLoader progress={audioUploadProgress} />}
				{!audioLoading && (
					<>
						{!audioFileCover ? (
							<FileUploader
								updateState={setAudioFileCover}
								setProgress={setAudioUploadProgress}
								isLoading={setAudioLoading}
								isImage={false}
							/>
						) : (
							<div className='relative justify-center w-full h-full overflow-hidden rounded-md flexitems-center'>
								<audio
									src={audioFileCover}
									controls
									className='object-cover w-full h-full'
								></audio>

								<i className='absolute p-3 text-xl text-white transition duration-200 ease-in-out bg-red-500 rounded-full cursor-pointer bottom-3 right-3 hover:shadow-md hover:bg-red-700 '>
									<BiTrash
										className=''
										onClick={() =>
											deleteFileObject(
												audioFileCover,
												false,
											)
										}
									/>
								</i>
							</div>
						)}
					</>
				)}
			</div>

			{/* save */}
			<div className='flex items-center justify-center w-60 '>
				{imageLoading || audioLoading ? (
					<DisableBtn />
				) : (
					<motion.button
						onClick={saveSong}
						whileTap={{ scale: 0.75 }}
						className='w-full px-8 py-2 text-white bg-red-600 rounded-md cursor-pointer hover:shadow-lg'
					>
						Save song
					</motion.button>
				)}
			</div>
		</div>
	);
};

export default NewSong;

export const FileLoader = ({ progress }) => {
	return (
		<div className='flex flex-col items-center justify-center w-full h-full '>
			<p className='text-xl font-semibold text-textColor'>
				{Math.round(progress) > 0 && <>{`${Math.round(progress)}%`} </>}
			</p>
			<div className='w-20 h-20 min-w-[40px] bg-red-600 animate-ping rounded-full flex items-center justify-center relative'>
				<div className='absolute inset-0 bg-red-600 rounded-full blur-xl'></div>
			</div>
		</div>
	);
};

export const FileUploader = ({
	updateState,
	setProgress,
	isLoading,
	isImage,
}) => {
	const uploadFile = (e) => {
		isLoading(true);
		const uploadedFile = e.target.files[0];
		const storageRef = ref(
			storage,
			`${isImage ? "images" : "audio"}/${Date.now()}-${
				uploadedFile.name
			}`,
		);
		const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				setProgress(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
				);
			},
			(error) => {
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
					updateState(downloadUrl);
					isLoading(false);
				});
			},
		);
	};
	return (
		<label className='flex flex-col items-center justify-center h-full'>
			<div className='flex flex-col items-center justify-center cursor-pointer'>
				<i className='text-2xl font-bold'>
					<BiCloudUpload />
				</i>
				<p className='text-lg'>
					Click to upload {isImage ? "an image" : "an audio"}{" "}
				</p>
			</div>
			<input
				type='file'
				name='upload-file'
				accept={`${isImage ? "image/*" : "audio/*"}`}
				onChange={uploadFile}
				className='w-0 h-0 cursor-pointer'
			/>
		</label>
	);
};

export const DisableBtn = () => {
	return (
		<button
			disabled
			type='button'
			className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center'
		>
			<svg
				role='status'
				className='inline w-4 h-4 mr-3 text-white animate-spin'
				viewBox='0 0 100 101'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
					fill='#E5E7EB'
				/>
				<path
					d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
					fill='currentColor'
				/>
			</svg>
			Loading...
		</button>
	);
};
