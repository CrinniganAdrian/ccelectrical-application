import React, { Component } from 'react'
import ItemService from './ItemService'

class ListItemComponent extends Component {
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
            <div>
                 <h2 className="text-center">Items List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addItem}> Add Item</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> Description</th>
                                    <th> Image</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.items.map(
                                        item => 
                                        <tr key = {item.id}>
                                             <td> {item.name} </td>   
                                             <td> {item.description}</td>
                                             <td> {item.imageUrl}</td>
                                             <td>
                                                 <button onClick={ () => this.editItem(item.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteItem(item.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewItem(item.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListItemComponent
