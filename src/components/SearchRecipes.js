import React, {useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import SearchField from "./SearchField";
import RecipeList from "./RecipeList";

import { addData, clearData } from "../state/actions";
import { getCurrentDate } from "./utilities";

const SearchRecipes = () => {
    const dispatch = useDispatch();

    const [query, setQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());

    useEffect(() => {
        document.title = "Search for recipes";

        if(query) {
            dispatch(clearData());
            const id = setTimeout(() => {
                dispatch(addData(query));
            }, 1500);

            return () => {
                clearTimeout(id);
            }
        }
    }, [query, dispatch]);

    return (
        <section className="main-section" id="searched-recipes">
            <SearchField 
                query={query}
                setQuery={setQuery}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            <RecipeList selectedDate={selectedDate} />
        </section>
    );
};

export default SearchRecipes;