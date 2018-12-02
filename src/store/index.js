import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import moment from 'moment';
import axios from 'axios';

// INITIAL STATE
const emptyAuth = {
  id: '',
  email: '',
  username: '',
  team: []
}

const initialState = {
  auth: emptyAuth,
  gameStartTime: moment(),
  games: [],
  teams: []
}

// ACTION TYPES
const SET_AUTH = 'SET_AUTH';
const SET_START = 'SET_START';
const SET_GAMES = 'SET_GAMES';

const SET_TEAMS = 'SET_TEAMS';
const ADD_TEAM = 'ADD_TEAM';

// ACTION CREATORS
const setAuth = (auth) => ({ type: SET_AUTH, auth });
export const setStart = () => ({ type: SET_START, time: moment()});
const setGames = (games) => ({ type: SET_GAMES, games })
const setTeams = teams => ({ type: SET_TEAMS, teams })
const addTeam = team => ({ type: ADD_TEAM, team })

// THUNK CREATORS
export const exchangeTokenForAuth = () => {
  return dispatch => {
    const token = window.localStorage.getItem('token');
    if (!token) return;
    return axios.get('/api/auth/me', {
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
    return setAuth(emptyAuth);
};

export const login = credentials => {
  return dispatch => {
    return axios.post('/api/auth/login', credentials)
      .then(res => res.data)
      .then(data => {
        window.localStorage.setItem('token', data.token);
        dispatch(exchangeTokenForAuth());
      })
  }
}

export const guestSignIn = () => {
  const guestAuth = {
    id: 'a0000000-a000-a000-a000-a00000000000',
    email: 'noreply@escapearoom.com',
    username: 'GuestUser',
    team: []
  }
  return setAuth(guestAuth);
}

export const signup = data => {
  return dispatch => {
    const { email, password } = data;
    return axios.post('/api/users', data)
      .then(res => res.data)
      .then(() => dispatch(login({ email, password })))
  }
}

// get all teams
export const getTeams = () => {
  return dispatch => {
    return axios.get('/api/teams')
      .then(res => res.data)
      .then(teams => dispatch(setTeams(teams)))
  }
}


// create team
export const createTeam = (data, history) => {
  return dispatch => {
    return axios.post('/api/teams', data)
      .then(res => res.data)
      .then(([team, wasCreated]) => {
        if(wasCreated) {
          dispatch(addTeam(team))
          return wasCreated
        }

        return wasCreated
      })
      // .then(() => dispatch(exchangeTokenForAuth()))
  }
}

// joinTeam sends a user, teamName, and password as credentials
// a successful put request adds the user to the team and updates state
export const joinTeam = credentials => {
  return dispatch => {
    return axios.put('/api/user/team', credentials)
      .then(res => res.data)
      .then(user => user.team.id)
      .then(() => dispatch(exchangeTokenForAuth()))
  }
}



export const updateUser = data => {
  return dispatch => {
    return axios.put('/api/user', data)
      .then(res => res.data)
      .then(user => user.team.id)
      .then(() => dispatch(exchangeTokenForAuth()))
  }
}

export const getGames = () => {
  return dispatch => {
    return axios.get('/api/games')
      .then(res => res.data)
      .then(games => dispatch(setGames(games)))
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {...state, auth: action.auth}
    case SET_TEAMS:
      return { ...state, teams: action.teams }
    case ADD_TEAM:
      return { ...state, teams: [ ...state.teams, action.team ] }
    default:
      return state
  }
};

export default createStore(reducer, applyMiddleware(thunk, logger));
