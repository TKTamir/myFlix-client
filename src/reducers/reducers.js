import { combineReducers } from 'redux';

import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  ADD_FAVMOVIE,
  REM_FAVMOVIE,
} from '../actions/actions.js';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      console.log('SET_FILTER reducer reached');
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      console.log('SET_MOVIES reducer reached');
      return action.value;
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      console.log('SET_USER reducer reached');
      return action.user || localStorage.getItem('user') || '';
    case ADD_FAVMOVIE:
      console.log('ADD_FAVMOVIE reducer reached');
      return action.value;
    case REM_FAVMOVIE:
      console.log('REM_FAVMOVIE reducer reached');
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
});

export default moviesApp;
