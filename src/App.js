import React from "react";
import "./App.css";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact";
import Navigation from "./components/navigation";
import { connect } from 'react-redux';


function App() {
  return (
    <div className='App'>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/contact' component={Contact} />
        {/* <Redirect to='/' /> */}
      </Switch>
    </div>
  );
}

export default App;
