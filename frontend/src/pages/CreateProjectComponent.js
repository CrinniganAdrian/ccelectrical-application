import React, { Component } from 'react'
import ProjectService from './ProjectService';

class CreateProjectComponent extends Component {
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
        this.saveOrUpdateProject = this.saveOrUpdateProject.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ProjectService.getProjectById(this.state.id).then( (res) =>{
                let project = res.data;
                this.setState({
                    name: project.name,
                    description: project.description,
                    imageUrl : project.imageUrl
                });
            });
        }        
    }
    saveOrUpdateProject = (e) => {
        e.preventDefault();
        let project = {name: this.state.name, description: this.state.description, imageUrl: this.state.imageUrl};
        console.log('project => ' + JSON.stringify(project));

        // step 5
        if(this.state.id === '_add'){
            ProjectService.newProject(project).then(res =>{
                this.props.history.push('/projects2');
            });
        }else{
            ProjectService.updateProject(project, this.state.id).then( res => {
                this.props.history.push('/projects2');
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
        this.props.history.push('/projects2');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Project</h3>
        }else{
            return <h3 className="text-center">Update Project</h3>
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

                                        <button className="btn btn-success" onClick={this.saveOrUpdateProject}>Save</button>
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

export default CreateProjectComponent
