import React, { Component } from "react";
import "./Faqs.css";

export default class Faqs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null
    };
  }

  toggleFaq = (index) => {
    this.setState({
      activeIndex: this.state.activeIndex === index ? null : index
    });
  };

  render() {
    const { activeIndex } = this.state;

    const faqs = [
      {
        question: "What services does CC Electrical provide?",
        answer: "CC Electrical provides a comprehensive range of electrical services including residential and commercial installations, repairs, maintenance, safety inspections, lighting solutions, and emergency electrical services. All our work meets Safe Electric standards."
      },
      {
        question: "Are your electricians certified and insured?",
        answer: "Yes, all our electricians are fully qualified, certified Safe Electric contractors, and fully insured. We maintain the highest standards of safety and professionalism in all our work."
      },
      {
        question: "Do you provide emergency electrical services?",
        answer: "Yes, we offer emergency electrical services for urgent situations. Contact us directly for immediate assistance with electrical emergencies."
      },
      {
        question: "How can I request a quote for my project?",
        answer: "You can request a quote by contacting us through our Contact Us page, calling our office directly, or emailing us with details about your project. We'll get back to you promptly with a competitive quote."
      },
      {
        question: "What areas do you service?",
        answer: "Please contact us to confirm if we service your area. We're happy to discuss your project requirements and location."
      },
      {
        question: "How long does a typical electrical installation take?",
        answer: "Project timelines vary depending on the scope and complexity of the work. During the quote process, we'll provide you with an estimated timeline for your specific project."
      },
      {
        question: "Do you offer warranties on your work?",
        answer: "Yes, we stand behind our work with comprehensive warranties. Specific warranty details will be provided for your particular project."
      },
      {
        question: "Can I see examples of your previous work?",
        answer: "Absolutely! You can view our portfolio of completed projects in the Projects section of our website, showcasing a variety of residential and commercial electrical installations."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept various payment methods for your convenience. Please contact us to discuss payment options for your project."
      },
      {
        question: "Do you provide free consultations?",
        answer: "Yes, we offer free initial consultations to discuss your electrical needs and project requirements. Contact us to schedule your consultation."
      }
    ];

    return (
      <div className="faqs-page-container">
        <div className="faqs-hero">
          <div className="faqs-hero-content">
            <i className="fa fa-question-circle faqs-hero-icon"></i>
            <h1 className="faqs-page-title">Frequently Asked Questions</h1>
            <p className="faqs-page-subtitle">
              Find answers to common questions about our services, processes, and company
            </p>
          </div>
        </div>

        <div className="faqs-content">
          <div className="faqs-wrapper">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              >
                <div 
                  className="faq-question" 
                  onClick={() => this.toggleFaq(index)}
                >
                  <h3>{faq.question}</h3>
                  <i className={`fa ${activeIndex === index ? 'fa-chevron-up' : 'fa-chevron-down'} faq-icon`}></i>
                </div>
                <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faqs-cta">
            <div className="faqs-cta-content">
              <h2>Still have questions?</h2>
              <p>Can't find the answer you're looking for? Feel free to reach out to our team.</p>
              <a href="/contact" className="faqs-contact-button">
                <i className="fa fa-envelope"></i> Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

