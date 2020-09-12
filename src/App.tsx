import React from 'react';
import logo from './logo.svg';
import {Route, Switch, Redirect, withRouter, BrowserRouter} from 'react-router-dom';
import './static/styles/base.scss'
import Home from "./containers/home";
import Search from "./containers/search";
import TestPage from "./containers/testPage";

// https://css-tricks.com/the-hooks-of-react-router/
function App() {
  return (
    <Switch>
      <Route exact={true} path='/'>
        <Home/>
      </Route>
      <Route path='/search'>
        <Search/>
      </Route>
      <Route path='/test'>
        {TestPage}
      </Route>
      <Route component={Search}/>
    </Switch>
  );
}

export default App;
