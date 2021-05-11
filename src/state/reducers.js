import { combineReducers } from "redux";
import { toast } from "react-toastify";
import decode from "jwt-decode";

import actionTypes from "../constants";
import { getDayName } from "../components/utilities";

const searchedRecipesReducer = (state = {recipes: [], error: null, loading: false}, action) => {
    switch (action.type) {
        case actionTypes.ADD_DATA:
            return {...state, recipes: [...action.payload], loading: false, error: null};
        case actionTypes.ADD_DATA_LOADING:
            return {...state, loading: true, error: null};
        case actionTypes.ADD_DATA_ERROR:
            return {...state, error: action.error, loading: false};
        case actionTypes.CLEAR_DATA:
            return {...state, recipes: [], error: null};
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
        case actionTypes.GET_RECIPES_START_LOADING:
            return {...state, loading: action.payload, error: null};
        case actionTypes.GET_RECIPES:
            return {...state, recipes: [...action.payload], loading: false};
        case actionTypes.GET_RECIPES_ERROR:
            toast.error(`${action.error}`);
            return {...state, loading: false, error: action.error};
        case actionTypes.SAVE_RECIPE:
            toast.success(`${action.payload.name} saved to your plan.`);
            return {...state, recipes: [...state.recipes, action.payload]};
        case actionTypes.DELETE_RECIPE:
            toast.success("Recipe deleted.");
            return {...state, recipes: state.recipes.filter(recipe => recipe._id !== action.id)};
        case actionTypes.CLEAR_DAY:
            toast.success(`${action.date} / ${getDayName(action.date)} cleared.`);
            return {...state, recipes: state.recipes.filter(recipe => recipe.date !== action.date)};
        case actionTypes.CLEAR_RECIPES:
            return {...state, recipes: []};
        default:
            return state;
    }
};

const authInitialState = {
    user: localStorage.getItem("token") ? decode(JSON.parse(localStorage.getItem("token"))).username : null,
    error: null
}

const authReducer = (state = authInitialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN:
        case actionTypes.REGISTER:
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            toast.success(action.payload.message);
            return {...state, user: decode(action.payload.token).username, error: null};
        case actionTypes.LOGIN_ERROR:
            toast.error(`${action.error}`);
            return {...state, error: action.error};
        case actionTypes.LOGOUT:
            localStorage.removeItem("token");
            toast.success("Logged out successfully");
            return {user: null, error: null};
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    searchedRecipes: searchedRecipesReducer,
    savedRecipes: savedRecipesReducer,
    user: authReducer
});

export default rootReducer;