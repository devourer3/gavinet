import React from 'react';
import logo from './logo.svg';
import {Route, Switch, Redirect, withRouter, BrowserRouter, useHistory} from 'react-router-dom';
import './static/styles/base.scss'
import Home from "./containers/home";
import Search from "./containers/search";
import TestPage from "./containers/testPage";
import icHome from './static/images/home.svg';
import {useTranslation} from "react-i18next";

// https://css-tricks.com/the-hooks-of-react-router/
function App() {
  const history = useHistory();
  const {t, i18n} = useTranslation();
  return (
    <>
      <span
        className={"home-btn"}
        onClick={(event) => {
          history.push('/');
        }}>{t('W0004')}</span>
      <Switch>
        <Route exact={true} path='/'>
          <Home/>
        </Route>
        <Route path='/search'>
          <Search/>
        </Route>
        <Route path='/test'>
          <TestPage/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
