import React, { Component } from 'react'
import ItemService from './ItemService';

class CreateItemComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            description: '',
            imageUrl: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeImageUrlHandler = this.changeImageUrlHandler.bind(this);
        this.saveOrUpdateItem = this.saveOrUpdateItem.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ItemService.getItemById(this.state.id).then( (res) =>{
                let item = res.data;
                this.setState({
                    name: item.name,
                    description: item.description,
                    imageUrl : item.imageUrl
                });
            });
        }        
    }
    saveOrUpdateItem = (e) => {
        e.preventDefault();
        let item = {name: this.state.name, description: this.state.description, imageUrl: this.state.imageUrl};
        console.log('item => ' + JSON.stringify(item));

        // step 5
        if(this.state.id === '_add'){
            ItemService.newItem(item).then(res =>{
                this.props.history.push('/items2');
            });
        }else{
            ItemService.updateItem(item, this.state.id).then( res => {
                this.props.history.push('/items2');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changeImageUrlHandler= (event) => {
        this.setState({imageUrl: event.target.value});
    }

    cancel(){
        this.props.history.push('/items2');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Item</h3>
        }else{
            return <h3 className="text-center">Update Item</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Item Name: </label>
                                            <input placeholder="Item Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Item Description: </label>
                                            <input placeholder="Item Description" name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Item ImageUrl: </label>
                                            <input placeholder="Item ImageUrl" name="imageUrl" className="form-control" 
                                                value={this.state.imageUrl} onChange={this.changeImageUrlHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateItem}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateItemComponent
