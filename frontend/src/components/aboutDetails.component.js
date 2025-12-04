import React, { Component } from "react";
import "../App.css"; 
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class AboutDetails extends Component {
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
      <div className="aboutDetailsContainer">
        <div className="about-details-header">
          <i className="fa-solid fa-building about-header-icon"></i>
          <h3 id="aboutDetailsHeader">Who We Are</h3>
        </div>
        
        <p className="about-details-intro">
          CC Electrical is your trusted partner for all electrical needs. We pride ourselves on delivering exceptional service and quality workmanship.
        </p>

        <div className="about-details-list">
          <div className="aboutDetailsLabel">
            <div className="about-icon-wrapper">
              <i className="aboutIcon fa-solid fa-certificate"></i>
            </div>
            <div className="about-detail-content">
              <span className="about-label">Certification</span>
              <span className="about-value">Registered Safe Electric Contractor</span>
            </div>
          </div>

          <div className="aboutDetailsLabel">
            <div className="about-icon-wrapper">
              <i className="aboutIcon fa-solid fa-shield-halved"></i>
            </div>
            <div className="about-detail-content">
              <span className="about-label">Quality Assurance</span>
              <span className="about-value">All work meets Safe Electric standards</span>
            </div>
          </div>

          <div className="aboutDetailsLabel">
            <div className="about-icon-wrapper">
              <i className="aboutIcon fa-solid fa-handshake"></i>
            </div>
            <div className="about-detail-content">
              <span className="about-label">Commitment</span>
              <span className="about-value">Quality services and customer satisfaction</span>
            </div>
          </div>

          <div className="aboutDetailsLabel">
            <div className="about-icon-wrapper">
              <i className="aboutIcon fa-solid fa-tools"></i>
            </div>
            <div className="about-detail-content">
              <span className="about-label">Services</span>
              <span className="about-value">Residential and commercial electrical work</span>
            </div>
          </div>
        </div>

        <div className="about-details-footer">
          <p>Your satisfaction and safety are our top priorities</p>
        </div>
      </div>
    );
  }
}

