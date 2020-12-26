import React from 'react';
import ReactDOM from 'react-dom';
import {Route, HashRouter} from 'react-router-dom'
import App from './App';
import Contact from './components/contact/Contact';
import Help from './components/help/Help';
import './style/default.scss'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
// Change to BrowserRouter for deployment
<HashRouter basename={process.env.PUBLIC_URL+'/'}>
    <Route exact path = "/" component = {App}/>
    <Route exact path = "/spots" component = {App}/>
    <Route exact path = "/spots/:spot" component = {App}/>
    <Route exact path = "/gages/" component = {App}/>
    <Route exact path = "/gages/:gage" component = {App}/>
    <Route exact path = "/help" component = {Help} />
    <Route exact path = "/contact" component = {Contact} />
</HashRouter>
,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

