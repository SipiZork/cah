import React from 'react';
import './App.css';

import Header from './components/header/header.components'
import SignInSignUp from './components/sign-in-sign-up/sign-in-sign-up.components'
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  
  render() {
    return (
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={Header}></Route>
        </Switch>
        <Switch>
          <Route exact path="/" component={SignInSignUp}></Route>
        </Switch>
      </div>
    )
  }
}

export default App;
