/*
    File: DataCardDesc.js
    Author: Chris Mowry
    Date: 05/16/2020
    Email: cmowry84@gmail.com
    Description:

        This component provides in-depth information about the surf spot. It give a 
        detailed description, links to additional resourses and other detailed information.
*/

import React, { Component } from 'react';
import '../../style/datacard-desc.scss'

 class DataCardDetail extends Component {

    constructor(props) {
        super(props);

        this.usgs_site = `https://waterdata.usgs.gov/nwis/uv?${this.props.spot.site}`;
    }

    render() {
        return (
            <div className='data-card-desc'>
                <div className='overview-box'>
                    <div className='gage-box'>
                        <h4>Gage:</h4>
                        <a href={ this.usgs_site } target="_blank" rel='noopener noreferrer'>
                        <h4 className='value'>{this.props.spot.site }</h4>
                        </a>
                    </div>
                    {
                        this.props.spotDetail.difficulty !== undefined
                        ? <div className='diff-box'>
                            <h4>Difficulty:</h4>
                            <h4 className='value'>{ ` ${this.props.spotDetail.difficulty }` }</h4>
                          </div>
                        : ""
                    }
                </div>
                {
                    // Gage Site 
                    this.props.spot.siteName !== undefined
                    ? <div>
                        <h4>Gage Name:</h4>
                        <a href={ this.usgs_site } target="_blank" rel='noopener noreferrer'>
                            { this.props.spot.siteName }
                        </a>
                     </div>
                    : ""
                }
                {
                    // Description 
                    this.props.spotDetail.desc !== undefined
                    ? <div className='describe-box'>
                            <h4>Description:</h4>
                                <p>{ this.props.spotDetail.desc }</p>
                            </div>
                    : ""
                }
                {
                    // Flow info 
                    this.props.spotDetail.flowInfo !== undefined 
                    ? <div className='info-box'>
                        <h4>Flow Info:</h4>
                        <ul>
                            {
                                this.props.spotDetail.flowInfo.map(
                                (flow) => <li key={ flow }>{ flow }</li>
                                )
                            }
                        </ul>
                      </div>
                    : ""
                }
                {
                    // Links
                    this.props.spotDetail.links !== undefined 
                    ? <div className='info-box'>
                        <h4>Links:</h4>
                        <ul>
                            {
                                this.props.spotDetail.links.map(
                                (link) => 
                                    <li key={ link.label }>
                                        <a href={link.url} target='_blank' rel='noopener noreferrer'>
                                            { link.label }
                                        </a>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    :""
                }
                {
                    // Features
                    this.props.spotDetail.features !== undefined 
                    ? <div className='info-box'>
                        <h4>Features:</h4>
                        <p> { this.props.spotDetail.features.join(', ') }</p>
                    </div>
                    : ""
                }
                {
                    // Tricks
                    this.props.spotDetail.tricks !== undefined 
                    ? <div className='info-box'>
                        <h4>Tricks:</h4>
                        <p> { this.props.spotDetail.tricks.join(', ') }</p>
                    </div>
                    : ""
                }
            </div>
        );
    }
 }

export default DataCardDetail;