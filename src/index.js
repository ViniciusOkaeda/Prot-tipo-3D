import ReactDOM from 'react-dom';
import './index.css';
import Teste2 from '../src/pages/teste2';
import Dashboard from '../src/pages/teste';
import React from "react";
import Teste3 from '../src/pages/teste3'
import {
  BrowserRouter, Switch,
  Route, Redirect
} from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
   {/*  <Route  exact path="/teste2" component={Teste2} />*/}
    <Route  exact path="/teste3" component={Teste3} />
    <Route  exact path="/" component={Teste2} />

    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
