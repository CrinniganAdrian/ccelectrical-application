import React, { Component } from "react";
import "../App.css"; 
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class ContactDetails extends Component {
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
      <div className="contactDetailsContainer">
        <div className="contact-details-header">
          <i className="fa-solid fa-address-card contact-header-icon"></i>
          <h3 id="contactDetailsHeader">Contact Information</h3>
        </div>
        
        <p className="contact-details-intro">
          Feel free to reach out to us through any of the following channels. We're here to help!
        </p>

        <div className="contact-details-list">
          <div className="contactDetailsLabel">
            <div className="contact-icon-wrapper">
              <i className="contactsIcon fa-solid fa-envelope"></i>
            </div>
            <div className="contact-detail-content">
              <span className="contact-label">Email</span>
              <a href="mailto:ciaran@ccelectrical.ie" className="ccDetails">
                ciaran@ccelectrical.ie
              </a>
            </div>
          </div>

          <div className="contactDetailsLabel">
            <div className="contact-icon-wrapper">
              <i className="contactsIcon fa-solid fa-phone"></i>
            </div>
            <div className="contact-detail-content">
              <span className="contact-label">Phone</span>
              <a href="tel:0871234567" className="ccDetails">
                087 123 4567
              </a>
            </div>
          </div>

          <div className="contactDetailsLabel">
            <div className="contact-icon-wrapper">
              <i className="contactsIcon fa-brands fa-instagram"></i>
            </div>
            <div className="contact-detail-content">
              <span className="contact-label">Instagram</span>
              <a 
                href="https://instagram.com/ccelectrical" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ccDetails"
              >
                @ccelectrical
              </a>
            </div>
          </div>

          <div className="contactDetailsLabel">
            <div className="contact-icon-wrapper">
              <i className="contactsIcon fa-solid fa-clock"></i>
            </div>
            <div className="contact-detail-content">
              <span className="contact-label">Business Hours</span>
              <span className="ccDetails">Mon - Fri: 9:00 AM - 5:00 PM</span>
            </div>
          </div>
        </div>

        <div className="contact-details-footer">
          <p>We typically respond within 24 hours</p>
        </div>
      </div>
    );
  }
}