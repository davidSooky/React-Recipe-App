import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import CalorieChart from "./CalorieChart";

import { deleteRecipe } from "../state/actions";

const AccordionContent = ({ recipes }) => {
    const [chartVisible, setChartVisible] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="content-container">
            <a className="btn btn-chart"
                onClick={() => setChartVisible(!chartVisible)}
            >
                {chartVisible ? "Hide chart" : "Show chart"}
            </a>
        <CSSTransition in={chartVisible} timeout={300} classNames="chart">
            {!chartVisible ?
            <div>
                {recipes.map(({ _id, image, name, ingredients, url, calories, weight, nutrients }) => {
                    return (
                        <div className="accordion-content" key={_id}>
                            <div className="image">
                                <img src={image} alt="" />
                            </div>
                            <div className="meal-info">
                                <h3 className="meal-name">{name}</h3>
                                <ul className="ingredient-list">
                                    {ingredients.map((ingredient, index) => {
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
                                        dispatch(deleteRecipe(_id));
                                    }}
                                >
                                    Delete recipe
                                </a>
                            </div>
                            <div className="energy">
                                <h3 className="meal-name">
                                    {parseInt(calories.$numberDecimal)} kcal / {parseInt(weight.$numberDecimal)} g
                                </h3>
                                <p>Fat: <span>{parseFloat(nutrients.fat.$numberDecimal).toFixed(2)}</span> g</p>
                                <p>Carbs: <span>{parseFloat(nutrients.carbs.$numberDecimal).toFixed(2)}</span> g</p>
                                <p>Sugar: <span>{parseFloat(nutrients.sugar.$numberDecimal).toFixed(2)}</span> g</p>
                                <p>Protein: <span>{parseFloat(nutrients.protein.$numberDecimal).toFixed(2)}</span> g</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            :
            <CalorieChart sourceData={recipes} />
            } 
        </CSSTransition>
        </div>
    );
};

export default AccordionContent;