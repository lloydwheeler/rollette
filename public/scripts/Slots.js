function Slots() {
  
}


Slots.prototype.playSound = function() {
  var anthem = new Audio("../audio/anthem-snippet.mp3");
  anthem.volume = .25;
  anthem.play();
}
