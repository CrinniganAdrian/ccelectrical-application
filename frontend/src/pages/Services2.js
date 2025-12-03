import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DataItemService from '../components/DataItemServices';
import ServiceService from './ServiceService'
import "./Data.css";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Service2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
                services: []
        }
        this.addService = this.addService.bind(this);
        this.editService = this.editService.bind(this);
        this.deleteService = this.deleteService.bind(this);
    }

    deleteService(id){
        ServiceService.deleteService(id).then( res => {
            this.setState({services: this.state.services.filter(service => service.id !== id)});
        });
    }
    viewService(id){
        this.props.history.push(`/view-service/${id}`);
    }
    editService(id){
        this.props.history.push(`/update-service/${id}`);
    }

    componentDidMount(){
        ServiceService.getServices().then((res) => {
            this.setState({ services: res.data});
        });
    }

    addService(){
        this.props.history.push('/add-service/_add');
    }

    render() {
        return (
            <>
            <div className='sample__data__cards__container'>
            <div className="data__header__div">
                <header className="data__header">
                <h3>CC Electrical Services</h3>
                </header>
            </div>
            <div>
                 <div className = "row">
                        <table className="table table-borderless">

                            <thead>
                                <tr>
                                    
                                </tr>
                            </thead>
                            <tbody className="table__data">
                                {
                                    this.state.services.map(
                                        service => 
                                        <tr key = {service.id}>
                                            <DataItemService id="data__cards__item"
                                                    src={service.imageUrl}
                                                    label={service.name}
                                                />
                                            <td className="data__item__description">
                                                {service.description}
                                            </td>
                                            <td className="crud__action__buttons">
                                                <Link id="edit" className="btn btn-outline-primary mx-2" to={`/update-service/${service.id}`}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                                <button
                                                id="delete"
                                                className="btn btn-danger mx-2"
                                                onClick={ () => this.deleteService(service.id)}

                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>


                <div id="addDataBTN">
                        <button className="btn btn-primary" onClick={this.addService}> 
                        <i className="fas fa-plus fa-5x"></i>
                        </button>
                </div>

            </div>
            </div>
            </>
        ); 
}
    
}
export default Service2
