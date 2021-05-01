import express from "express";

import auth from "../middleware/authorization.js";
import { getRecipes, saveRecipe, clearDay } from "../controllers/recipes.js";

const router = express.Router();

router.get("/", auth, getRecipes);
router.post("/save", auth, saveRecipe);
router.post("/delete", auth, clearDay);

export default router;