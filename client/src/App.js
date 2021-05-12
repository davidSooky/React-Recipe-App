import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";
import Auth from "./components/Auth/Auth";
import Footer from "./components/Footer/Footer";
import SearchRecipes from "./components/SearchedRecipes/SearchRecipes";
import SavedRecipes from "./components/SavedRecipes/SavedRecipes";  


const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = (e) => {
    if(e.target.classList.contains("modal")) {
      setModalOpen(false);
    }
  };

  return (
    <Router>
      <Header openModal={setModalOpen}/>
      <Modal handleClose={handleClose} modalOpen={modalOpen}>
        <Auth openModal={setModalOpen}/>
      </Modal>
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