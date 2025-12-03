import React, { Component } from 'react'
import ServiceService from './ServiceService'

class ViewServiceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            service: {}
        }
    }

    componentDidMount(){
        ServiceService.getServiceById(this.state.id).then( res => {
            this.setState({service: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Service Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Service Name: </label>
                            <div> { this.state.service.name }</div>
                        </div>
                        <div className = "row">
                            <label> Service Description: </label>
                            <div> { this.state.service.description }</div>
                        </div>
                        <div className = "row">
                            <label> Service ImageUrl: </label>
                            <div> { this.state.service.imageUrl }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewServiceComponent
