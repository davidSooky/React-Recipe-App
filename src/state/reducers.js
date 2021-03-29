import { ADD_DATA, SAVE_RECIPE, DELETE_RECIPE, CLEAR_DATA, CLEAR_RECIPES, CLEAR_DAY } from "./actions";
import { combineReducers } from "redux";

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

const savedRecipesReducer = (state = {}, action) => {
    const newState = {...state};
    switch (action.type) {
        case SAVE_RECIPE:
            if (!newState[action.date]) {     
                newState[action.date] = [action.payload];
            } else {
                newState[action.date].push(action.payload);
            }
            return newState;
        case DELETE_RECIPE:
            const filteredRecipes = newState[action.date].filter(element => element.label !== action.payload);
            filteredRecipes.length ? newState[action.date] = filteredRecipes : delete newState[action.date];
            return newState;
        case CLEAR_DAY:
            delete newState[action.date];
            return newState;
        case CLEAR_RECIPES:
            return [];
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    searchedRecipes: searchedRecipesReducer,
    savedRecipes: savedRecipesReducer
});

export default rootReducer;