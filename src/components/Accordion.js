import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import AccordionContent from "./AccordionContent";

import { clearDay } from "../state/actions";
import { getDayName } from "./utilities";

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
            <AccordionContent
                recipes={recipes[date]}
                visible={visible}
                dispatch={dispatch}
                date={date}
            />
        </div>
    );
};

export default Accordion;