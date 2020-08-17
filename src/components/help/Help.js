/*
    File: Help.js
    Author: Chris Mowry
    Date: 05/16/2020
    Email: cmowry84@gmail.com
    Description:

        This component is intended to explain the various attributes of the web application.
*/

import React, { Component } from 'react';
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
            <div className="help-container">
                Help!
            </div>
        );
    }
}

export default Help