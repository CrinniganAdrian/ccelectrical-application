import React, { Component } from 'react'
import ProjectService from './ProjectService'

class ListProjectComponent extends Component {
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
            <div>
                 <h2 className="text-center">Projects List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addProject}> Add Project</button>
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
                                    this.state.projects.map(
                                        project => 
                                        <tr key = {project.id}>
                                             <td> {project.name} </td>   
                                             <td> {project.description}</td>
                                             <td> {project.imageUrl}</td>
                                             <td>
                                                 <button onClick={ () => this.editProject(project.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteProject(project.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewProject(project.id)} className="btn btn-info">View </button>
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

export default ListProjectComponent
