import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DataItemService from '../components/DataItemServices';
import ProjectService from './ProjectService'
import "./Data.css";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Project2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
                projects: []
        }
        this.addProject = this.addProject.bind(this);
        this.editProject = this.editProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }

    deleteProject(id){
        ProjectService.deleteProject(id).then( res => {
            this.setState({projects: this.state.projects.filter(project => project.id !== id)});
        });
    }
    viewProject(id){
        this.props.history.push(`/view-project/${id}`);
    }
    editProject(id){
        this.props.history.push(`/update-project/${id}`);
    }

    componentDidMount(){
        ProjectService.getProjects().then((res) => {
            this.setState({ projects: res.data});
        });
    }

    addProject(){
        this.props.history.push('/add-project/_add');
    }

    render() {
        return (
            <>
            <div className='sample__data__cards__container'>
            <div className="data__header__div">
                <header className="data__header">
                <h3>CC Electrical Projects</h3>
                </header>
            </div>
            
            <div className="add-data-button-container">
                <button className="add-data-button" onClick={this.addProject}>
                    <i className="fas fa-plus"></i>
                    <span>Add New Project</span>
                </button>
            </div>

            <div className="data__cards__wrapper">
                 <div className = "row">
                        <table className="table table-borderless">

                            <thead>
                                <tr>
                                    
                                </tr>
                            </thead>
                            <tbody className="table__data">
                                {
                                    this.state.projects.map(
                                        project => 
                                        <tr key = {project.id}>
                                            <DataItemService id="data__cards__item"
                                                    src={project.imageUrl}
                                                    label={project.name}
                                                />
                                            <td className="data__item__description">
                                                {project.description}
                                            </td>
                                            <td className="crud__action__buttons">
                                                <Link id="edit" to={`/update-project/${project.id}`}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                    <span>Edit</span>
                                                </Link>
                                                <button
                                                id="delete"
                                                onClick={ () => this.deleteProject(project.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                    <span>Delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
            </div>
            </>
        ); 
}
    
}
export default Project2
