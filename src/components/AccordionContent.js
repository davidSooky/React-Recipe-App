import React from 'react';
import { cssTransition, toast } from "react-toastify";
import { CSSTransition } from "react-transition-group";

import { deleteRecipe } from "../state/actions";
import { numberFormat } from "./utilities";

const AccordionContent = ({ recipes, visible, dispatch, date }) => {
    return (
        <CSSTransition in={visible} timeout={300} classNames="content-wrapper">
            <div className="content-wrapper">
            {recipes.map(({ image, label, ingredientLines, url, calories, totalWeight, totalNutrients }, index) => {
                return (
                    <div className="accordion-content" key={index}>
                        <div className="image">
                            <img src={image} alt=" " />
                        </div>
                        <div className="meal-info">
                            <h3 className="meal-name">{label}</h3>
                            <ul className="ingredient-list">
                                {ingredientLines.map((ingredient, index) => {
                                    return (
                                        <li className="ingredient" key={index}>
                                            {ingredient}
                                        </li>
                                    );
                                })}
                            </ul>
                            <a href={url} className="btn btn-show" rel="noreferrer" target="_blank">Show recipe</a>
                            <a 
                                className="btn btn-delete"
                                onClick={() => {
                                    toast.error(`${label} removed from your plan.`)
                                    dispatch(deleteRecipe(label, date));
                                }}
                            >
                                Delete recipe
                            </a>
                        </div>
                        <div className="energy">
                            <h3 className="meal-name">
                                {calories.toFixed(0)} kcal / {totalWeight.toFixed(0)} g
                            </h3>
                            <p>Fat: <span>{numberFormat(totalNutrients.FAT.quantity)}</span> g</p>
                            <p>Carbs: <span>{numberFormat(totalNutrients.CHOCDF.quantity)}</span> g</p>
                            <p>Sugar: <span>{numberFormat(totalNutrients.SUGAR.quantity)}</span> g</p>
                            <p>Protein: <span>{numberFormat(totalNutrients.PROCNT.quantity)}</span> g</p>
                        </div>
                    </div>
                );
            })}
            </div>
        </ CSSTransition>
    );
};

export default AccordionContent;