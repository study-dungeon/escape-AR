import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import moment from 'moment';
import axios from 'axios';

// INITIAL STATE
const initialState = {
  auth: {
    id: '812a66d9-9f46-4a15-87dd-c76544253247',
    username: 'tester'
  },
  gameStartTime: moment(),
  games: []
}

// ACTION TYPES
const SET_AUTH = 'SET_AUTH';
const SET_START = 'SET_START';
const SET_GAMES = 'SET_GAMES';



// ACTION CREATORS
const setAuth = auth => ({ type: SET_AUTH, auth });
export const setStart = () => ({ type: SET_START, time: moment()});
const setGames = (games) => ({ type: SET_GAMES, games })
const setTeams = teams => ({ type: SET_TEAMS, teams })

// THUNK CREATORS
export const exchangeTokenForAuth = () => {
  return dispatch => {
    const token = window.localStorage.getItem('token');
    if (!token) return;
    return axios.get('/api/auth', {
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

export const signup = (data, history) => {
  return (dispatch) => {
    const { email, password } = data;
    return axios.post('/api/users', data)
      .then(res => res.data)
      .then(() => history.push('/'))
  }
}

// get all teams
// export const getTeams = () => {
//   return dispatch => {
//     return axios.get('/api/teams')
//       .then(res => res.data)
//       .then(teams => dispatch(setTeams(teams)))
//   }
// }


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
      // .then(() => dispatch(exchangeTokenForAuth()))
  }
}

// joinTeam sends a user, teamName, and password as credentials
// a successful put request adds the user to the team and updates state
export const joinTeam = credentials => {
  return dispatch => {
    return axios.put('/api/users/team', credentials)
      .then(res => res.data)
      // .then(user => user.team.id)
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
    default:
      return state
  }
};

export default createStore(reducer, applyMiddleware(thunk, logger));
