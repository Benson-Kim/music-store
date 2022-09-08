import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCEgmk3Hyfh9lj_7DcDr9c_yzRgNlK_eOI",
	authDomain: "music-app-kimathi.firebaseapp.com",
	projectId: "music-app-kimathi",
	storageBucket: "music-app-kimathi.appspot.com",
	messagingSenderId: "959772457282",
	appId: "1:959772457282:web:fee432b860951e612930db",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
