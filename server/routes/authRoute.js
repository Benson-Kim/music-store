const express = require("express");
const router = express.Router();

const {
	login,
	getUsers,
	updateUserRole,
	delUser,
} = require("../controllers/userController");

router.get("/login", login);
router.put("/update-user/:userId", updateUserRole);
router.get("/get-users", getUsers);
router.delete("/del-user/:userId", delUser);

module.exports = router;
