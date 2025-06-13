module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 Socket connected:', socket.id);
    // Emergency contact join room by phone number
    socket.on('emergency-join', (phoneNumber) => {
      if (phoneNumber) {
        socket.join(`emergency-${phoneNumber}`);
        console.log('Emergency contact joined:', phoneNumber);
      }
    });
    socket.on('ping', () => {
      socket.emit('pong');
    });
  });
  // Expose emit function for emergency notification
  io.notifyEmergencyContact = (phoneNumber, payload) => {
    io.to(`emergency-${phoneNumber}`).emit('emergency-help-report', payload);
  };
};
