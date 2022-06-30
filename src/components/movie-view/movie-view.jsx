import React from 'react';

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keyperess', this.keypressCallback);
    }
    
    

  render() {
    const { movie, onBackClick } = this.props;

    return (
        <div className="movie-view">
          <div className="movie-poster">
            <img src={movie.ImagePath} />
          </div>
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="movie-releaseyear">
            <span className="label">ReleaseYear: </span>
            <span className="value">{movie.ReleaseYear}</span>
          </div>
          <div className="movie-runtime">
            <span className="label">RunTime: </span>
            <span className="value">{movie.RunTime}</span>
          </div>
        
          <button onClick={() => { onBackClick(null); }}>Back</button>
  
        </div>
      );
    }
  }
   