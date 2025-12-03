import axios from "axios";

import React, { Component, useState } from "react";

import AuthService from "../services/auth.service";

import {  Link, 
          Redirect
        } 
          from "react-router-dom";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authService from "../services/auth.service";



export default class Favourites extends Component {
    
    constructor(props)
    {

        super(props);
    
        this.state = {
          redirect: null,
          userReady: false,
          currentUser: 
          { 
            username:   "",
            id:         null,
            items:      []
        }
        };

    }


    componentDidMount() 
    {
    
        const currentUser = AuthService.getCurrentUser();
        
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })

    }

    /*
    deleteItem(id){
        ItemService.deleteItem(id).then( res => {
            this.setState({items: this.state.items.filter(item => item.id !== id)});
        });
    }

    deleteUserItem(userId,itemName){
        AuthService.deleteUserItem(userId,itemName).then( res => {
            this.setState({currentUser: this.state.currentUser
                .map(this.state.currentUser.filter(items => items.name !== itemName))
                .map(this.state.currentUser.filter(users => users.id !== userId))});
        });
    }*/
    

    deleteUserItem(userId,itemName){
        AuthService.deleteUserItem(userId,itemName).then( res => {
            this.setState({currentUser: this.state.currentUser.id !== userId});
        });
    }

    /*
    deleteUserItem(userId, itemId)
    {  
        AuthService.deleteUserItem(userId,itemId).then( res =>{
            this.setState({currentUser: this.state.userId.filter(userId => currentUser.id !== userId)});
        });
    }*/


    render()
    {
        
        const { currentUser } = this.state;







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
                        
                        <button type="submit" className="btn btn-outline-primary">
                            Favorite Items
                        </button>
                    </div>

                    <div className="services__favourites__container">
                        
                        <button type="submit" className="btn btn-outline-primary">
                            Favorite Services
                        </button>
                    </div>

                    <div className="projects__favourites__container"> 
                        
                        <button type="submit" className="btn btn-outline-primary">
                            Favorite Projects
                        </button>
                    </div>

                   
                    </div>
            </div>
        );
    }
}
