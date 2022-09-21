import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import { initialState, reducer, StateProvider } from "./context/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Router>
			<StateProvider initialState={initialState} reducer={reducer}>
				<App />
			</StateProvider>
		</Router>
	</React.StrictMode>,
);
