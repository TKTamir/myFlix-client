export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

export function setMovies(value) {
  console.log('SET_MOVIES reducer reached');
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  console.log('SET_FILTER reducer reached');
  return { type: SET_FILTER, value };
}
export function setUser(value) {
  return { type: SET_USER, value };
}