import React from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

constructor(){
    super();
    this.state = {
        movies: [ //Might need to change name to movie from movies, to fit the schema from achievement 2
            { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
            { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...'},
            { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'}
        ],
        selectedMovie: null
    };
}


render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) return <MovieView movie={selectedMovie} />;
  
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard key={movie._id} onMovieClick={(newSelectedMovie) => { this.state.selectedMovie = newSelectedMovie; }} />)}
      </div>
    );
  }
}

export default MainView;