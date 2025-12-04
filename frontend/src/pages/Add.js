import React, { useState, useEffect } from "react";
import { ResultCard } from "../components/ResultCard";
import axios from "axios";

export const Add = () => {
  
  const [items, setItems] = useState( [] );
  
  useEffect(() => {
    const fetchItems = async () => {
      // Production URL (AWS Elastic Beanstalk)
      //const response = await fetch('http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/items');
      // Local Development URL
      const response = await fetch('http://localhost:8082/items');
      const itemsData = await response.json();
      setItems(itemsData);
    };
    fetchItems();
  }, []);

const useItems = items.map((item)=>{
  return <div>
    <ResultCard item={item} />
  </div> 
  })

  return (
    <>
      <div className="container">
          {items && useItems}
      </div>
    </>
  );
};
