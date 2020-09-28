import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';



import  Home  from "./hooks/Home";
import  Customers  from "./hooks/Customers";
import  Cars  from "./hooks/Cars";
import  Drivers  from "./hooks/Drivers";
import  Rides  from "./hooks/Rides";

function App() {


  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/customers" component={Customers}></Route>
        <Route exact path="/cars" component={Cars}></Route>
        <Route exact path="/drivers" component={Drivers}></Route>
        <Route exact path="/rides" component={Rides}></Route>
      </Switch>
    </Router>
  );

}

export default App;
