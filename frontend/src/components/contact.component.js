import React, { Component } from "react";
import ContactForm from './contactForm.component'
import ContactDetails from './contactDetails.component'
import "../App.css"; 
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="contact-page-container">
        <div className="contact-hero">
          <h1 className="contact-page-title">Get In Touch</h1>
          <p className="contact-page-subtitle">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        
        <div className="contactDiv">
          <ContactForm/>
          <ContactDetails/>
        </div>
      </div>
    );
  }
}