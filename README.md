# Recipe Search App built with React
SPA to search for recipes and save them for a selected day. You can browse your saved recipes and even track your daily calories and nutrients or even visualize your daily calorie input with a doughnut chart.

## Project Screenshots
![alt text](https://github.com/davidSooky/React-Recipe-App/blob/master/src/images/header.JPG)
![alt text](https://github.com/davidSooky/React-Recipe-App/blob/master/src/images/search.JPG)
![alt text](https://github.com/davidSooky/React-Recipe-App/blob/master/src/images/saved_recipes.JPG)

## !!!UPDATE
Now you have the possibility to create your own account and save recipes, create your own plan.
Backend has been created with express, MongoDB is used as database.
# New functionalities
- login / register
- infinite scrolling
- data saved to online database instead of the localStorage
- JWT authentication

## Getting started
Version using localStorage without own profile: Check out the live demo [here](https://agitated-minsky-5e5c92.netlify.app/)

Version using API built with Express - create your own profile: Check out the live demo [here](https://recipe-search-project.netlify.app/)

If you do not want to create your own profile, login with -- email: testuser@gmail.com, password: test1234 -- to check out full functionality.

To get the frontend running locally:

- Clone this repo
- ```npm install``` to install all req'd dependencies
- ```npm start``` to start the local server (this project uses create-react-app)

## Functionality
This SPA (Single Page Application) uses Redux for state management, data is is saved to the browsers Local Storage, so refreshing the page will not delete your data.

Charts are built with Chart JS.
Search for recipes "Search" page, and save them for later (to the Local Storage).

Browse your saved recipes on "Personal plan" page. You can track the calories and nutrients.
Select show chart to see your daily nutrients for each day.


## License
[MIT](https://choosealicense.com/licenses/mit/)
