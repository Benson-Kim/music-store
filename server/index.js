const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { default: mongoose } = require("mongoose");

const app = express();

app.use(cors({ origin: true }));

app.get("/", (req, res) => {
	return res.send("Hi, well set to entertain you");
});

// routes
const userRoutes = require("./routes/authRoute");
app.use("/users", userRoutes);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
	.once("open", () => console.log("Database connected"))
	.on("error", (error) => console.log(`Error: ${error}`));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`App running on port number ${PORT} `));
