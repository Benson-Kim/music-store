const song = require("../models/song");

const getSongs = async (req, res) => {
	try {
		const options = {
			sort: {
				createdAt: 1,
			},
		};
		const allSongs = await song.find(options);
		return res.status(200).send({
			success: true,
			data: allSongs,
		});
	} catch (error) {
		return res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};

const getSong = async (req, res) => {
	const filter = { _id: req.params.id };
	const foundalbum = await song.findOne(filter);
	if (foundalbum) {
		return res.status(200).send({
			success: true,
			data: foundalbum,
		});
	} else {
		return res.status(400).send({
			success: false,
			message: "Song not found",
		});
	}
};

const addSong = async (req, res) => {
	const { name, songURL, artist, album, language, category } = req.body;
	const newSong = song({
		name: name,
		songURL: songURL,
		artist: artist,
		album: album,
		language: language,
		category: category,
	});
	try {
		const savedSong = await newSong.save();
		return res.status(200).send({
			success: true,
			data: savedSong,
		});
	} catch (error) {
		return res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};

const updateSong = async (req, res) => {
	const filter = { _id: req.params.id };
	const { name, songURL, artist, album, language, category } = req.body;
	const options = { upsert: true, new: true };
	const album_updates = {
		name: name,
		songURL: songURL,
		artist: artist,
		album: album,
		language: language,
		category: category,
	};
	try {
		const updatedSong = await song.findOneAndUpdate(
			filter,
			album_updates,
			options,
		);
		return res.status(200).send({
			success: true,
			data: updatedSong,
		});
	} catch (error) {
		return res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};

const delSong = async (req, res) => {
	const filter = { _id: req.params.id };
	const delresults = await song.deleteOne(filter);
	if (delresults) {
		return res.status(200).send({
			success: true,
			data: filter,
			message: "Song deleted successfully",
		});
	} else {
		return res.status(400).send({
			success: false,
			message: "Song not found",
		});
	}
};

module.exports = { getSongs, getSong, addSong, updateSong, delSong };
