import { async } from "@firebase/util";
import axios from "axios";

const baseURL = "http://localhost:4000";

// Users
export const validateUser = async (token) => {
	try {
		const res = await axios.get(`${baseURL}/login`, {
			headers: { Authorization: "Bearer " + token },
		});
		return res.data;
	} catch (error) {}
};

export const getUsers = async () => {
	try {
		const res = await axios.get(`${baseURL}/get-users`);
		return res.data;
	} catch (error) {
		return error.message;
	}
};

export const updateRole = async (userId, role) => {
	try {
		const res = await axios.put(`${baseURL}/update-user/${userId}`, {
			data: { role: role },
		});
		return res.data;
	} catch (error) {
		return error.message;
	}
};

export const deleteUser = async (userId) => {
	try {
		const res = await axios.delete(`${baseURL}/del-user/${userId}`);
		return res.data;
	} catch (error) {
		return error.message;
	}
};

// Songs
export const saveNewSong = async (data) => {
	try {
		const res = await axios.post(`${baseURL}/save-song`, { ...data });
		return res.data;
	} catch (error) {
		return error.message;
	}
};

export const getSongs = async () => {
	try {
		const res = await axios.get(`${baseURL}/get-songs`);
		return res.data;
	} catch (error) {
		return error.message;
	}
};

export const deleteSong = async (id) => {
	try {
		const res = await axios.delete(`${baseURL}/del-song/${id}`);
		return res.data;
	} catch (error) {
		return error.message;
	}
};
// Artists

export const saveNewArtist = async (data) => {
	try {
		const res = await axios.post(`${baseURL}/save-artist`, { ...data });
		return res.data;
	} catch (error) {
		return error.message;
	}
};

export const getArtists = async () => {
	try {
		const res = await axios.get(`${baseURL}/get-artists`);
		return res.data;
	} catch (error) {
		return error.message;
	}
};

export const deleteArtist = async (id) => {
	try {
		const res = await axios.delete(`${baseURL}/del-artist/${id}`);
		return res.data;
	} catch (error) {
		return error.message;
	}
};
// Albums

export const saveNewAlbum = async (data) => {
	try {
		const res = await axios.post(`${baseURL}/save-album`, { ...data });
		return res.data;
	} catch (error) {
		return error.message;
	}
};

export const getAlbums = async () => {
	try {
		const res = await axios.get(`${baseURL}/get-albums`);
		return res.data;
	} catch (error) {
		return error.message;
	}
};
