import socketio from 'socket.io-client';

const socket = socketio('ws://192.168.0.7:3333', {
  autoConnect: false,
});

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs,
  };

  socket.connect();
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

function listen(message, callback) {
  socket.on(message, callback);
}

export {
  connect,
  disconnect,
  listen
}