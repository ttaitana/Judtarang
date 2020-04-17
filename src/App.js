import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Schedle from "./components/schedle";
import Landing from "./components/landing";
import Navbar from "./components/navbar";
import Login from "./components/login";
import SignupForm from "./components/signup";
import Edit from "./components/schedle_edit";
import AllEvent from './components/allevent'
import CreateEvent from './components/createEvent'


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
        <Route path="/events" component={AllEvent}/>
        <Route path="/creteevent" component={CreateEvent}/>
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </div>
  );
}

export default App;
