import React, { Component } from 'react'
import ProjectService from './ProjectService';
import '../pages/Data.css';

class UpdateProjectComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            description: '',
            imageUrl: '',
            dragActive: false,
            previewImage: null
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeImageUrlHandler = this.changeImageUrlHandler.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    componentDidMount(){
        ProjectService.getProjectById(this.state.id).then( (res) =>{
            let project = res.data;
            this.setState({
                name: project.name,
                description: project.description,
                imageUrl : project.imageUrl,
                previewImage: project.imageUrl
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
        this.setState({
            imageUrl: event.target.value,
            previewImage: event.target.value
        });
    }

    handleDrag(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            this.setState({ dragActive: true });
        } else if (e.type === "dragleave") {
            this.setState({ dragActive: false });
        }
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ dragActive: false });
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            this.handleFile(e.dataTransfer.files[0]);
        }
    }

    handleFileInput(e) {
        if (e.target.files && e.target.files[0]) {
            this.handleFile(e.target.files[0]);
        }
    }

    handleFile(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    previewImage: reader.result,
                    imageUrl: reader.result
                });
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file');
        }
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
                            <div className = "card col-md-8 offset-md-2" style={{marginBottom: '100px'}}>
                                <h3 className="text-center">Update Project</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Project Name: </label>
                                            <input placeholder="Project Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler} required/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Project Description: </label>
                                            <textarea placeholder="Project Description" name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionHandler} rows="3" required/>
                                        </div>

                                        {/* Drag and Drop Image Upload */}
                                        <div className="form-group">
                                            <label>Image</label>
                                            <div 
                                                className={`drag-drop-zone ${this.state.dragActive ? "drag-active" : ""}`}
                                                onDragEnter={this.handleDrag}
                                                onDragLeave={this.handleDrag}
                                                onDragOver={this.handleDrag}
                                                onDrop={this.handleDrop}
                                            >
                                                {this.state.previewImage ? (
                                                    <div className="image-preview-container">
                                                        <img src={this.state.previewImage} alt="Preview" className="image-preview" />
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-sm btn-danger remove-image-btn"
                                                            onClick={() => this.setState({ previewImage: null, imageUrl: "" })}
                                                        >
                                                            <i className="fas fa-times"></i> Remove
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="drag-drop-content">
                                                        <i className="fas fa-cloud-upload-alt drag-drop-icon"></i>
                                                        <p className="drag-drop-text">Drag & Drop your image here</p>
                                                        <p className="drag-drop-or">or</p>
                                                        <label htmlFor="fileInput" className="btn btn-primary browse-btn">
                                                            <i className="fas fa-folder-open"></i> Browse Files
                                                        </label>
                                                        <input
                                                            id="fileInput"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={this.handleFileInput}
                                                            style={{ display: 'none' }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className = "form-group">
                                            <label> Or enter Image URL: </label>
                                            <input placeholder="Enter Image URL" name="imageUrl" className="form-control" 
                                                value={this.state.imageUrl} onChange={this.changeImageUrlHandler}/>
                                        </div>

                                        <div className="d-flex gap-2 justify-content-center mt-4">
                                            <button className="btn btn-success btn-lg px-4" onClick={this.updateProject}>
                                                <i className="fas fa-save"></i> Update
                                            </button>
                                            <button className="btn btn-secondary btn-lg px-4" onClick={this.cancel.bind(this)}>
                                                <i className="fas fa-times"></i> Cancel
                                            </button>
                                        </div>
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
