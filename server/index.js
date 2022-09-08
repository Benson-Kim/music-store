const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { default: mongoose } = require("mongoose");

const app = express();

app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
	return res.send("Hi, well set to entertain you");
});

// routes
const userRoutes = require("./routes/authRoute");
const albumRoutes = require("./routes/albumRoute");
const artistRoutes = require("./routes/artistRoute");
const songsRoutes = require("./routes/songsRoute");

app.use("/", userRoutes);
app.use("/", albumRoutes);
app.use("/", artistRoutes);
app.use("/", songsRoutes);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
	.once("open", () => console.log("Database connected"))
	.on("error", (error) => console.log(`Error: ${error}`));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`App running on port number ${PORT} `));
