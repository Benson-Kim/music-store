const express = require("express");
const router = express.Router();

const {
	getSongs,
	getSong,
	addSong,
	updateSong,
	delSong,
} = require("../controllers/songsController");

router.get("/get-songs", getSongs);
router.get("/get-song/:id", getSong);
router.post("/save-song", addSong);
router.put("/update-song/:id", updateSong);
router.delete("/del-song/:id", delSong);

module.exports = router;
