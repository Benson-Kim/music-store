const express = require("express");
const router = express.Router();

const { users, login } = require("../controllers/userController");

router.get("/login", login);

module.exports = router;
