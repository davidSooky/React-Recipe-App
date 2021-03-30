import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { deleteRecipe, clearDay } from "../state/actions";
import { getDayName, numberFormat } from "./utilities";

const Accordion = ({ recipes, date }) => {
    const [visible, setVisible] = useState(true);
    const dispatch = useDispatch();
    
    const handleDayDeletion = () => {
        toast.error(`${date} / ${getDayName(date)} cleared.`);
        dispatch(clearDay(date));
    }

    return (
        <div className="accordion">
            <div className="accordion-header">
                <button className="btn btn-clear-day" onClick={handleDayDeletion}>Clear day</button>
                <h3>{date} / {getDayName(date)}</h3>
                <p>Total calories: <span>{recipes[date].reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.calories), 0)}</span> kcal</p>
                <i className={`fas fa-chevron-up ${visible ? "active" : ""}`} onClick={() => setVisible(!visible)} />
            </div>   
            <div className={`content-wrapper ${visible ? "active" : ""}`}>
                {recipes[date].map(({ image, label, ingredientLines, url, calories, totalWeight, totalNutrients }, index) => {
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
                                    })
                                }
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
        </div>
    );
};

export default Accordion;