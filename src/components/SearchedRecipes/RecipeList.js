import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { addRecipe } from "../../state/actions";
import  { checkIfIncludes } from "../utilities";
import RecipeItem from "./RecipeItem";

const RecipeList = ({ selectedDate, labels }) => {
    const ref = useRef(null);
    const recipes = useSelector(state => state.searchedRecipes.recipes);
    const error = useSelector(state => state.searchedRecipes.error);
    const isLoading = useSelector(state => state.searchedRecipes.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        if(recipes.length) {
            window.scroll({top: 700});
        }
    }, [recipes]);

    const getOrFilterRecipes = () => {
        const { dietLabels, healthLabels } = labels;
        
        if (dietLabels.length || healthLabels.length) {
            return recipes.filter(({ recipe }) => {
                return checkIfIncludes(dietLabels, recipe.dietLabels) && checkIfIncludes(healthLabels, recipe.healthLabels);
            }).slice(0, 20);
        }
        return recipes.slice(0, 20);
    };

    return (
        <div className="recipe-list">
           {recipes.length 
           ?
           getOrFilterRecipes().map(({ recipe }, index) => (
                    <div className="recipe" key={index}>
                        <RecipeItem data={recipe}>
                            <button
                                className="btn btn-save"
                                onClick={() => {
                                    dispatch(addRecipe(recipe, selectedDate));
                                }}
                            >
                                Save recipe
                            </button>
                        </RecipeItem>
                    </div>
                )
            )
            :
            <div className="message">
                <h1 ref={ref}>{(isLoading && "Loading recipes...") || error || "Select a day and start to search for recipes."}</h1>
            </div>
            }
        </div>
    );
};

export default RecipeList;