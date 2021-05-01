import * as api from "../api";
import axios from "axios";

import { APP_ID, APP_KEY, BASE_URL } from "../config";

export const ADD_DATA = "ADD_DATA";
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_START_LOADING = "GET_RECIPES_START_LOADING";
export const GET_RECIPES_ERROR = "GET_RECIPES_ERROR";
export const SAVE_RECIPE = "ADD_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const CLEAR_DAY = "CLEAR_DAY";
export const CLEAR_DATA = "CLEAR_DATA";
export const CLEAR_RECIPES = "CLEAR_RECIPES";

export const addData = (query) => async dispatch => {
    try {
        const { data: { hits } } = await axios.get(BASE_URL, {params: {
            q: query,
            app_id: APP_ID,
            app_key: APP_KEY,
            to: 20
        }});

        dispatch({type: ADD_DATA, payload: hits});
    } catch (error) {
        console.log(error);
    }
};

export const getRecipes = () => async dispatch => {
    try {
        dispatch({type: GET_RECIPES_START_LOADING, payload: true});
        const { data } = await api.getRecipes();

        dispatch({type: GET_RECIPES, payload: data});
    } catch (error) {
        dispatch({type: GET_RECIPES_ERROR, error: error.response.data});
    }
};

export const addRecipe = (recipe, date) => async dispatch => {
    try {
        const { data } = await api.saveRecipe(recipe, date);
        console.log(data)
        dispatch({type: SAVE_RECIPE, payload: data});
    } catch (error) {
        dispatch({type: GET_RECIPES_ERROR, error: error.response.data});
    }
};

export const deleteRecipe = id => {
    return {type: DELETE_RECIPE, id};
};

export const clearDay = date => async dispatch => {
    try {
        await api.clearDay(date);
        dispatch({type: CLEAR_DAY, date});
    } catch (error) {
        dispatch({type: GET_RECIPES_ERROR, error: error.response.data});
    }
};

export const clearData = () => {
    return {type: CLEAR_DATA};
};

export const clearRecipes= () => {
    return {type: CLEAR_RECIPES};
};