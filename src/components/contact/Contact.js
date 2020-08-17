/*
    File: Contact.js
    Author: Chris Mowry
    Date: 05/16/2020
    Email: cmowry84@gmail.com
    Description:

        This component is intended to be the contact form for the web application.
        This component requires a EmailJS account found at https://www.emailjs.com/
*/

import React, { Component } from 'react';
import emailjs from 'emailjs-com';

import '../../style/contact.scss'

 class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            sentError: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    handleSubmit(event){
        event.preventDefault();

        // sends email 
        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICEID,
                         process.env.REACT_APP_EMAILJS_TEMPLATEID,
                         event.target,
                         process.env.REACT_APP_EMAILJS_USERID)
        .then((result) => {
            this.setState({ sent: true });
        }, (error) => {
            this.setState({ sentError: true });
        });
    }


    handleClose(event){
        this.props.close();
    }


    handleReset(event){
        this.setState({ 
            sent: false,
            sentError: false
         });
    }


    render() {
        return (
            <div className="contact-container">
                {
                    this.state.sentError 
                    ? <div className='contact-form-sent-error'>
                        <h3>Error: Your message was not sent. Please try again.</h3>
                        <button onClick={ this.handleReset }>Try Again</button>
                        <button onClick={ this.handleClose }>Cancel</button>
                      </div>
                    : this.state.sent
                        ? <div className='contact-form-sent'>
                            <h3>
                                Thank you for reaching out! We will get back to you as soon as possible.
                            </h3>
                            <button onClick={this.handleClose}>Close</button>
                          </div>
                        : <form className='contact-form' onSubmit={ this.handleSubmit }>
                            <h2>Contact Us:</h2>
                            <div className="floating-label">
                                <input type="text" id="senderName" name="senderName" placeholder="Name" required />
                                <label htmlFor="senderName">Name</label>
                            </div>
                            <div className="floating-label">
                                <input type="text" id="senderEmail" name="senderEmail" placeholder="Email" required />
                                <label htmlFor="senderEmail">Email</label>
                            </div>
                            <div className="message-box">
                                <label htmlFor="feedback">Message:</label>
                                <textarea id="feedback" name="feedback" rows="10" required/>       
                            </div>
                            <div className="button-box">
                                <button onClick={ this.handleClose }>Cancel</button>
                                <input type="submit" value="Submit"/>
                            </div>
                          </form>
                }
            </div>
        );
    }
}

export default Contact