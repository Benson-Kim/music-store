const express = require("express");
const router = express.Router();

const {
	getAlbum,
	getAlbums,
	addAlbum,
	updateAlbum,
	delAlbum,
} = require("../controllers/albumController");

router.get("/get-albums", getAlbums);
router.get("/get-album/:id", getAlbum);
router.post("/save-album", addAlbum);
router.put("/update-album/:id", updateAlbum);
router.delete("/del-album/:id", delAlbum);

module.exports = router;
