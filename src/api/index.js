import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000"
});

API.interceptors.request.use(request => {
    const token = JSON.parse(localStorage.getItem("token"));

    if(token) {
        request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
});

export const getRecipes = () => API.get("/recipes");
export const saveRecipe = (data, date) => API.post("recipes/save", {data, date});
export const clearDay = date => API.post("recipes/delete", {date});