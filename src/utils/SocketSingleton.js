import io from 'socket.io-client';

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
  }
}

export default SocketSingleton;
