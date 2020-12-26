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
import {Link} from 'react-router-dom';
import emailjs from 'emailjs-com';
import Header from '../header/Header';
import Footer from '../footer/Footer';



import '../../style/contact.scss'

 class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            sentError: false,
            validEmail: true,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }


    handleSubmit(event){
        event.preventDefault();

        if ( this.validate(event.target) ){

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
    }

    handleReset(event){
        this.setState({ 
            sent: false,
            sentError: false
         });
    }

    validate(form){
        let validEmail = this.validateEmail(form.senderEmail.value);
        return validEmail;
    }

    validateEmail(email){
        const emailExpression = /\S+@\S+/;
        let emailCheck = emailExpression.test(String(email).toLowerCase());
        this.setState({ validEmail: emailCheck });
        return emailCheck;
    }

    render() {

        const visible = this.state.sentError || this.state.sent
                        ? 'hidden'
                        : '';

        const emailError = this.state.validEmail ? 'floating-label' : 'floating-label-error';

        return (
            <div className='container'>
                <Header mapVisible={ false} mapButtomVisible={ false }/>
                <div className='content'>
                    <div className='contact-content'>
                        <div className="contact-container">
                            {
                                this.state.sentError 
                                ? <div className='contact-form-sent-error'>
                                    <h3>Error: Your message was not sent.</h3>
                                    <div className='button-box'>
                                        <Link to='/'>Cancel</Link>
                                        <button onClick={ this.handleReset }>Try Again</button>
                                    </div>
                                </div>
                                : this.state.sent
                                    ? <div className='contact-form-sent'>
                                        <h3>Thank you for reaching out!</h3>
                                        <h3>We will get back to you as soon as possible.</h3>
                                        <div className='button-box'>
                                            <Link to='/'>Close</Link>
                                        </div>
                                    </div>
                                    :''
                            }
                            <form className={ `contact-form ${visible}` } onSubmit={ this.handleSubmit }>
                                <h2>Contact Us:</h2>
                                <div className="floating-label">
                                    <input type="text" id="senderName" name="senderName" placeholder="Name" required />
                                    <label htmlFor="senderName">Name</label>
                                </div>
                                <div className={ emailError } >
                                    <input type="text" id="senderEmail" name="senderEmail" placeholder="Email" required />
                                    <label htmlFor="senderEmail">
                                        {
                                            this.state.validEmail ? "Email" : "Email - Enter valid email!"
                                        }
                                    </label>
                                </div>
                                <div className="message-box">
                                    <label htmlFor="feedback">Message:</label>
                                    <textarea id="feedback" name="feedback" rows="10" required/>       
                                </div>
                                <div className="button-box">
                                    <Link to='/'>Cancel</Link>
                                    <input type="submit" value="Submit"/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>

        );
    }
}

export default Contact