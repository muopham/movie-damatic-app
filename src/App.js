import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Routes from "./router/Routes";
function App() {
  return (
    <Router>
      <div className="">
        <Header />
        <Routes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
