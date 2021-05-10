import React from 'react';

import { healthLabels, dietLabels } from "./utilities";

const Filters = ({ setLabels }) => {

    const handleClick = e => {
        e.target.classList.toggle("active");
        const label = e.target.dataset.label;

        setLabels(prevState => {
            if(dietLabels.includes(label)) {
                if (prevState.dietLabels.includes(label)) return {...prevState, dietLabels: prevState.dietLabels.filter(item => item !== label)};
                return {...prevState, dietLabels: [...prevState.dietLabels, label]};
            }

            if (prevState.healthLabels.includes(label)) return {...prevState, healthLabels: prevState.healthLabels.filter(item => item !== label)};
            return {...prevState, healthLabels: [...prevState.healthLabels, label]};
        });
    };

    const renderFilters = labels => {
        return labels.map((label, index) => (
            <button 
                className="btn-filter"
                key={index}
                data-label={label}
                onClick={handleClick}
            >
                {label}
            </button>
        ));
    };

    return (
        <div className="food-filters">
            <div>
                <h3>Diet filters</h3>
                <div className="filters health-filters">
                    {renderFilters(dietLabels)}
                </div>
            </div>
            <div>
                <h3>Health filters</h3>
                <div className="filters diet-filters">
                    {renderFilters(healthLabels)}
                </div>
            </div>
        </div>
    );
};

export default Filters;