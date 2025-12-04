import React from 'react';
import { Link } from 'react-router-dom';
import "../pages/Data.css"; 
function DataItemServices(props) {
  return (
    <>
      <td className='data__cards__item'>
        <Link className='data__cards__item__link' to={props.path}>
          <figure className='data__cards__item__pic-wrap'>
            <img
              className='data__cards__item__services__img'
              alt='Image'
              src={props.src}
            />
            <div className='data__cards__item__name-overlay'>
              {props.label}
            </div>
          </figure>
        </Link>
      </td>
    </>
  );
}
export default DataItemServices;