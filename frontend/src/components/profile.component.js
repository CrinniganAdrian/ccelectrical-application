import React, { Component } from "react";
import {  Redirect,
          //Navigate,
          Link
       } 
       from "react-router-dom";
import AuthService from "../services/auth.service";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      //navigate : null,
      userReady: false,
      currentUser: { username: "" }
    };
  }
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/home" });
    //if (!currentUser) this.setState({ navigate: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    /*
    if (this.state.navigate) {
      return <Navigate to={this.state.navigate} />
    }
    */
    const { currentUser } = this.state;
    return (
      <div className="sample__data__cards__container">
        {(this.state.userReady) ?
        <div>
        <div className="data__header__div">
          <header id="data__header" className="data__header">
            <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
          </header>
        </div>
        <h3 className="profile__h3">{currentUser.username} Details</h3>
        <table className="profile__table__details">
          <tbody>
            <tr className="profile__content">
              <td className="profile__details">
                <p className="profile__content">
                  
                  <br/>
                  <strong>Username:   </strong>{"   "}
                  {currentUser.username}
                  <br/>
                  <strong>Email:      </strong>{"   "}
                  {currentUser.email}
                  <br/>
                </p>
              </td>
              <td className="profile__favorites">
                <Link id="profile__favourite__items__icon" className="" to={`/itemsFavorites`}>
                <i className="fa-solid fa-star"> Favourites</i>
                </Link>
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>: null}
      </div>
      /* 
        <br/>
        <Link id="profile__favourite__items__icon" className="" to={`/itemsFavorites`}>
        <i className="fa-solid fa-star"> Services</i>
        </Link>
        <br/>
        <Link id="profile__favourite__items__icon" className="" to={`/itemsFavorites`}>
        <i className="fa-solid fa-star"> Projects</i>
        </Link>
      */
    );
  }
}