import { ADD_DATA, GET_RECIPES, SAVE_RECIPE, DELETE_RECIPE, CLEAR_DATA, CLEAR_RECIPES, CLEAR_DAY, GET_RECIPES_START_LOADING, GET_RECIPES_ERROR } from "./actions";
import { combineReducers } from "redux";
import { toast } from "react-toastify";

import { getDayName } from "../components/utilities";

const searchedRecipesReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_DATA:
            return [...state, ...action.payload];
        case CLEAR_DATA:
            return [];
        default:
            return state;
    } 
};

const initialState = {
    recipes: [],
    loading: false,
    error: null
};

const savedRecipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES_START_LOADING:
            return {...state, loading: action.payload, error: null};
        case GET_RECIPES:
            return {...state, recipes: [...action.payload], loading: false};
        case GET_RECIPES_ERROR:
            toast.error(`${action.error}`);
            return {...state, loading: false, error: action.error};
        case SAVE_RECIPE:
            toast.success(`${action.payload.name} saved to your plan.`);
            return {...state, recipes: [...state.recipes, action.payload]};
        case DELETE_RECIPE:
            return {...state, recipes: state.recipes.filter(recipe => recipe._id !== action.id)};
        case CLEAR_DAY:
            toast.success(`${action.date} / ${getDayName(action.date)} cleared.`);
            return {...state, recipes: state.recipes.filter(recipe => recipe.date !== action.date)};
        case CLEAR_RECIPES:
            return {...state, recipes: []};
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    searchedRecipes: searchedRecipesReducer,
    savedRecipes: savedRecipesReducer
});

export default rootReducer;