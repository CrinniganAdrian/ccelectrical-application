import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import UserService from "../services/user.service";
import HeroSection from '../components/HeroSection';
import Cards from '../components/Cards';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }
  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
  render() {
    return (
      <div id="outerHomeDiv">
        <HeroSection/>
        <Cards/>
      </div>
    );
  }
}