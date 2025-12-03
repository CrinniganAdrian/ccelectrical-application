import React from 'react';
import { Link } from 'react-router-dom';
import "../pages/Data.css"; 
function DataItem(props) {
  return (
    <>
      <td className='data__cards__item'>
        <Link className='data__cards__item__link' to={props.path}>
          <figure className='data__cards__item__pic-wrap' data-category={props.label}>
            <img
              className='data__cards__item__img'
              alt='Image'
              src={props.src}
            />
          </figure>
        </Link>
      </td>
    </>
  );
}
export default DataItem;