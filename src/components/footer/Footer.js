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

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <footer>
                <div className="copyright">
                    <p>&copy; 2020 Spokane Surf Report - All rights reserved.</p>
                </div>
                <div className="options-bar">
                    
                </div>
            </footer>
        );
    }
}

export default Footer