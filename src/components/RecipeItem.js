import React from 'react';

import useVisible from "./useVisible";

const RecipeItem = ({ data, children }) => {
    const [setRef, visible] = useVisible({root: null, rootMargin: "200px", threshold: 0.5});

    return (
        <div className={`card recipe-card ${visible ? "visible" : ""}`} ref={setRef}>
            <div className="card-image">
                <img src={data.image} className="recipe-img" alt="" />
                { children }
            </div>
            <div className="card-content">
                <div className="card-header">
                    <div className="meal-info">
                            {data.mealType && (<p className="meal-type">{data.mealType}</p>)}
                            <p className="meal-type">{data.totalWeight.toFixed(0)} g</p>
                            <p className="meal-type">{data.calories.toFixed(0)} kcal</p>
                        </div>
                        <h3 className="meal-name">{data.label}</h3>
                </div>
                <div className="card-details">
                    <ul className="ingredient-list">
                        {
                        data.ingredientLines.map((ingredient, index) => {
                            return(
                                <li className="ingredient" key={index}>
                                    {ingredient}
                                </li>
                            );
                        })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RecipeItem;