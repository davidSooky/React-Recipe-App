import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { getRecipes } from "../state/actions";
import Accordion from "./Accordion";

const SavedRecipes = () => {
    const savedRecipes = useSelector(state => state.savedRecipes.recipes);
    const dispatch = useDispatch();

    const dates = [...new Set([...savedRecipes.map(recipe => recipe.date)].sort((a,b) => a - b))];

    useEffect(() => {
        document.title = "Saved recipes";

        dispatch(getRecipes());
    }, [savedRecipes]);

    return (
        savedRecipes.length
        ? 
        <div id="saved-recipes">
            {dates.map((date,index) => {
                return(
                    <div className="accordion-wrapper" key={index}>
                        <Accordion 
                            recipes={savedRecipes}
                            date={date}
                        />
                    </div>
                );
            })
            }
        </div>
        : 
        <div className="message">
            <h2>No recipes saved yet. Go on and search for recipes.</h2>
        </div>
    );
};

export default SavedRecipes;