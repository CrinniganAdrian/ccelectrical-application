import React, { Component } from "react";
import axios from './axios'
import "./Data.css";
import DataItem2 from '../components/DataItem';
import { FavoriteButton } from '../components/FavoriteButton';

import { ResultCard } from "../components/ResultCard";

export default class ServicesUser extends Component {  

  constructor(props) {
    super(props);
    this.state = {
        ccservices: []
    };
  }
  

  getItemsData() {
    axios
        .get(`/ccservices`, {})
        .then(res => {
            const data = res.data
            console.log(data)
            const ccservices = data.map(ccservice =>

                <div>
                
                {
                        <ResultCard item={ccservice} />
                }

                </div>
                )

                this.setState({
                    ccservices
                })
            localStorage.setItem("ccservices", JSON.stringify(data));

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
            <h3>CC Electrical Services</h3>
            </header>
        </div>
        <div className = "row">
            {this.state.ccservices}
        </div>
        </div>
    )
  }
}