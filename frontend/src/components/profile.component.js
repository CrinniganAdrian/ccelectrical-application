import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../pages/Data.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="modern-profile-container">
        {(this.state.userReady) ?
          <div className="profile-wrapper">
            <div className="profile-header">
              <div className="profile-avatar">
                <i className="fa fa-user-circle"></i>
              </div>
              <h2 className="profile-username">{currentUser.username}</h2>
              <p className="profile-subtitle">User Profile</p>
            </div>

            <div className="profile-content-card">
              <h3 className="profile-section-title">
                <i className="fa fa-info-circle"></i> Account Details
              </h3>
              <div className="profile-details-grid">
                <div className="profile-detail-item">
                  <span className="profile-label">
                    <i className="fa fa-user"></i> Username
                  </span>
                  <span className="profile-value">{currentUser.username}</span>
                </div>
                <div className="profile-detail-item">
                  <span className="profile-label">
                    <i className="fa fa-envelope"></i> Email
                  </span>
                  <span className="profile-value">{currentUser.email}</span>
                </div>
              </div>
            </div>

            {/* Only show My Favourites button for non-admin users */}
            {currentUser.roles && !currentUser.roles.includes("ROLE_ADMIN") && (
              <div className="profile-actions">
                <Link className="profile-action-btn" to={`/allFavorites`}>
                  <i className="fa fa-star"></i>
                  <span>My Favourites</span>
                </Link>
              </div>
            )}
          </div>
        : null}
      </div>
    );
  }
}