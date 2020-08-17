/*
    File: Footer.js
    Author: Chris Mowry
    Date: 08/05/2020
    Email: cmowry84@gmail.com
    Description:

        This component is intended to be the footer bar at the bottom of the
        web application. It provides additional information about the application.
*/

import React, { Component } from 'react';
import '../../style/footer.scss'

 class Footer extends Component {

    constructor(props) {
        super(props);

        this.showHelp = this.showHelp.bind(this);
        this.showContact = this.showContact.bind(this);
    }

    showHelp(event){
        this.props.showHelp();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    showContact(event){
        this.props.showContact();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    close(event){
        this.props.close();
    }

    render() {
        return (
            <footer>
                <div className="copyright">
                    <p>&copy; 2020 Spokane Surf Report - All rights reserved.</p>
                </div>
                <div className="options-bar">
                    <button className='option' onClick={ this.showHelp }>
                        <img src={require("../../imgs/icon-help.svg")} alt='help'/>
                        <h2>Help</h2>
                    </button>
                    <button className='option' onClick={ this.showContact }>
                        <img src={require("../../imgs/icon-contact.svg")} alt='contact'/>
                        <h2>Contact</h2>
                    </button>
                </div>
            </footer>
        );
    }
}

export default Footer