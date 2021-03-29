import { createStore } from "redux";
import reducer from "./reducers";

const ls = window.localStorage;

const initialState = ls.getItem("recipes") ? {savedRecipes: JSON.parse(ls.getItem("recipes"))} : {};

const store = createStore(reducer, initialState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => ls.setItem("recipes", JSON.stringify(store.getState().savedRecipes)));

export default store;