import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import moment from 'moment';
import axios from 'axios';

// INITIAL STATE
const initialState = {
  auth: {
    id: 1,
    username: 'tester'
  },
  activeTeamId: 0,
  gameStartTime: moment()
}

// ACTION TYPES
const SET_AUTH = 'SET_AUTH';
const SET_START = 'SET_START';
const SET_TEAM = 'SET_TEAM';

// ACTION CREATORS
const setAuth = auth => ({ type: SET_AUTH, auth });

export const setStart = () => ({ type: SET_START, time: moment()});

export const setTeam = teamId => ({ type: SET_TEAM, teamId });

// THUNK CREATORS
const exchangeTokenForAuth = () => {
  return dispatch => {
    const token = window.localStorage.getItem('token');
    if (!token) return;
    return axios.get('/api/users/auth', {
        headers: {
          authorization: token,
        }
      })
      .then(res => res.data)
      .then(auth => dispatch(setAuth(auth)))
      .catch(ex => window.localStorage.removeItem('token'));
  };
};

export const logout = () => {
  window.localStorage.removeItem('token');
  setAuth({});
  setTeam({});
};

export const login = credentials => {
  return dispatch => {
    return axios.post('/api/users/auth', credentials)
      .then(res => res.data)
      .then(data => {
        window.localStorage.setItem('token', data.token);
        dispatch(exchangeTokenForAuth());
      });
  };
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {...state, auth: action.auth}
    default:
      return state
  }
};

export default createStore(reducer, applyMiddleware(logger, thunk));
