require("./config/db.js");
const bodyParser = require("body-parser");
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
