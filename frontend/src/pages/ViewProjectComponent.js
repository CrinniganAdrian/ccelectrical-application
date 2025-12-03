import React, { Component } from 'react'
import ProjectService from './ProjectService'

class ViewProjectComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            project: {}
        }
    }

    componentDidMount(){
        ProjectService.getProjectById(this.state.id).then( res => {
            this.setState({project: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Project Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Project Name: </label>
                            <div> { this.state.project.name }</div>
                        </div>
                        <div className = "row">
                            <label> Project Description: </label>
                            <div> { this.state.project.description }</div>
                        </div>
                        <div className = "row">
                            <label> Project ImageUrl: </label>
                            <div> { this.state.project.imageUrl }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewProjectComponent
