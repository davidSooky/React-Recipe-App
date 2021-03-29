import React from 'react';
import { useSelector } from "react-redux";

import Accordion from "./Accordion";

const SavedRecipes = () => {
    const savedRecipes = useSelector(state => state.savedRecipes);
    const dates = Object.keys(savedRecipes).sort((a,b) => a - b);

    return (
        dates.length
        ? 
        <div id="saved-recipes">
            {dates.map((date,index) => {
                console.log();
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
            <h1>No recipes saved yet. Go on and search for recipes.</h1>
        </div>
    );
};

export default SavedRecipes;