import * as api from "../api";
import axios from "axios";

import { APP_ID, APP_KEY, BASE_URL } from "../config";
import { shuffleRecipes } from "../components/utilities";

export const ADD_DATA = "ADD_DATA";
export const ADD_DATA_LOADING = "ADD_DATA_LOADING";
export const ADD_DATA_ERROR = "ADD_DATA_ERROR";
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_START_LOADING = "GET_RECIPES_START_LOADING";
export const GET_RECIPES_ERROR = "GET_RECIPES_ERROR";
export const SAVE_RECIPE = "ADD_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const CLEAR_DAY = "CLEAR_DAY";
export const CLEAR_DATA = "CLEAR_DATA";
export const CLEAR_RECIPES = "CLEAR_RECIPES";
export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";

export const addData = (query) => async dispatch => {
    dispatch({type: ADD_DATA_LOADING});
    try {
        const { data: { hits } } = await axios.get(BASE_URL, {params: {
            q: query,
            app_id: APP_ID,
            app_key: APP_KEY,
            to: 100
        }});

        const recipes = shuffleRecipes(hits).slice(0,20);

        if(hits.length) {
            setTimeout(() => {
                dispatch({type: ADD_DATA, payload: recipes});
            }, 1500);
        } else {
            setTimeout(() => {
                dispatch({type: ADD_DATA_ERROR, error: "Recipe not found..."});
            }, 1500);
        }
    } catch (error) {
        dispatch({type: ADD_DATA_ERROR, error: error.response});
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

export const deleteRecipe = id => async dispatch=> {
    try {
        await api.deleteRecipe(id);
        dispatch({type: DELETE_RECIPE, id});
    } catch (error) {
        dispatch({type: GET_RECIPES_ERROR, error: error.response.data});
    }
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

export const clearRecipes = () => {
    return {type: CLEAR_RECIPES};
};

// Auth actions
export const login = (route, inputData) => async dispatch => {
    try {
        const { data } = await api.login(inputData);
        route.push("/");
        dispatch({type: LOGIN, payload: data});
    } catch (error) {
        dispatch({type: LOGIN_ERROR, error: error.response.data});
    }
};

export const signup = (route, inputData) => async dispatch => {
    try {
        const { data } = await api.signup(inputData);
        route.push("/");
        dispatch({type: REGISTER, payload: data});
    } catch (error) {
        dispatch({type: LOGIN_ERROR, error: error.response.data});
    }
};

export const logout = (route) => {
    route.push("/");
    return {type: LOGOUT};
};