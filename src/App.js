import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Schedle from "./components/schedle";
import Landing from "./components/landing";
import Navbar from "./components/navbar";
import Login from "./components/login";
import SignupForm from "./components/signup";
import Edit from "./components/schedle_edit";
import { useEffect } from "react";
import auth from './firebase'

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/schedual" component={Schedle} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/edit" component={Edit} />
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </div>
  );
}

export default App;
