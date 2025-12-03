import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import '../App.css';
import CardItem from './CardItem';
//import BasicSlider from "../components/BasicSlider";
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
      <div id="aboutDiv">
        <h1 className="aboutTitle">About CC Electrical</h1>
        <p className="about">
          CC Electrical provides quality services which meet Safe Electric standards. 
          With a registered Safe Electrical Contractor, you can rest assured that it will
          be a good investment with CC Electrical. View our recent projects, list of services 
          and some of the inventory we commonly use on our projects. You can also find our 
          contact details <a href="/contact">here.</a>
        </p>
      </div>
    );
  }
}