import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
function Cards() {
  return (
    <div className='cards'>
      <div>
        <h1 className="ccWelcomeHeader">Welcome to CC Electrical</h1>
        <p className="welcome">
          CC Electrical provides quality services which meet Safe Electric standards. 
          With a registered Safe Electrical Contractor, you can rest assured that it will
          be a good investment with CC Electrical. View our recent projects, list of services 
          and some of the inventory we commonly use on our projects. You can also find our 
          contact details <a href="/contact">here.</a>
          <br/>
          <br/>
          Please browse the different links below to our <a href="/ServicesPublic">Services</a>,  
          <a href="/ProjectsPublic"> Projects</a>, and <a href="/ItemsPublic">Items </a> 
          associated with CC Electrical. Then if you like what you see and want to let us
          know, register and log in so you can add these different Services, Projects & Items to 
          you Favourties list, this list can be added to the message within the <a href="/contact">Contact Us</a> page.
        </p>
      </div>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='./images/logo_alone1.jpg'
              text='Learn more about the company.'
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