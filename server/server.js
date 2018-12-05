const app = require('./app');
const port = process.env.PORT || 3000;
const socketio = require('socket.io');

const { syncAndSeed } = require('./db');

syncAndSeed();

const server = app.listen(port, () => {
  console.log(`listening on port... ${port}`);
});

const io = socketio(server)

io.on('connection', socket => {
  console.log(`New connection with id=${socket.id}`)
  io.to(socket.id).emit('connect', { message: "connected" })

  socket.on('disconnect', msg => {
    console.log('Client disconnected')
    console.log(msg)
  })

  socket.on('gameComplete', ( game ) => {
    io.emit('completedGame', { message: "completion", game })
  })
})

module.exports = io;
