const express = require("express");
const router = express.Router();

const {
	getArtists,
	addArtist,
	getArtist,
	delArtist,
	updateArtist,
} = require("../controllers/artistController");

router.get("/get-artists", getArtists);
router.get("/get-artist/:id", getArtist);
router.post("/save-artist", addArtist);
router.put("/update-artist/:id", updateArtist);
router.delete("/del-artist/:id", delArtist);

module.exports = router;
