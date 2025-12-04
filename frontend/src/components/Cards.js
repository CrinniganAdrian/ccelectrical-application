import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
function Cards() {
  return (
    <div className='cards'>
      <div className='cards__intro'>
        <h2 className="cards__section-title">Explore What We Offer</h2>
        <p className="cards__description">
          View our recent projects, comprehensive list of services, and the quality inventory 
          we use on our projects. Browse through the sections below to discover what makes 
          CC Electrical your trusted electrical partner.
        </p>
        <p className="cards__cta">
          Want to save your favorites? <a href="/register" className="cards__link">Register</a> and 
          log in to create your personalized list of services, projects, and items. You can then 
          share this list with us through our <a href="/contact" className="cards__link">Contact Us</a> page 
          to get a customized quote.
        </p>
      </div>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/logo with company name1.jpg'
              text='Learn more about CC Electrical Services and our professional team.'
              label='About Us'
              path='/about'
            />
            <CardItem
              src='images/contact_us1.jpg'
              text='View our contact details and reach out to us for more information.'
              label='Contact Us'
              path='/contact'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/services.jpeg'
              text='View the Services we offer.'
              label='Services'
              path='/ServicesPublic'
            />
            <CardItem
              src='images/projects.jpg'
              text='View the different projects completted by CC Electrical.'
              label='Projects'
              path='/ProjectsPublic'
            />
            <CardItem
              src='images/items.jpg'
              text='View a selection of the items used by CC Electrical'
              label='Items'
              path='/ItemsPublic'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Cards;