const album = require("../models/album");

const getAlbums = async (req, res) => {
	try {
		const options = {
			sort: {
				createdAt: 1,
			},
		};
		const allAlbums = await album.find(options);
		return res.status(200).send({
			success: true,
			data: allAlbums,
		});
	} catch (error) {
		return res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};

const getAlbum = async (req, res) => {
	const filter = { _id: req.params.id };
	const foundalbum = await album.findOne(filter);
	if (foundalbum) {
		return res.status(200).send({
			success: true,
			data: foundalbum,
		});
	} else {
		return res.status(400).send({
			success: false,
			message: "Album not found",
		});
	}
};

const addAlbum = async (req, res) => {
	const { name, imageURL } = req.body;
	const newAlbum = album({
		name: name,
		imageURL: imageURL,
	});
	try {
		const savedAlbum = await newAlbum.save();
		return res.status(200).send({
			success: true,
			data: savedAlbum,
		});
	} catch (error) {
		return res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};

const updateAlbum = async (req, res) => {
	const filter = { _id: req.params.id };
	const { name, imageURL } = req.body;
	const options = { upsert: true, new: true };
	const album_updates = {
		name: name,
		imageURL: imageURL,
	};
	try {
		const updatedAlbum = await album.findOneAndUpdate(
			filter,
			album_updates,
			options,
		);
		return res.status(200).send({
			success: true,
			data: updatedAlbum,
		});
	} catch (error) {
		return res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};

const delAlbum = async (req, res) => {
	const filter = { _id: req.params.id };
	const delresults = await album.deleteOne(filter);
	if (delresults) {
		return res.status(200).send({
			success: true,
			data: filter,
			message: "Album deleted successfully",
		});
	} else {
		return res.status(400).send({
			success: false,
			message: "Album not found",
		});
	}
};

module.exports = { getAlbums, getAlbum, addAlbum, updateAlbum, delAlbum };
