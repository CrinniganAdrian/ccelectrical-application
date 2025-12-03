import axios from "axios";
import '../App.css';
import React, { useState } from "react";
import {  Link, 
          Redirect, 
          //Navigate 
        } 
          from "react-router-dom";

export default function AddService() {
  let redirect = Redirect();
  //let navigate = Navigate();

  const [ccservice, setCCService] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const { name, description, imageUrl } = ccservice;

  const onInputChange = (e) => {
    setCCService({ ...ccservice, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Production URL (AWS Elastic Beanstalk)
    //await axios.post("http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/ccservice", ccservice);
    // Local Development URL
    await axios.post("http://localhost:8080/ccservice", ccservice);

    redirect("/");
    //navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Service</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter service name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Description
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter service description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Image Url
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter imageUrl"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button id="editUpdateBtn" type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link id="editUpdateBtn" className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
