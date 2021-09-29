
import './App.css';


import React, { Component } from 'react'
import Navbar from './components/Navbar.js'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize = 15;

  state={
    progress:0
  }
  setProgress=(progress)=>
  {
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height={4}
            color='#f11946'
            progress={this.state.progress}
      
          />
          <Switch>
            <Route exact path="/"><News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" /></Route>
            <Route exact path="/Business"><News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business" /></Route>
            <Route exact path="/General"><News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" /></Route>
            <Route exact path="/Entertainment"><News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" /></Route>
            <Route exact path="/Health"><News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" /></Route>
            <Route exact path="/Science"><News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" /></Route>
            <Route exact path="/Sports"><News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" /></Route>
            <Route exact path="/Technology"><News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" /></Route>


          </Switch>
        </Router>
      </div>


    )
  }
}

