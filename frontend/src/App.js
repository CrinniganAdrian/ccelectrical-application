import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import companyLogo from './images/logo.jpg';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import About from "./components/about.component";
import Contact from "./components/contact.component";
import Services from "./pages/Services";
import Services2 from "./pages/Services2";
import Projects from "./pages/Projects";
import Items from "./pages/Items";
import ImageSlider from './components/ImageSlider';
import { SliderData } from './components/SliderData';

import AddItem from "./items/AddItem";

import AddProject from "./projects/AddProject";
import AddService from "./servicesCRUD/AddService";
import EditItem from "./items/EditItem";
import EditService from "./servicesCRUD/EditService";
import EditProject from "./projects/EditProject";




import Footer from './components/Footer';



import Items2 from "./pages/Items2";

import Projects2 from "./pages/Projects2";
import CreateItemComponent from './pages/CreateItemComponent';
import UpdateItemComponent from './pages/UpdateItemComponent';
import ViewItemComponent from './pages/ViewItemComponent';
import ItemsPublic from "./pages/ItemsPublic";
import ItemsUser from "./pages/ItemsUser";

import CreateProjectComponent from './pages/CreateProjectComponent';
import UpdateProjectComponent from './pages/UpdateProjectComponent';
import ViewProjectComponent from './pages/ViewProjectComponent';
import ProjectsPublic from "./pages/ProjectsPublic";
import ProjectsUser from "./pages/ProjectsUser";

import CreateServiceComponent from './pages/CreateServiceComponent';
import UpdateServiceComponent from './pages/UpdateServiceComponent';
import ViewServiceComponent from './pages/ViewServiceComponent';
import ServicesPublic from "./pages/ServicesPublic";
import ServicesUser from "./pages/ServicesUser";

import Sample from "./pages/sample"
import Sample2 from "./pages/Sample2"
import { ItemsFavorites } from "./pages/ItemsFavorites";
import { ProjectsFavorites } from "./pages/ProjectsFavorites";
import { ServicesFavorites } from "./pages/ServicesFavorites";
import { AllFavorites } from "./pages/AllFavorites";

import { Add } from "./pages/Add";
import Faqs from "./pages/Faqs";

import { GlobalProvider } from "./context/GlobalState";

import 'font-awesome/css/font-awesome.min.css';

import EventBus from "./common/EventBus";



class App extends Component {
  
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,

      showItemsPublic: false,
      showItemsUser: false,
      showItemsAdmin: false,

      showProjectsPublic: false,
      showProjectsUser: false,
      showProjectsAdmin: false,

      showServicesPublic: false,
      showServicesUser: false,
      showServicesAdmin: false,

      mobileMenuOpen: false,
    };
  }

  toggleMobileMenu() {
    this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen });
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),

        showItemsUser: user.roles.includes("ROLE_USER"),
        showItemsAdmin: user.roles.includes("ROLE_ADMIN"),

        showProjectsUser: user.roles.includes("ROLE_USER"),
        showProjectsAdmin: user.roles.includes("ROLE_ADMIN"),

        showServicesUser: user.roles.includes("ROLE_USER"),
        showServicesAdmin: user.roles.includes("ROLE_ADMIN")
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,

     
      //showItemsPublic: true,
      showItemsUser: false,
      showItemsAdmin: false,

      //showProjectsPublic: true,
      showProjectsUser: false,
      showProjectsAdmin: false,

      //showServicesPublic: true,
      showServicesUser: false,
      showServicesAdmin: false,
    });
  }

  render() {
    const { 
      currentUser, 
      showItemsPublic, showItemsUser, showItemsAdmin,
      showProjectsPublic, showProjectsUser, showProjectsAdmin,
      showServicesPublic, showServicesUser, showServicesAdmin,
      mobileMenuOpen
    
    } = this.state;

    return (

      <div id="main">
        <nav id="nav" className="navbar navbar-expand-lg navbar-dark modern-navbar">
          <div className="nav-brand-section">
            <img id="logo" src={companyLogo} alt="logo"/>
            <Link to={"/"} id="title" className="navbar-brand">
              CC Electrical
            </Link>
          </div>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={this.toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarContent">
            <ul className="navbar-nav nav-center">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  <i className="fa fa-home"></i> Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/about"} className="nav-link">
                  <i className="fa fa-info-circle"></i> About Us
                </Link>
              </li>

              {showServicesPublic &&(
              <li className="nav-item">
                <Link to={"/ServicesPublic"} className="nav-link">
                  <i className="fa fa-wrench"></i> Services
                </Link>
              </li>
              )}

              {showServicesUser && !showServicesPublic && (
                <li className="nav-item">
                  <Link to={"/ServicesUser"} className="nav-link">
                    <i className="fa fa-wrench"></i> Services
                  </Link>
                </li>
                )}
              
              {showServicesAdmin && !showServicesPublic && (
              <li className="nav-item">
                <Link to={"/services2"} className="nav-link">
                  <i className="fa fa-wrench"></i> Services
                </Link>
              </li>
              )}

              { showProjectsPublic &&( 
              <li className="nav-item">
                <Link to={"/ProjectsPublic"} className="nav-link">
                  <i className="fa fa-folder"></i> Projects
                </Link>
              </li>
              )}

              { showProjectsUser && !showProjectsPublic &&( 
                <li className="nav-item">
                  <Link to={"/ProjectsUser"} className="nav-link">
                    <i className="fa fa-folder"></i> Projects
                  </Link>
                </li>
                )}

                { showProjectsAdmin && !showProjectsPublic &&( 
                  <li className="nav-item">
                    <Link to={"/projects2"} className="nav-link">
                      <i className="fa fa-folder"></i> Projects
                    </Link>
                  </li>
                  )}  

              { showItemsPublic && (
              <li className="nav-item">
                <Link to={"/ItemsPublic"} className="nav-link">
                  <i className="fa fa-th"></i> Items
                </Link>
              </li>
              )}

              { showItemsUser && !showItemsPublic && (
                <li className="nav-item">
                  <Link to={"/ItemsUser"} className="nav-link">
                    <i className="fa fa-th"></i> Items
                  </Link>
                </li>
                )}
                
                { showItemsAdmin && !showItemsPublic && (
                  <li className="nav-item">
                    <Link to={"/items2"} className="nav-link">
                      <i className="fa fa-th"></i> Items
                    </Link>
                  </li>
                  )}

              <li className="nav-item">
                <Link to={"/contact"} className="nav-link">
                  <i className="fa fa-envelope"></i> Contact Us
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/faqs"} className="nav-link">
                  <i className="fa fa-question-circle"></i> FAQs
                </Link>
              </li>
            </ul>

            {currentUser ? (
              <ul className="navbar-nav nav-right">
                <li className="nav-item user-profile-dropdown">
                  <div className="user-profile-section">
                    <i className="fa fa-user-circle user-icon"></i>
                    <Link to={"/profile"} className="nav-link user-name">
                      {currentUser.username}
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link logout-btn" onClick={this.logOut}>
                    <i className="fa fa-sign-out"></i> Logout
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav nav-right">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link login-btn">
                    <i className="fa fa-sign-in"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link signup-btn">
                    <i className="fa fa-user-plus"></i> Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
        
        {/* Full-width slider section - only on home page */}
        {(this.props.location.pathname === '/' || this.props.location.pathname === '/home') && (
          <div className="slider-section">
            <ImageSlider slides={SliderData}/>
          </div>
        )}
        
          <div className="container mt-3">
          <GlobalProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/faqs" component={Faqs} />
              <Route exact path="/ccservices" component={Services} />
              <Route exact path="/services2" component={Services2} />
              <Route exact path="/ServicesPublic" component={ServicesPublic} />
              <Route exact path="/ServicesUser" component={ServicesUser} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/items" component={Items} />
              <Route exact path="/additem" component={AddItem} />
              <Route exact path="/addservice" component={AddService} />
              <Route exact path="/addproject" component={AddProject} />
              <Route exact path="/edititem/:id" component={EditItem} />
              <Route exact path="/editservice/:id" component={EditService} />
              <Route exact path="/editproject/:id" component={EditProject} />
              <Route exact path="/itemsFavorites" component={ItemsFavorites} />
              <Route exact path="/projectsFavorites" component={ProjectsFavorites} />
              <Route exact path="/servicesFavorites" component={ServicesFavorites} />
              <Route exact path="/allFavorites" component={AllFavorites} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/items2" component={Items2} />
              <Route exact path="/ItemsPublic" component={ItemsPublic} />
              <Route exact path="/ItemsUser" component={ItemsUser} />
              <Route exact path="/projects2" component={Projects2} />
              <Route exact path="/ProjectsPublic" component={ProjectsPublic} />
              <Route exact path="/ProjectsUser" component={ProjectsUser} />
              <Route exact path="/add-item/:id" component={CreateItemComponent} />
              <Route exact path="/update-item/:id" component={UpdateItemComponent} />
              <Route exact path="/view-item/:id" component={ViewItemComponent} />
              <Route exact path="/add-project/:id" component={CreateProjectComponent} />
              <Route exact path="/update-project/:id" component={UpdateProjectComponent} />
              <Route exact path="/view-project/:id" component={ViewProjectComponent} />
              <Route exact path="/add-service/:id" component={CreateServiceComponent} />
              <Route exact path="/update-service/:id" component={UpdateServiceComponent} />
              <Route exact path="/view-service/:id" component={ViewServiceComponent} />
              <Route exact path="/sample" component={Sample} />
              <Route exact path="/Sample2" component={Sample2} />
              <Route exact path="/Add" component={Add} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
            </GlobalProvider>
            
          </div>

          <Footer/>
        </div>
    );
  }
}

export default withRouter(App);
