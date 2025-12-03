import React, { Component } from "react";
import DataItem2 from '../components/DataItem';
import ItemService from './ItemService'
import { ItemControls } from "../components/ItemControls";
import { GlobalContext } from "../context/GlobalState";
import "./Data.css";
class Sample2 extends Component {
    static favorites = GlobalContext
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            isDisabled: false
        }
    }
    componentDidMount(){
        ItemService.getItems().then((res) => {
            this.setState({ items: res.data});
        });
    }
    handleSubmitClicked() {
        this.setState({
          isDisabled: true
        });
        setTimeout(
            function() {
                this.enableComponents()
            }.bind(this),
            3000
        );
    }
    enableComponents() {
       this.setState({
            isDisabled: false
       });
    }
    render() {
        const { favorites} = this.context
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
                                            <DataItem2 id="data__cards__item"
                                                    src={item.imageUrl}
                                                    label={item.name}
                                                />
                                            <td className="data__item__description">
                                                {item.description}
                                            </td>
                                            <td className="crud__action__buttons">
                                            <button id="favouriteOn" className="btn btn-primary" 
                                                disabled={this.state.isDisabled}
                                                onClick={this.handleSubmitClicked.bind(this)}>
                                                <i class="fa-solid fa-star"></i>
                                            </button>
                                            <button id="favouriteOff" className="btn btn-primary" 
                                                disabled={this.state.isDisabled}
                                                onClick={this.handleSubmitClicked.bind(this)}>
                                                <i class="far fa-star"></i>
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
export default Sample2