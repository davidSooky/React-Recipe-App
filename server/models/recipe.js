import mongoose from "mongoose";


const recipeSchema = mongoose.Schema ({
    owner: String,
    date: String,
    name: String,
    image: String,
    url: String,
    ingredients: [String],
    weight: mongoose.Schema.Types.Decimal128,
    calories: mongoose.Schema.Types.Decimal128,
    nutrients: {
        fat: mongoose.Schema.Types.Decimal128,
        sugar: mongoose.Schema.Types.Decimal128,
        protein: mongoose.Schema.Types.Decimal128,
        carbs: mongoose.Schema.Types.Decimal128
    }
});

const recipeModel = mongoose.model("recipeModel", recipeSchema);

export default recipeModel;