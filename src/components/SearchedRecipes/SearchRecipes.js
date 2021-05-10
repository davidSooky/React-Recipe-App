import React, {useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import SearchField from "./Search/SearchField";
import RecipeList from "./RecipeList";
import Filters from "./Search/Filters";

import { addData, clearData } from "../../state/actions";
import { getCurrentDate } from "../utilities";

const SearchRecipes = () => {
    const dispatch = useDispatch();

    const [query, setQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const [labels, setLabels] = useState({dietLabels: [], healthLabels: []});

    useEffect(() => {
        document.title = "Search for recipes";

        if(query) {
            dispatch(clearData());
            const id = setTimeout(() => {
                dispatch(addData(query));
            }, 1000);

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
            <Filters setLabels={setLabels} />
            <RecipeList selectedDate={selectedDate} labels={labels} />
        </section>
    );
};

export default SearchRecipes;