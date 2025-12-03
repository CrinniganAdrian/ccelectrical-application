import React, { Component , useState, useContext} from "react";
import axios from './axios'
import "./Data.css";
import DataItem2 from '../components/DataItem';
import { FavoriteButton } from '../components/FavoriteButton';

import { ResultCard } from "../components/ResultCard";

export default class Sample2 extends Component {  

    constructor(props)
    {

        super(props);
    
        this.state = {
          redirect: null,
          userReady: false,
        };

    }


    componentDidMount() 
    {
    
        const currentUser = AuthService.getCurrentUser();
        
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })

    }

    


    render()
    {
        
        const {
            addItemToWatchlist,
            watchlist,
            watched,
          } = useContext(GlobalContext);
        
          let storedItem = watchlist.find((o) => o.id === item.id);
        
          const watchlistDisabled = storedItem
            ? true
            : false;
        
        
          const [iconView, setIconView] = useState(false);







        return (
                
            <div className="sample__data__cards__container">

                    <div className="data__header__div">
                    <header className="data__header">
                        <h3>
                        <strong>{currentUser.username}</strong> Favourites
                        </h3>
                    </header>
                    </div>

                    <h3 className="profile__h3">{currentUser.username} Favourites</h3>

                    <div className="row">
                    
                    <div className="items__favourites__container">
                    <h3 id="favourites__heading">Items</h3>
                    {
                        <ul>
                        {currentUser.items &&
                            currentUser.items.map((item, index) => 
                            <li id="favourites__list__item" key={index}>{item}
                            
                            <button
                            id="user__item__delete"
                            className="btn btn-danger mx-2"
                            onClick={ () => this.deleteUserItem(currentUser.id,item)}
                                >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                            
                            </li>
                        )}

                        
                        </ul>
                    }
                    </div>

                    <div className="services__favourites__container">
                    <h3 id="favourites__heading">Services</h3>
                    {
                        <ul>
                        {currentUser.services &&
                            currentUser.services.map((service, index) => 
                            
                            <li id="favourites__list__item" key={index}>{service}
                            
                            <button
                            id="user__item__delete"
                            className="btn btn-danger mx-2"
                            onClick={ () => this.deleteService(service.id)}
                                >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                            
                            
                            </li>)}

                        </ul>
                    }
                    </div>

                    <div className="projects__favourites__container"> 
                    <h3 id="favourites__heading">Projects</h3>
                    {
                        <ul>
                        {currentUser.projects &&
                            currentUser.projects.map((project, index) => 
                            
                            
                            <li id="favourites__list__item" key={index}>{project}
                            
                            <button
                            id="user__item__delete"
                            className="btn btn-danger mx-2"
                            onClick={ () => this.deleteProject(project.id)}
                                >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                            
                            </li>)}


                        
                        </ul>
                    }
                    </div>

                   
                    </div>
            </div>
        );
    }
    
  }