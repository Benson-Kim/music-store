import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import { validateUser } from "../api";
import { app } from "../config/firebase.config";
import { actionType, useStateValue } from "../context/index";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { LoginBg } from "../assets/video";

const Login = ({ setAuth }) => {
	const firebaseAuth = getAuth(app);
	const provider = new GoogleAuthProvider();

	const navigate = useNavigate();
	const [{ user }, dispatch] = useStateValue();

	const loginWithGoogle = async () => {
		await signInWithPopup(firebaseAuth, provider).then((userCred) => {
			if (userCred) {
				setAuth(true);
				window.localStorage.setItem("auth", "true");

				firebaseAuth.onAuthStateChanged((userCred) => {
					if (userCred) {
						userCred.getIdToken().then((token) => {
							validateUser(token).then((data) => {
								dispatch({
									type: actionType.SET_USER,
									user: data,
								});
							});
						});
						navigate("/", { replace: true });
					} else {
						setAuth(false);
						dispatch({
							type: actionType.SET_USER,
							user: null,
						});
						navigate("/login");
					}
				});
			}
		});
	};

	useEffect(() => {
		if (window.localStorage.getItem("auth") === "true") {
			navigate("/", { replace: true });
		}
	}, []);

	return (
		<div className='relative w-screen h-screen'>
			<video
				src={LoginBg}
				type='video/mp4'
				autoPlay
				muted
				loop
				className='object-cover w-full h-full'
			/>
			<div className='absolute inset-0 flex items-center justify-center p-4 bg-darkOverlay'>
				<div className='flex flex-col items-center justify-center w-full p-4 rounded-md shadow-2xl md:w-375 bg-lightOverlay backdrop-blur-md'>
					<button
						onClick={loginWithGoogle}
						className='flex items-center justify-center gap-2 px-4 py-2 transition duration-200 ease-in-out rounded-md cursor-pointer bg-cardOverlay hover:bg-card hover:shadow-md'
					>
						<FcGoogle className='text-xl' />
						Sign in with Google
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
