import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import CardItem from '../components/CardItem';
import DataItem from '../components/DataItem';
import ItemService from './ItemService'
import "./Data.css";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Items2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
                items: []
        }
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(id){
        ItemService.deleteItem(id).then( res => {
            this.setState({items: this.state.items.filter(item => item.id !== id)});
        });
    }
    viewItem(id){
        this.props.history.push(`/view-item/${id}`);
    }
    editItem(id){
        this.props.history.push(`/update-item/${id}`);
    }

    componentDidMount(){
        ItemService.getItems().then((res) => {
            this.setState({ items: res.data});
        });
    }

    addItem(){
        this.props.history.push('/add-item/_add');
    }

    render() {
        return (
            <>
            <div className='sample__data__cards__container'>
            <div className="data__header__div">
                <header className="data__header">
                <h3>CC Electrical Items</h3>
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
                                    this.state.items.map(
                                        item => 
                                        <tr key = {item.id}>
                                            <DataItem id="data__cards__item"
                                                    src={item.imageUrl}
                                                    label={item.name}
                                                />
                                            <td className="data__item__description">
                                                {item.description}
                                            </td>
                                            <td className="crud__action__buttons">
                                                
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
export default Items2
