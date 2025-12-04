import React, { Component } from "react";
import AboutDetails from './aboutDetails.component'
import "../App.css"; 
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class About extends Component {
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
      <div className="about-page-container">
        <div className="about-hero">
          <h1 className="about-page-title" data-testid="about-1">About CC Electrical</h1>
          <p className="about-page-subtitle">
            Quality electrical services you can trust. We bring expertise, professionalism, and dedication to every project.
          </p>
        </div>
        
        <div className="aboutDiv">
          <div className="aboutContentContainer">
            <div className="about-image-wrapper">
              <img 
                src="/images/cc_electrical_about_us.jpg" 
                alt="CC Electrical" 
                className="about-image"
              />
            </div>
            <div className="about-text-content">
              <h2 className="about-section-title">Our Story</h2>
              <p className="about-text">
                CC Electrical provides quality services which meet Safe Electric standards. 
                With a registered Safe Electrical Contractor, you can rest assured that it will
                be a good investment with CC Electrical.
              </p>
              <p className="about-text">
                We take pride in delivering exceptional electrical solutions for both residential 
                and commercial clients. Our commitment to safety, quality, and customer satisfaction 
                sets us apart in the industry.
              </p>
              <p className="about-text">
                View our recent <a href="/projects" className="about-link">projects</a>, list of <a href="/ccservices" className="about-link">services</a>, 
                and some of the inventory we commonly use on our projects. You can also find our 
                contact details <a href="/contact" className="about-link">here</a>.
              </p>
            </div>
          </div>
          <AboutDetails/>
        </div>
      </div>
    );
  }
}