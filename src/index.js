import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from 'react-router-dom'
import App from './App';
import './style/default.scss'
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
<BrowserRouter>
    <Route exact path = "/" component = {App}/>
    <Route exact path = "/spokane-surf-report" component = {App}/>
    <Route exact path = "/spokane-surf-report/spots" component = {App}/>
    <Route exact path = "/spokane-surf-report/spots/:spot" component = {App}/>
    <Route exact path = "/spokane-surf-report/gages/" component = {App}/>
    <Route exact path = "/spokane-surf-report/gages/:gage" component = {App}/>
</BrowserRouter>
,document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
