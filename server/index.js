import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import profileRoute from "./routes/authorization.js";
import recipesRoute from "./routes/recipes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/", profileRoute);
app.use("/recipes", recipesRoute);

app.get("/", (req, res) => {
    res.send("Welcome to recipes app API.");
});

mongoose.connect(process.env.DATABASE_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(app.listen(PORT, () => console.log("Connected to database...")))
    .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);