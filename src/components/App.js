import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./Header";
import Footer from "./Footer";
import SearchRecipes from "./SearchRecipes";
import SavedRecipes from "./SavedRecipes";

const App = () => {
  return (
        <Router>
          <Header />
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
          />
          <Switch>
            <Route exact path="/" component={SearchRecipes} />
            <Route exact path="/saved" component={SavedRecipes} />
          </Switch>
          <Footer />
        </Router>
  );
};

export default App;