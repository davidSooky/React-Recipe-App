export const ADD_DATA = "ADD_DATA";
export const SAVE_RECIPE = "ADD_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const CLEAR_DAY = "CLEAR_DAY";
export const CLEAR_DATA = "CLEAR_DATA";
export const CLEAR_RECIPES = "CLEAR_RECIPES";

export const addData = (data) => {
    return {
        type: ADD_DATA,
        payload: data
    };
}

export const addRecipe = (data, date) => {
    return {
        type: SAVE_RECIPE,
        payload: data,
        date
    };
}

export const deleteRecipe = (data, date) => {
    return {
        type: DELETE_RECIPE,
        payload: data,
        date
    };
}

export const clearDay = (date) => {
    return {type: CLEAR_DAY, date}
};

export const clearData = () => {
    return {type: CLEAR_DATA};
};

export const clearRecipes= () => {
    return {type: CLEAR_RECIPES};
};