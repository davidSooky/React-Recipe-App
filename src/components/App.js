import './App.css';

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "../state/store";
import Header from "./Header";
import Footer from "./Footer";
import SearchRecipes from "./SearchRecipes";
import SavedRecipes from "./SavedRecipes";

const App = () => {
  return (
    <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={SearchRecipes} />
            <Route exact path="/saved" component={SavedRecipes} />
          </Switch>
          <Footer />
        </Router>
    </Provider>
  );
};

export default App;