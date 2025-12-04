import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import {  Link, 
          Redirect, 
          useParams, 
          //Navigate 
        } 
          from "react-router-dom";

export default function EditProject() {
  let redirect = Redirect();
  //let navigate = Navigate();

  const { id } = useParams();

  const [project, setProject] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const { name, description, imageUrl } = project;

  const onInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProject();
  }, []);

  useEffect(() => {
    if (imageUrl) {
      setPreviewImage(imageUrl);
    }
  }, [imageUrl]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setProject({ ...project, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Production URL (AWS Elastic Beanstalk)
    //await axios.put(`http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/projects/${id}`, project);
    // Local Development URL
    await axios.put(`http://localhost:8082/projects/${id}`, project);

    //navigate("/");
    redirect("/");
  };

  const loadProject = async () => {
    // Production URL (AWS Elastic Beanstalk)
    //const result = await axios.get(`http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/projects/${id}`);
    // Local Development URL
    const result = await axios.get(`http://localhost:8082/projects/${id}`);
    setProject(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow" style={{marginBottom: '100px'}}>
          <h2 className="text-center m-4">Edit Project</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter project name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                placeholder="Enter project description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
                rows="3"
              />
            </div>
            
            {/* Drag and Drop Image Upload */}
            <div className="mb-3">
              <label className="form-label">Image</label>
              <div 
                className={`drag-drop-zone ${dragActive ? "drag-active" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {previewImage ? (
                  <div className="image-preview-container">
                    <img src={previewImage} alt="Preview" className="image-preview" />
                    <button 
                      type="button" 
                      className="btn btn-sm btn-danger remove-image-btn"
                      onClick={() => {
                        setPreviewImage(null);
                        setProject({ ...project, imageUrl: "" });
                      }}
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
                      onChange={handleFileInput}
                      style={{ display: 'none' }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Alternative: Manual URL Input */}
            <div className="mb-3">
              <label htmlFor="imageUrl" className="form-label">
                Or enter Image URL
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter image URL"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => {
                  onInputChange(e);
                  setPreviewImage(e.target.value);
                }}
              />
            </div>

            <div className="d-flex gap-2 justify-content-center mt-4">
              <button type="submit" className="btn btn-success btn-lg px-4">
                <i className="fas fa-save"></i> Update Project
              </button>
              <Link className="btn btn-secondary btn-lg px-4" to="/">
                <i className="fas fa-times"></i> Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
