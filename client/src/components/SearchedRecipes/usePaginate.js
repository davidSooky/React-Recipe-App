import { useState, useEffect, useRef, useCallback } from "react";

const usePaginate = (recipes, query) => {
    const observer = useRef();
    const [lastPage, setLastPage] = useState(20);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setLastPage(20);
    }, [query]);

    const paginate = useCallback(() => {
        return recipes.slice(0, lastPage);
    }, [lastPage, recipes]);

    const lastRecipeRef = useCallback(node => {
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting && hasMore) {
                setTimeout(() => {
                    setLastPage(lastPage + 20);
                }, 1000);
                setHasMore(lastPage < recipes.length);
            }
        });

        if(node) observer.current.observe(node);
    }, [hasMore, recipes, lastPage, setLastPage]);

    return [paginate, lastRecipeRef, lastPage];
};

export default usePaginate;
