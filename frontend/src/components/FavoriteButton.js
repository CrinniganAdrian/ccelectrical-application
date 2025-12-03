import React, { Component } from "react";
export class FavoriteButton extends Component { 
    constructor(props) {
      super(props);
      this.state = {
        isCardView: false,
      }
    } 
    render() {
      return (
        <a id="favouriteOn" className="btn btn-primary"  onClick={()=>this.setState({ isCardView: !this.state.isCardView })}>
          { this.state.isCardView
            ? <i class="fas fa-star"></i>
            : <i class="far fa-star"></i>
          }
        </a>
      );
    }
  }
  export default FavoriteButton
/*
import React, { useState, useEffect } from 'react';
export const FavoriteButton = ({items}) => {
const [isLike, setIsLike] = useState(
    JSON.parse(localStorage.getItem('favorites', items))
);
useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(items));
}, [isLike]);
const toggleLike = () => {
    setIsLike(!isLike);
}
return(
    <div>
        <button 
            onClick={toggleLike} 
            className={"bt-like like-button " + (isLike ? "liked" : "")
        }>
        </button>
    </div>
    );
};
export default FavoriteButton;
*/