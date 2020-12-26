/*
    File: Help.js
    Author: Chris Mowry
    Date: 05/16/2020
    Email: cmowry84@gmail.com
    Description:

        This component is intended to explain the various attributes of the web application.
*/

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import '../../style/help.scss'

 class Help extends Component {

    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }


    handleClose(event){
        this.props.close();
    }

    render() {
        return (
            <div className='container'>
                <Header mapVisible={ false} mapButtomVisible={ false }/>
                <div className='content'>
                    <div className="help-container">
                        <div className="symbol-def-container">
                            <h3>Symbols</h3>
                            <ul>
                                <li>
                                <img src={require("../../imgs/icon-ok-hand.svg").default} alt="Optimum Icon" />
                                <p>Surf spot is best at this level.</p>
                                </li>
                                <li>
                                    <img src={require("../../imgs/icon-thumbs-up.svg").default} alt="Surfable Icon" />
                                    <p>Surf spot is surfable at this level.</p>
                                </li>
                                <li>
                                    <img src={require("../../imgs/icon-thumbs-down.svg").default} alt="Not Surfable Icon" />
                                    <p>Surf spot is not surfable at this level.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="display-def-container">
                            <h3>Surf Spot Display</h3>
                            <img src={require("../../imgs/surf_app_snippet.jpg").default} alt="Display Definition" />
                        </div>
                        <div className="display-def-container">
                            <h3>Directions</h3>
                            <img src={require("../../imgs/map_snippet.jpg").default} alt="Display Definition" />
                        </div>
                        <div className="button-box">
                            <Link to='/'>Close</Link>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Help;