const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Function to get day name
export const getDayName = (date) => {
    return days[new Date(date).getDay()];
};

// Function to get and format current date for input[type="date"] 
export const getCurrentDate = () => {
    const currentDate = new Date().toLocaleDateString("sk-SK", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    const splitDate = currentDate.replace(/\s+/g, '').split(".").reverse();

    return splitDate.join("-");
};

// Function to shuffle result sent by backend
export const shuffleRecipes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};

export const checkIfIncludes = (array1, array2) => {
    return array1.every(item => array2.includes(item));
};

export const dietLabels = ["High-Fiber", "High-Protein", "Low-Carb ", "Low-Fat"];
export const healthLabels = ["Gluten-Free", "Alcohol-Free", "Vegan", "Vegetarian", "Peanut-Free", "Egg-Free", "Wheat-Free", "Red-Meat-Free"];