const artist = require("../models/artist");

const getArtists = async (req, res) => {
	try {
		const options = {
			sort: {
				createdAt: 1,
			},
		};
		const allArtists = await artist.find(options);
		return res.status(200).send({
			success: true,
			data: allArtists,
		});
	} catch (error) {
		return res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};

const getArtist = async (req, res) => {
	const filter = { _id: req.params.id };
	const foundartist = await artist.findOne(filter);
	if (foundartist) {
		return res.status(200).send({
			success: true,
			data: foundartist,
		});
	} else {
		return res.status(400).send({
			success: false,
			message: "Artist not found",
		});
	}
};

const addArtist = async (req, res) => {
	const { name, imageURL, twitter, instagram } = req.body;
	const newArtist = artist({
		name: name,
		imageURL: imageURL,
		twitter: twitter,
		instagram: instagram,
	});
	try {
		const savedArtist = await newArtist.save();
		return res.status(200).send({
			success: true,
			data: savedArtist,
		});
	} catch (error) {
		return res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};

const updateArtist = async (req, res) => {
	const filter = { _id: req.params.id };
	const { name, imageURL, twitter, instagram } = req.body;
	const options = { upsert: true, new: true };
	const updateArtist = {
		name: name,
		imageURL: imageURL,
		twitter: twitter,
		instagram: instagram,
	};
	try {
		const updatedArtist = await artist.findOneAndUpdate(
			filter,
			updateArtist,
			options,
		);
		return res.status(200).send({
			success: true,
			data: updatedArtist,
		});
	} catch (error) {
		return res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};

const delArtist = async (req, res) => {
	const filter = { _id: req.params.id };
	const delresults = await artist.deleteOne(filter);
	if (delresults) {
		return res.status(200).send({
			success: true,
			data: filter,
			message: "Artist deleted successfully",
		});
	} else {
		return res.status(400).send({
			success: false,
			message: "Artist not found",
		});
	}
};

module.exports = { getArtists, getArtist, addArtist, updateArtist, delArtist };
