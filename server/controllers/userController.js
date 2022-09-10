const admin = require("../config/firebase.config");
const user = require("../models/user");

const login = async (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).send({ message: "no token provided" });
	}
	const token = req.headers.authorization.split(" ")[1];
	try {
		const decoded = await admin.auth().verifyIdToken(token);
		if (!decoded) {
			return res.status(505).json({
				status: 505,
				success: false,
				message: "Unathorized token",
			});
		} else {
			// return res.status(200).json(decoded);
			const userExists = await user.findOne({ user_id: decoded.user_id });
			if (!userExists) {
				newUserData(decoded, req, res);
			} else {
				updateUserData(decoded, req, res);
			}
		}
	} catch (error) {
		return res.status(505).json({
			status: 505,
			success: false,
			message: error.message,
		});
	}
};

// Save user data
const newUserData = async (decoded, req, res) => {
	const newUser = new user({
		name: decoded.name,
		email: decoded.email,
		imageURL: decoded.picture,
		user_id: decoded.user_id,
		email_verified: decoded.email_verified,
		role: "member",
		auth_time: decoded.auth_time,
	});

	try {
		const savedUser = await newUser.save();
		res.status(200).send({ user: savedUser });
	} catch (error) {
		res.status(400).json({
			status: 400,
			success: false,
			message: error.message,
		});
	}
};
// update user dat
const updateUserData = async (decoded, req, res) => {
	const filter = { user_id: decoded.user_id };
	const options = {
		upsert: true,
		new: true,
	};
	try {
		const result = await user.findOneAndUpdate(
			filter,
			{ auth_time: decoded.auth_time },
			options,
		);
		res.status(200).send({ user: result });
	} catch (error) {
		res.status(400).json({
			status: 400,
			success: false,
			message: error.message,
		});
	}
};

const getUsers = async (req, res) => {
	try {
		const options = {
			sort: {
				createdAt: 1,
			},
		};
		const allUsers = await user.find(options);
		return res.status(200).send({
			success: true,
			data: allUsers,
		});
	} catch (error) {
		return res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};

const updateUserRole = async (req, res) => {
	const filter = { _id: req.params.userId };
	const role = req.body.data.role;
	const options = {
		upsert: true,
		new: true,
	};
	try {
		const result = await user.findOneAndUpdate(
			filter,
			{ role: role },
			options,
		);
		res.status(200).send({ user: result });
	} catch (error) {
		res.status(400).json({
			status: 400,
			success: false,
			message: error.message,
		});
	}
};

const delUser = async (req, res) => {
	const filter = { _id: req.params.userId };

	const result = await user.deleteOne(filter);
	if (result.deletedCount === 1) {
		res.status(200).send({ success: true, msg: "User data Deleted" });
	} else {
		res.status(404).send({ success: false, msg: "User not Found" });
	}
};

module.exports = { login, delUser, getUsers, updateUserRole };
