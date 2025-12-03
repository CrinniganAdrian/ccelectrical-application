import React, { Component } from 'react'
import ServiceService from './ServiceService';

class UpdateServiceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            description: '',
            imageUrl: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeImageUrlHandler = this.changeImageUrlHandler.bind(this);
        this.updateService = this.updateService.bind(this);
    }

    componentDidMount(){
        ServiceService.getServiceById(this.state.id).then( (res) =>{
            let service = res.data;
            this.setState({
                name: service.name,
                description: service.description,
                imageUrl : service.imageUrl
            });
        });
    }

    updateService = (e) => {
        e.preventDefault();
        let service = {name: this.state.name, description: this.state.description, imageUrl: this.state.imageUrl};
        console.log('service => ' + JSON.stringify(service));
        console.log('id => ' + JSON.stringify(this.state.id));
        ServiceService.updateService(service, this.state.id).then( res => {
            this.props.history.push('/services2');
        });
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
        this.props.history.push('/services2');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Service</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Service Name: </label>
                                            <input placeholder="Service Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Service Description: </label>
                                            <input placeholder="Service Description" name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Service ImageUrl: </label>
                                            <input placeholder="Service ImageUrl" name="imageUrl" className="form-control" 
                                                value={this.state.imageUrl} onChange={this.changeImageUrlHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateService}>Save</button>
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

export default UpdateServiceComponent
