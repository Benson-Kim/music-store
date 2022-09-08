import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Home, Login } from "./components";
import { app } from "./config/firebase.config";
import { validateUser } from "./api/index";
import { actionType, useStateValue } from "./context/index";

const App = () => {
	const firebaseauth = getAuth(app);
	const navigate = useNavigate();

	const [{ user }, dispatch] = useStateValue();

	const [auth, setAuth] = useState(
		false || window.localStorage.getItem("auth") === "true",
	);
	useEffect(() => {
		firebaseauth.onAuthStateChanged((userCred) => {
			if (userCred) {
				userCred.getIdToken().then((token) => {
					validateUser(token).then((data) => {
						dispatch({
							type: actionType.SET_USER,
							user: data,
						});
					});
				});
			} else {
				setAuth(false);
				window.localStorage.setItem("auth", "false");
				dispatch({
					type: actionType.SET_USER,
					user: null,
				});
				navigate("/login");
			}
		});
	}, []);

	return (
		<AnimatePresence exitBeforeEnter>
			<div className='flex items-center justify-center h-auto min-w-[680px] bg-primary'>
				<Routes>
					<Route path='/*' element={<Home />} />
					<Route
						path='/login'
						element={<Login setAuth={setAuth} />}
					/>
				</Routes>
			</div>
		</AnimatePresence>
	);
};

export default App;
