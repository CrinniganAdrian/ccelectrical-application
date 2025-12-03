import React, { Component } from "react";
import "../App.css"; 
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'
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
        <h3 id="contactDetailsHeader">Contact Details</h3>
        <div className="contactDetailsLabel">
            <i className="contactsIcon fa-solid fa-envelope fa-lg"></i>
            <label className="ccDetails">Email: ciaran@ccelectrical.ie</label>
        </div>
        <div className="contactDetailsLabel">
            <i className="contactsIcon fa-solid fa-phone fa-lg"></i>
            <label className="ccDetails">Phone: 0871234567</label>
        </div>
        <div className="contactDetailsLabel">
            <i className="contactsIcon fa-brands fa-instagram-square fa-lg"></i>
            <label className="ccDetails">Instagram: instagram/ccelectrical.com</label>
        </div>
      </div>
    );
  }
}