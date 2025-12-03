import React, { useRef, useContext} from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { GlobalContext } from "../context/GlobalState";
import "../App.css";
// npm i @emailjs/browser
const ContactForm = () => {
  const form = useRef();
  //const { watchlist } = useContext(GlobalContext);
  const items = localStorage.getItem("watchlist")
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_70mwpvs",
        "template_30olor7",
        form.current,
        "rFgTCA9VldLL1FY9Q"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
    <StyledContactForm>
    <h3>Get In Touch</h3>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" value={items}/>
        <input type="submit" value="Send" />
      </form>
    </StyledContactForm>
    </>
);
};
export default ContactForm;
// Styles
const StyledContactForm = styled.div`
  width: 400px;
  h3{
    color:black;
  }
  form {
    padding-bottom:100px;
    color:black;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;
    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }
    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }
    label {
      margin-top: 1rem;
    }
    input[type="submit"] {
      margin-top: 70px;
      cursor: pointer;
      background: #FF9C51;
      color: #161F28;
      font-size:20px;
      font-weight:bold;
      border: none;
    }
  }
`;