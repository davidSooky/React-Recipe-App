import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import AccordionContent from "./AccordionContent";

import { clearDay } from "../state/actions";
import { getDayName } from "./utilities";

const Accordion = ({ recipes, date }) => {
    const [visible, setVisible] = useState(true);
    const dispatch = useDispatch();
    const recipesForCurrentDate = recipes.filter(recipe => recipe.date === date);

    return (
        <div className="accordion">
            <div className="accordion-header">
                <button className="btn btn-clear-day" onClick={() => dispatch(clearDay(date))}>Clear day</button>
                <h3>{date} / {getDayName(date)}</h3>
                <p>Total calories: <span>{recipesForCurrentDate.reduce((accumulator, {calories: {$numberDecimal: calorie}}) => parseFloat(accumulator + calorie), 0).toFixed(2)}</span> kcal</p>
                <i className={`fas fa-chevron-up ${visible ? "active" : ""}`} onClick={() => setVisible(!visible)} />
            </div>
            <CSSTransition in={visible} timeout={300} classNames="content-wrapper">
                <AccordionContent
                    recipes={recipesForCurrentDate}
                />
            </CSSTransition>
        </div>
    );
};

export default Accordion;