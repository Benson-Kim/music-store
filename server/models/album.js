const mongoose = require("mongoose");

const AlbumSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		imageURL: {
			type: String,
			required: true,
		},
	},
	{ timesatmps: true },
);

module.exports = mongoose.model("album", AlbumSchema);
