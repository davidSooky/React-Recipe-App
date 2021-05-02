import express from "express";

import auth from "../middleware/authorization.js";
import { getRecipes, saveRecipe, clearDay, deleteRecipe } from "../controllers/recipes.js";

const router = express.Router();

router.get("/", auth, getRecipes);
router.post("/save", auth, saveRecipe);
router.post("/delete", auth, clearDay);
router.delete("/delete/:id", auth, deleteRecipe);

export default router;