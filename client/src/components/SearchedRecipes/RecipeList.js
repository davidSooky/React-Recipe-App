import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import usePaginate from "./usePaginate";
import { addRecipe } from "../../state/actions";
import  { checkIfIncludes } from "../utilities";
import RecipeItem from "./RecipeItem";

const RecipeList = ({ selectedDate, labels, query }) => {
    const recipes = useSelector(state => state.searchedRecipes.recipes);
    const error = useSelector(state => state.searchedRecipes.error);
    const isLoading = useSelector(state => state.searchedRecipes.loading);
    const dispatch = useDispatch();

    const [paginate, lastRecipeRef, lastPage, loadMore] = usePaginate(recipes, query);

    useEffect(() => {
        if(recipes.length) {
            window.scroll({top: 700});
        }
    }, [recipes]);

    const getOrFilterRecipes = recipes => {
        const { dietLabels, healthLabels } = labels;
        
        if (dietLabels.length || healthLabels.length) {
            return recipes.filter(({ recipe }) => {
                return checkIfIncludes(dietLabels, recipe.dietLabels) && checkIfIncludes(healthLabels, recipe.healthLabels);
            });
        }
        return recipes;
    };

    return (
        <div className="recipe-list">
           {recipes.length 
           ?
           getOrFilterRecipes(paginate()).map(({ recipe }, index) => {
               if(lastPage === index + 1) {
                   return (
                    <div className="recipe" key={index} ref={lastRecipeRef}>
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
               } return (
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
            }
            )
            :
            <div className="message">
                <h1>{(isLoading && "Loading recipes...") || error || "Select a day and start to search for recipes."}</h1>
            </div>
            }
            {loadMore && <h1>Loading more recipes...</h1>}
        </div>
    );
};

export default RecipeList;