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
  activeGame: { startTime: moment() },
  games: []
}

// ACTION TYPES
const SET_AUTH = 'SET_AUTH';
const SET_START = 'SET_START';
const SET_GAMES = 'SET_GAMES';

const SET_TEAMS = 'SET_TEAMS';
const ADD_TEAM = 'ADD_TEAM';
const SET_ACTIVE_GAME = 'SET_ACTIVE_GAME';
const SET_TEAM = 'SET_TEAM';



// ACTION CREATORS
const setAuth = (auth) => ({ type: SET_AUTH, auth });
export const setStart = () => ({ type: SET_START, time: moment()});
const setGames = (games) => ({ type: SET_GAMES, games })
const setTeams = teams => ({ type: SET_TEAMS, teams })
const addTeam = team => ({ type: ADD_TEAM, team })
const setActiveGame = (game) => ({ type: SET_ACTIVE_GAME, game });
const setTeam = user => ({ type: SET_TEAM, user })

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
    const { email, username, password } = data;
    return axios.post('/api/users', data)
      .then(res => res.data)
      .then(() => dispatch(login({ email, password })))
  }
}

// create team
export const createTeam = (data, history) => {
  return dispatch => {
    return axios.post('/api/teams', data)
      .then(res => res.data)
      .then(([team, wasCreated]) => {
        if(wasCreated) {
          return wasCreated
        }

        return wasCreated
      })
      .then(() => dispatch(exchangeTokenForAuth()))
  }
}

// joinTeam sends a user, teamName, and password as credentials
// a successful put request adds the user to the team and updates state
export const joinTeam = (credentials, history) => {
  return dispatch => {
    return axios.put('/api/users/team', credentials)
      .then(res => res.data)
      .then(user => dispatch(setTeam(user)))
      .then(() => dispatch(exchangeTokenForAuth()))
      .then(() => history.push('/account'))
  }
}



export const updateUser = (id, user, history) => {
  return dispatch => {
    return axios.put(`/api/users/${ id }`, user)
      .then(res => res.data)
      .then(user => dispatch(setAuth(user)))
      .then(() => dispatch(exchangeTokenForAuth()))
      .then(() => history.push('/account'))
  }
}

// GAMES
export const getGames = () => {
  return dispatch => {
    return axios.get('/api/games')
      .then(res => res.data)
      .then(games => dispatch(setGames(games)))
  }
}

export const createGame = (authId, weekNum) => {
  return (dispatch) => {
    return axios.post('/api/games', { authId, weekNum })
      .then(res => res.data[0])
      .then(game => dispatch(setActiveGame(game)))
  }
}

export const beatTheGame = (game, endTime) => {
  return (dispatch) => {
    return axios.put(`/api/games/${game.id}`, {escaped: true, endTime} )
      .then(res => res.data)
      .then(_game => dispatch(setActiveGame(_game)))
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
    case SET_ACTIVE_GAME:
      return {...state, activeGame: action.game}
    case SET_TEAM:
      return {...state, auth: { ...state.auth, teamId: action.user.teamId } }
    default:
      return state
  }
};

export default createStore(reducer, applyMiddleware(thunk, logger));
