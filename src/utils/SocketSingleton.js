import io from 'socket.io-client';
import store, { addGame } from '../store';

let conn = null;

class SocketSingleton {
  constructor() {
    if (!conn) {
      conn = io(window.location.origin);
    }
    this.conn = conn;

    conn.on('connect', () => {
      console.log("Two-way connection!")
    })

    conn.on('completedGame', ({ message, game }) => {
      console.log(message);
      store.dispatch(addGame(game));
    });
  }
}

export default SocketSingleton;
