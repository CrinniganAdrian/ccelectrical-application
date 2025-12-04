import React, { Component } from "react";
import axios from './axios'
import "./Data.css";
import DataItem2 from '../components/DataItem';
import { FavoriteButton } from '../components/FavoriteButton';

import { ResultCard } from "../components/ResultCard";

export default class ProjectsUser extends Component {  

  constructor(props) {
    super(props);
    this.state = {
        projects: []
    };
  }
  

  getItemsData() {
    axios
        .get(`/projects`, {})
        .then(res => {
            const data = res.data
            console.log(data)
            const projects = data.map(projects =>

                <div key={projects.id}>
                
                {
                        <ResultCard item={projects} type="project" />
                }

                </div>
                )

                this.setState({
                    projects
                })
            localStorage.setItem("projects", JSON.stringify(data));

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
            <h3>CC Electrical Projects</h3>
            </header>
        </div>
        <div className = "row">
            {this.state.projects}
        </div>
        </div>
    )
  }
}