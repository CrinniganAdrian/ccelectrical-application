import React from 'react';
import ItemService from './ItemService'

  const [results, setResults] = useState([]);

  const onChange = (e) => {
    e.preventDefault();

    this.state = {
        items: []
    }

      ItemService.getItems().then((res) => {
        this.setState({ items: res.data});
    });
  };


const ItemUser2 = () => {
  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">

          {results.length > 0 && (
            <ul className="results">
              {results.map((movie) => (
                <li key={movie.id}>
                  <ResultCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemUser2;
