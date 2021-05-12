import * as api from "../api";
import axios from "axios";

import actionTypes from "../constants";
import { APP_ID, APP_KEY, BASE_URL } from "../config";


export const addData = (query) => async dispatch => {
    dispatch({type: actionTypes.ADD_DATA_LOADING});

    try {
        const params = {q: query, app_id: APP_ID, app_key: APP_KEY, to: 100};

        const { data: { hits } } = await axios.get(BASE_URL, {params});

        if(hits.length) {
            setTimeout(() => {
                dispatch({type: actionTypes.ADD_DATA, payload: hits});
            }, 1500);
        } else {
            setTimeout(() => {
                dispatch({type: actionTypes.ADD_DATA_ERROR, error: "Recipe not found..."});
            }, 1500);
        }
    } catch (error) {
        dispatch({type: actionTypes.ADD_DATA_ERROR, error: error.response});
    }
};

export const getRecipes = () => async dispatch => {
    try {
        dispatch({type: actionTypes.GET_RECIPES_START_LOADING, payload: true});
        const { data } = await api.getRecipes();

        dispatch({type: actionTypes.GET_RECIPES, payload: data});
    } catch (error) {
        dispatch({type: actionTypes.GET_RECIPES_ERROR, error: error.response.data});
    }
};

export const addRecipe = (recipe, date) => async dispatch => {
    try {
        const { data } = await api.saveRecipe(recipe, date);
        console.log(data)
        dispatch({type: actionTypes.SAVE_RECIPE, payload: data});
    } catch (error) {
        dispatch({type: actionTypes.GET_RECIPES_ERROR, error: error.response.data});
    }
};

export const deleteRecipe = id => async dispatch=> {
    try {
        await api.deleteRecipe(id);
        dispatch({type: actionTypes.DELETE_RECIPE, id});
    } catch (error) {
        dispatch({type: actionTypes.GET_RECIPES_ERROR, error: error.response.data});
    }
};

export const clearDay = date => async dispatch => {
    try {
        await api.clearDay(date);
        dispatch({type: actionTypes.CLEAR_DAY, date});
    } catch (error) {
        dispatch({type: actionTypes.GET_RECIPES_ERROR, error: error.response.data});
    }
};

export const clearData = () => {
    return {type: actionTypes.CLEAR_DATA};
};

export const clearRecipes = () => {
    return {type: actionTypes.CLEAR_RECIPES};
};

// Auth actions
export const login = (route, openModal, inputData) => async dispatch => {
    try {
        const { data } = await api.login(inputData);

        openModal(false);
        route.push("/");
        dispatch({type: actionTypes.LOGIN, payload: data});
    } catch (error) {
        dispatch({type: actionTypes.LOGIN_ERROR, error: error.response.data});
    }
};

export const signup = (route, openModal, inputData) => async dispatch => {
    try {
        const { data } = await api.signup(inputData);
        
        openModal(false);
        route.push("/");
        dispatch({type: actionTypes.REGISTER, payload: data});
    } catch (error) {
        dispatch({type: actionTypes.LOGIN_ERROR, error: error.response.data});
    }
};

export const logout = (route) => {
    route.push("/");
    return {type: actionTypes.LOGOUT};
};