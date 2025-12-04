import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import "../pages/Data.css"; 
import { GlobalContext } from "../context/GlobalState";
export function DataItem2(props) {
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
            <div className='data__cards__item__name-overlay'>
              {props.label}
            </div>
          </figure>
        </Link>
      </td>
    </>
  );
}