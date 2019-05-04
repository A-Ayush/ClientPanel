import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/client/AddClient';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Details from './components/client/Details';
import Login from './components/auth/Login';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './Authenticate/auth'

class App extends Component {
  render() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <AppNavbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component = { UserIsAuthenticated( Dashboard )} />
          <Route exact path="/client/Add" component = { UserIsAuthenticated( AddClient ) } />
          <Route exact path="/client/:id" component = { UserIsAuthenticated( Details )} />
          <Route exact path="/login" component = { UserIsNotAuthenticated( Login ) } />
        </Switch>
      </div>
    </div>
    </Router>
    </Provider>
  );
}
}

export default App;
