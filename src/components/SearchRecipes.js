import React, {useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";

import SearchField from "./SearchField";
import RecipeList from "./RecipeList";

import { APP_ID, APP_KEY, BASE_URL } from "../config";
import { addData, clearData } from "../state/actions";
import { getCurrentDate } from "./utilities";

const SearchRecipes = () => {
    const dispatch = useDispatch();

    const [query, setQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());

    useEffect(() => {
        const fetchRecipes = async (url) => {
            const { data } = await axios.get(url, {params: {
                    q: query,
                    app_id: APP_ID,
                    app_key: APP_KEY,
                    to: 20
                }}
            );
            dispatch(addData(data.hits));
        };

        if(query) {
            dispatch(clearData());
            const id = setTimeout(() => {
                fetchRecipes(BASE_URL);
            }, 1500);

            return () => {
                clearTimeout(id);
            }
        }
    }, [query]);

    return (
        <section className="main-section" id="searched-recipes">
            <SearchField 
                query={query}
                setQuery={setQuery}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            <RecipeList selectedDate={selectedDate} query={query} />
        </section>
    );
};

export default SearchRecipes;