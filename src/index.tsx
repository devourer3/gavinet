import React from 'react';
import ReactDOM from 'react-dom';
import './static/styles/base.scss'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";
import rootReducer from "./modules/rootReducer";
import {BrowserRouter, HashRouter} from "react-router-dom";
import './static/lang/i18n';
import {applyMiddleware, createStore} from "redux";
import dotenv from 'dotenv';

dotenv.config();

const theme = createMuiTheme({
  palette: {
    type: 'light',
    // primary: {
    //   main: "#d93025",
    //   light: "#fce8e6",
    //   dark: "#cccccc",
    //   contrastText: "#3c4043"
    // },
    // secondary: {
    //   light: "#ff6659",
    //   main: "#d32f2f",
    //   dark: "#9a0007",
    //   contrastText: "#ffffff"
    // },
    // text: {
    //   primary: "#3c4043",
    //   secondary: "rgba(0, 0, 0, 0.54)",
    // }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    fontWeightRegular: 500,
  },
});
const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline/>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <App/>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
