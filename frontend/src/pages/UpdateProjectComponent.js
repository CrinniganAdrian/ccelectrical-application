import React, { Component } from 'react'
import ProjectService from './ProjectService';

class UpdateProjectComponent extends Component {
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
        this.updateProject = this.updateProject.bind(this);
    }

    componentDidMount(){
        ProjectService.getProjectById(this.state.id).then( (res) =>{
            let project = res.data;
            this.setState({
                name: project.name,
                description: project.description,
                imageUrl : project.imageUrl
            });
        });
    }

    updateProject = (e) => {
        e.preventDefault();
        let project = {name: this.state.name, description: this.state.description, imageUrl: this.state.imageUrl};
        console.log('project => ' + JSON.stringify(project));
        console.log('id => ' + JSON.stringify(this.state.id));
        ProjectService.updateProject(project, this.state.id).then( res => {
            this.props.history.push('/projects2');
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
        this.props.history.push('/projects2');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Project</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Project Name: </label>
                                            <input placeholder="Project Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Project Description: </label>
                                            <input placeholder="Project Description" name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Project ImageUrl: </label>
                                            <input placeholder="Project ImageUrl" name="imageUrl" className="form-control" 
                                                value={this.state.imageUrl} onChange={this.changeImageUrlHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateProject}>Save</button>
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

export default UpdateProjectComponent
