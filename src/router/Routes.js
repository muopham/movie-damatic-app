import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import Home from "../pages/Home/Home";
import Category from "../pages/Category/Category";
import Detail from "../pages/Detail/Detail";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MyList from "../pages/MyList/MyList";
const Routes = () => {
  return (
    <Router>
      <Route path="/" exact element={<Home />} />
      <Route path="/account" element={<MyList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/:category" element={<Category />} />
      <Route path="/:category/:id" element={<Detail />} />
    </Router>
  );
};

export default Routes;
