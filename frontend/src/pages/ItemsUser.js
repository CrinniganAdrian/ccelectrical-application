import React, { Component } from "react";
import axios from './axios'
import "./Data.css";
import DataItem2 from '../components/DataItem';
import { FavoriteButton } from '../components/FavoriteButton';

import { ResultCard } from "../components/ResultCard";

export default class ItemsUser extends Component {  

  constructor(props) {
    super(props);
    this.state = {
        items: []
    };
  }
  

  getItemsData() {
    axios
        .get(`/items`, {})
        .then(res => {
            const data = res.data
            console.log(data)
            const items = data.map(item =>

                <div key={item.id}>
                
                {
                        <ResultCard item={item} type="item" />
                }

                </div>
                )

                this.setState({
                    items
                })
            localStorage.setItem("items", JSON.stringify(data));

        })
        .catch((error) => {
            console.log(error)
        })

  }


  componentDidMount(){
    this.getItemsData()
  }






  render() {

    
    return (
        <div className='sample__data__cards__container'>
        <div className="data__header__div">
            <header className="data__header">
            <h3>CC Electrical Items</h3>
            </header>
        </div>
        <div className = "row">
            {this.state.items}
        </div>
        </div>
    )
  }
}