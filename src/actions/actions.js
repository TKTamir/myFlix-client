export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const ADD_FAVMOVIE = 'ADD_FAVMOVIE';
export const REM_FAVMOVIE = 'REM_FAVMOVIE';

export function setMovies(value) {
  console.log('SET_MOVIES reducer reached');
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  console.log('SET_FILTER reducer reached');
  return { type: SET_FILTER, value };
}

export function setUser(value) {
  console.log('SET_USER reducer reached');
  return { type: SET_USER, value }; //Might need to target username later
}

export function addFavMovie(value) {
  console.log('ADD_FAVMOVIE reducer reached');
  return { type: ADD_FAVMOVIE, value };
}

export function remFavMovie(value) {
  console.log('REM_FAVMOVIE reducer reached');
  return { type: REM_FAVMOVIE, value };
}
