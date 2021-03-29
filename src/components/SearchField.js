import React from 'react';

const SearchField = ({ query, setQuery, selectedDate, setSelectedDate }) => {
    return (
        <form method="GET" className="search-field">
            <div className="input-field">
                {query.length ? <span className="delete-search" onClick={() => setQuery("")}>X</span> : ""}
                <input 
                    className="input input-text" 
                    type="text"
                    id="input-text" name="input-text" value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <label className="text-label" htmlFor="input-text">Search for recipes</label>
            </div>
            <div className="input-field">
                <input className="input input-date"type="date" id="input-date" name="input-date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
                <label className="text-label" htmlFor="input-date">Select a date</label>
            </div>
        </form>
    );
};

export default SearchField;