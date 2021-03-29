
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Function to get day name
export const getDayName = (date) => {
    return days[new Date(date).getDay()];
};

// Function to get and format current date for input[type="date"] 
export const getCurrentDate = () => {
    const currentDate = new Date().toLocaleDateString("sk-SK",{
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    const splitDate = currentDate.replace(/\s+/g, '').split(".").reverse();

    return splitDate.join("-");
};

export const numberFormat = (number) => {
    return number.toFixed(2);
};