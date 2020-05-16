import React, { Component } from 'react';
//import '../../style/datacard.css'

 class DataCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='data-card'>
                { 'this is a data card #' + this.props.surfSpot.id }
            </div>
        );
    }
 }

export default DataCard;