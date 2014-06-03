function Client(server, port) {
  this.socket = io.connect(server + ':' + port);
  this.init();
  this.slots = new Slots();
}


Client.prototype.init = function() {
  var self = this;

  // When the client receives a new roll message
  this.socket.on('new-roll', function(data) {
    self.newRollFromServer(data);
  });

  // When the client clicks the begin roll button
  $('.roll-comrade').click(function() {
    self.beginRoll();
  });
};



Client.prototype.newRollFromServer = function(data) {
  // Some lucky person has rolled!
  this.slots.playSound();
};



Client.prototype.beginRoll = function() {
  // Start the slot animation
  var fillings = ['sausage', 'egg', 'bacon'];
  this.sendMessageToServer('new-roll', {fillings: fillings});
};



Client.prototype.sendMessageToServer = function(message, data) {
  // Send the given message to the server
  this.socket.emit(message, data);
};




