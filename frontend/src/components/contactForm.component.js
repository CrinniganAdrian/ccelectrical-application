import React, { useRef, useState, useContext, useEffect } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import "../App.css";
import { GlobalContext } from "../context/GlobalState";

const ContactForm = () => {
  const form = useRef();
  const { favItems, favProjects, favServices } = useContext(GlobalContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedFavorites, setSelectedFavorites] = useState({
    items: [],
    projects: [],
    services: []
  });
  const [customMessage, setCustomMessage] = useState("");

  // Initialize selected favorites from context on mount
  useEffect(() => {
    setSelectedFavorites({
      items: favItems,
      projects: favProjects,
      services: favServices
    });
  }, [favItems, favProjects, favServices]);

  // Remove a favorite from the list
  const removeFavorite = (type, id) => {
    setSelectedFavorites(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  // Build the complete message with favorites
  const buildCompleteMessage = () => {
    let message = "";
    
    // Add favorites section if any exist
    const hasItems = selectedFavorites.items.length > 0;
    const hasProjects = selectedFavorites.projects.length > 0;
    const hasServices = selectedFavorites.services.length > 0;

    if (hasItems || hasProjects || hasServices) {
      message += "=== MY FAVOURITES ===\n\n";

      if (hasItems) {
        message += "ITEMS:\n";
        selectedFavorites.items.forEach((item, index) => {
          message += `${index + 1}. ${item.name}\n`;
        });
        message += "\n";
      }

      if (hasProjects) {
        message += "PROJECTS:\n";
        selectedFavorites.projects.forEach((project, index) => {
          message += `${index + 1}. ${project.name}\n`;
        });
        message += "\n";
      }

      if (hasServices) {
        message += "SERVICES:\n";
        selectedFavorites.services.forEach((service, index) => {
          message += `${index + 1}. ${service.name}\n`;
        });
        message += "\n";
      }

      message += "=== MY MESSAGE ===\n\n";
    }

    message += customMessage;
    return message;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Build template parameters with complete message
    const templateParams = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      message: buildCompleteMessage()
    };

    emailjs
      .send(
        "service_70mwpvs",
        "template_30olor7",
        templateParams,
        "rFgTCA9VldLL1FY9Q"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          setSubmitStatus("success");
          setIsSubmitting(false);
          setCustomMessage("");
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            setSubmitStatus(null);
          }, 5000);
        },
        (error) => {
          console.log(error.text);
          setSubmitStatus("error");
          setIsSubmitting(false);
          
          // Clear error message after 5 seconds
          setTimeout(() => {
            setSubmitStatus(null);
          }, 5000);
        }
      );
  };

  return (
    <StyledContactForm>
      <div className="form-header">
        <i className="fa-solid fa-paper-plane form-header-icon"></i>
        <h3>Send Us a Message</h3>
      </div>
      
      <p className="form-description">
        Have a question or want to work with us? Fill out the form below and we'll get back to you shortly.
      </p>

      <form ref={form} onSubmit={sendEmail}>
        <div className="form-group">
          <label>
            <i className="fa-solid fa-user label-icon"></i>
            Your Name *
          </label>
          <input 
            type="text" 
            name="user_name" 
            required 
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label>
            <i className="fa-solid fa-envelope label-icon"></i>
            Your Email *
          </label>
          <input 
            type="email" 
            name="user_email" 
            required 
            placeholder="your.email@example.com"
          />
        </div>

        {/* Selected Favorites Section */}
        {(selectedFavorites.items.length > 0 || 
          selectedFavorites.projects.length > 0 || 
          selectedFavorites.services.length > 0) && (
          <div className="favorites-section">
            <label>
              <i className="fa-solid fa-star label-icon"></i>
              Your Favourites (will be included in message)
            </label>
            <div className="favorites-list">
              {selectedFavorites.items.length > 0 && (
                <div className="favorite-category">
                  <h4>
                    <i className="fa fa-cube"></i> Items
                  </h4>
                  <div className="favorite-items-container">
                    {selectedFavorites.items.map((item) => (
                      <div key={`item-${item.id}`} className="favorite-item">
                        <span>{item.name}</span>
                        <button
                          type="button"
                          className="remove-favorite"
                          onClick={() => removeFavorite('items', item.id)}
                          title="Remove this item"
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedFavorites.projects.length > 0 && (
                <div className="favorite-category">
                  <h4>
                    <i className="fa fa-folder"></i> Projects
                  </h4>
                  <div className="favorite-items-container">
                    {selectedFavorites.projects.map((project) => (
                      <div key={`project-${project.id}`} className="favorite-item">
                        <span>{project.name}</span>
                        <button
                          type="button"
                          className="remove-favorite"
                          onClick={() => removeFavorite('projects', project.id)}
                          title="Remove this project"
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedFavorites.services.length > 0 && (
                <div className="favorite-category">
                  <h4>
                    <i className="fa fa-wrench"></i> Services
                  </h4>
                  <div className="favorite-items-container">
                    {selectedFavorites.services.map((service) => (
                      <div key={`service-${service.id}`} className="favorite-item">
                        <span>{service.name}</span>
                        <button
                          type="button"
                          className="remove-favorite"
                          onClick={() => removeFavorite('services', service.id)}
                          title="Remove this service"
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="form-group">
          <label>
            <i className="fa-solid fa-message label-icon"></i>
            Your Message *
          </label>
          <textarea 
            name="message" 
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            required
            placeholder="Tell us about your project or inquiry..."
          />
        </div>

        {submitStatus === "success" && (
          <div className="submit-message success-message">
            <i className="fa-solid fa-circle-check"></i>
            Message sent successfully! We'll be in touch soon.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="submit-message error-message">
            <i className="fa-solid fa-circle-exclamation"></i>
            Failed to send message. Please try again.
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              Sending...
            </>
          ) : (
            <>
              <i className="fa-solid fa-paper-plane"></i>
              Send Message
            </>
          )}
        </button>
      </form>
    </StyledContactForm>
  );
};

export default ContactForm;
// Styles
const StyledContactForm = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  background: #ffffff;
  padding: 45px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 50px rgba(214, 110, 0, 0.12);
  }

  .form-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
  }

  .form-header-icon {
    font-size: 32px;
    color: #d66e00;
    background: linear-gradient(135deg, rgba(214, 110, 0, 0.1), rgba(255, 140, 26, 0.1));
    padding: 12px;
    border-radius: 12px;
  }

  h3 {
    color: #1a1a1a;
    font-size: 28px;
    font-weight: 700;
    margin: 0;
  }

  .form-description {
    color: #666;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 30px;
  }

  form {
    color: #333;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;
  }

  .form-group {
    width: 100%;
    margin-bottom: 25px;
  }

  .favorites-section {
    width: 100%;
    margin-bottom: 25px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 12px;
    border: 2px solid #e0e0e0;
  }

  .favorites-list {
    margin-top: 15px;
  }

  .favorite-category {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    h4 {
      color: #d66e00;
      font-size: 14px;
      font-weight: 700;
      margin: 0 0 12px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 8px;

      i {
        font-size: 16px;
      }
    }
  }

  .favorite-items-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: flex-start;
  }

  .favorite-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    background: linear-gradient(135deg, #d66e00 0%, #ff8c1a 100%);
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    box-shadow: 0 2px 6px rgba(214, 110, 0, 0.3);
    transition: all 0.2s ease;
    cursor: default;
    white-space: nowrap;
    height: auto;
    min-height: 36px;

    &:hover {
      box-shadow: 0 4px 12px rgba(214, 110, 0, 0.4);
      transform: translateY(-1px);
    }

    span {
      color: white;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.4;
      display: inline-block;
    }
  }

  .remove-favorite {
    background: rgba(255, 255, 255, 0.3);
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
    padding: 0;
    margin-left: 4px;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
      transform: scale(1.15);
    }

    i {
      font-size: 11px;
      font-weight: bold;
    }
  }

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    font-weight: 600;
    color: #1a1a1a;
    font-size: 15px;
  }

  .label-icon {
    color: #d66e00;
    font-size: 14px;
  }

  input[type="text"],
  input[type="email"] {
    width: 100%;
    height: 50px;
    padding: 14px 18px;
    outline: none;
    border-radius: 12px;
    border: 2px solid #e0e0e0;
    font-size: 15px;
    transition: all 0.3s ease;
    background: #f8f9fa;
    font-family: 'Open Sans', Arial, sans-serif;

    &::placeholder {
      color: #999;
    }

    &:focus {
      border: 2px solid #d66e00;
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(214, 110, 0, 0.08);
    }
  }

  textarea {
    width: 100%;
    min-height: 140px;
    padding: 14px 18px;
    outline: none;
    border-radius: 12px;
    border: 2px solid #e0e0e0;
    font-size: 15px;
    font-family: 'Open Sans', Arial, sans-serif;
    transition: all 0.3s ease;
    background: #f8f9fa;
    resize: vertical;
    line-height: 1.6;

    &::placeholder {
      color: #999;
    }

    &:focus {
      border: 2px solid #d66e00;
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(214, 110, 0, 0.08);
    }
  }

  .submit-message {
    width: 100%;
    padding: 15px 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 600;
    animation: slideDown 0.3s ease;

    i {
      font-size: 20px;
    }
  }

  .success-message {
    background: #d4edda;
    border: 2px solid #28a745;
    color: #155724;

    i {
      color: #28a745;
    }
  }

  .error-message {
    background: #fee;
    border: 2px solid #dc3545;
    color: #dc3545;

    i {
      color: #dc3545;
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .submit-button {
    width: 100%;
    margin-top: 10px;
    padding: 16px 30px;
    cursor: pointer;
    background: linear-gradient(135deg, #d66e00 0%, #ff8c1a 100%);
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(214, 110, 0, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    i {
      font-size: 16px;
    }

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(214, 110, 0, 0.4);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  @media (max-width: 768px) {
    padding: 35px 25px;

    .form-header-icon {
      font-size: 28px;
      padding: 10px;
    }

    h3 {
      font-size: 24px;
    }

    .form-description {
      font-size: 14px;
    }
  }
`;