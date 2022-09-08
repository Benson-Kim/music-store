const mongoose = require("mongoose");

const ArtistSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		imageURL: {
			type: String,
			required: true,
		},
		twitter: {
			type: String,
			required: true,
		},
		instagram: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("artists", ArtistSchema);