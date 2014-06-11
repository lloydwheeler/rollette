function Client(server, port) {  
  this.slots = new Slots();
  this.socket = io.connect(server + ':' + port);
  this.init();
}


Client.prototype.init = function() {
  var self = this;

  // When the client receives a new roll message
  this.socket.on('new-roll', function(data) {
    self.newRollFromServer(data);
  });

  // When the client clicks the begin roll button
  $('.roll-comrade').click(function() {
    if(!$(this).hasClass('disabled')) {
      self.beginRoll();
    }
  });
};



Client.prototype.newRollFromServer = function(data) {
  // Some lucky person has rolled!
  // this.slots.playSound();
  this.showNotification(this.parseMessage("Someone rolled a ", data.data.fillings));
};



Client.prototype.beginRoll = function() {
  var self = this;
  // Set and get a new filling result
  var fillings = this.slots.getResult();
 
  // Disable the roll button until the slots have animated
  $('.roll-comrade').addClass('disabled');
  setTimeout(function() {
    $('.roll-comrade').removeClass('disabled');
  }, 3000);
  

  // Send the result to the server to broadcast to other clients
  this.slots.draw();
  $('.roll-result-wrapper').addClass('show');
  $('.roll-wrapper').addClass('hide');
  $('.roll-result').html(this.parseMessage("Enjoy your ", fillings));
  // this.slots.playSound();

  this.sendMessageToServer('new-roll', {fillings: fillings});
  setTimeout(function() {
    self.slots.playSound();
    $.get( "tweet?tweet=" + self.parseMessage("Someone rolled a ", fillings));
  }, 500);




  $('.order-comrade').addClass('show').attr('href', 'mailto:lloyd.wheeler@sequence.co.uk?&subject=' + "Roll Order" + '&body=' + this.parseMessage("I rolled a ", fillings));




};



Client.prototype.sendMessageToServer = function(message, data) {
  // Send the given message to the server
  this.socket.emit(message, data);
};



Client.prototype.showNotification = function(message) {
  $('.notification').html('<p>' + message + '</p>').addClass('show');
  setTimeout(function() {
    $('.notification').removeClass('show');
  }, 7000);
};



Client.prototype.parseMessage = function(prefix, data) {
  var fillings = data;
  var message = prefix;
  message += fillings.bread + " "
  message += "with " + fillings.fillingOne + ", " + fillings.fillingTwo + " and " + fillings.fillingThree;

  return message;
};

