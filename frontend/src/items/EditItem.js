import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import {  Link, 
          Redirect, 
          useParams , 
          //Navigate 
        } 
          from "react-router-dom";

export default function EditItem() {
  let redirect = Redirect();
  //let navigate = Navigate();

  const { id } = useParams();

  const [item, setItem] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const { name, description, imageUrl } = item;

  const onInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadItem();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    // Production URL (AWS Elastic Beanstalk)
    //await axios.put(`http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/item/${id}`, item);
    // Local Development URL
    await axios.put(`http://localhost:8080/item/${id}`, item);
    redirect("/");
    //navigate("/");
  };

  const loadItem = async () => {
    // Production URL (AWS Elastic Beanstalk)
    //const result = await axios.get(`http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/item/${id}`);
    // Local Development URL
    const result = await axios.get(`http://localhost:8080/item/${id}`);
    setItem(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Item</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter item name"
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
                placeholder="Enter item description"
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
                placeholder="Enter image Url"
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
