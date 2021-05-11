import mongoose from "mongoose";
import Recipe from "../models/recipe.js";


export const getRecipes = async (req, res) => {
    const id = req.userId;

    try {
        const recipes = await Recipe.find({owner: id});

        res.status(200).json(recipes);
    } catch (error) {
        res.status(404).send("Something went wrong. Try again later.");
    }
};

export const saveRecipe = async (req, res) => {
    const id = req.userId;

    try {
        const {
            date,
            data: {label: name,
            image,
            url, 
            calories,
            totalWeight: weight,
            ingredientLines: ingredients,
            totalNutrients: {
                FAT: { quantity: fat },
                CHOCDF: { quantity: carbs },
                SUGAR: { quantity: sugar },
                PROCNT: { quantity: protein }
            }}
        } = req.body;
        
        const allRecipesForDate = await Recipe.find({date});
        const existingRecipe = allRecipesForDate.filter(recipe => recipe.name === name);
        if(existingRecipe.length) return res.status(409).send(`Recipe already saved for ${date}`);

        const newRecipe = new Recipe({owner: id, name, date, image, url, calories, weight, ingredients, nutrients: {fat, carbs, sugar, protein}});

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        console.log(error)
        res.status(409).send("Something went wrong. Try again later.");
    }
};

export const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id.");

        await Recipe.findByIdAndRemove({_id: id});

        res.json({message: "Post deleted successfully."});
    } catch (error) {
        res.status(409).send("Something went wrong. Try again later.");
    }
};

export const clearDay = async (req, res) => {
    const id = req.userId;
    const { date } = req.body;

    try {
        await Recipe.deleteMany({owner: id, date});
        res.status(201).send("Day cleared.");
    } catch (error) {
        res.status(404).send("Something went wrong. Try again later.");
    }
};