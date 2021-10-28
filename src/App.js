import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Services from "./components/pages/Services";
import TechnicalSupport from "./components/pages/Technicalsupport";
import Login from "./components/pages/Login";
import CustomDictionary from "./components/pages/Customdictionary";
import DefaultDictionary from "./components/pages/Defaultdictionary";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/technicalsupport" component={TechnicalSupport} />
          <Route path="/customdictionary" component={CustomDictionary} />
          <Route path="/defaultdictionary" component={DefaultDictionary} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
