var BREADS = ["Soft White", "Soft Brown", "Sub", "Crusty Roll"];
var FILLINGS = ["Bacon", "Sausage", "Egg", "Black Pudding", "Mushrooms", "Onions", "Veggie Sausage", "Cheese"];
var SLOT_HEIGHT = 233;



function Slots() {
  // Set the anthem audio
  this.anthem = new Audio("../audio/anthem-snippet.mp3");
  this.anthem.volume = .25;

  // Init slots
  this.setResult();
}



Slots.prototype.setResult = function() {
  // Generate the random result of the roll
  this.fillings = {
    bread: BREADS[Math.floor(Math.random()*BREADS.length)],
    fillingOne: FILLINGS[Math.floor(Math.random()*FILLINGS.length)],
    fillingTwo: FILLINGS[Math.floor(Math.random()*FILLINGS.length)],
    fillingThree: FILLINGS[Math.floor(Math.random()*FILLINGS.length)]
  }

  // Create the slot UI
  this.createSlots();
};



Slots.prototype.getResult = function() {
  // Return the fillings result to the client
  return this.fillings;
}



Slots.prototype.createSlots = function() {
  // Create a random assortment of breads for the UI
  var shuffledBreads = BREADS.slice();
  this.shuffleIngredients(shuffledBreads);

  // Do the same for each ingredient
  var shuffledFillings = FILLINGS.slice();
  this.shuffleIngredients(shuffledFillings);

  // Store a reference to the index of each result
  this.fillingIndexes = {
    bread:shuffledBreads.indexOf(this.fillings.bread),
    fillingOne: shuffledFillings.indexOf(this.fillings.fillingOne),
    fillingTwo: shuffledFillings.indexOf(this.fillings.fillingTwo),
    fillingThree: shuffledFillings.indexOf(this.fillings.fillingThree)
  }

  // Add the possible breads to the UI
  var size = shuffledBreads.length;
  var i = 0;
  for(; i < size; i++) {
    $('.slot-1').append('<li class="slot__item"><p>' + shuffledBreads[i] + '</p></li>');
  }

  // Add the possible fillings ti the UI
  size = shuffledFillings.length;
  i = 0;
  for(; i < size; i++) {
    $('.slot-2, .slot-3, .slot-4').append('<li class="slot__item"><p>' + shuffledFillings[i] + '</p></li>');
  }

  console.log(this.fillings);

  // Set the margin offsets for each item
  $('.slot-1').css('top', -((this.fillingIndexes.bread) % BREADS.length - 1) * SLOT_HEIGHT + 'px');
  $('.slot-2').css('top', -((this.fillingIndexes.fillingOne) % FILLINGS.length - 1) * SLOT_HEIGHT + 'px');
  $('.slot-3').css('top', -((this.fillingIndexes.fillingTwo) % FILLINGS.length - 1) * SLOT_HEIGHT + 'px');
  $('.slot-4').css('top', -((this.fillingIndexes.fillingThree) % FILLINGS.length - 1) * SLOT_HEIGHT + 'px');

  
};


Slots.prototype.animate = function() {
  $('.slot-1').css('top', -(this.fillingIndexes.bread) * SLOT_HEIGHT + 'px');
  $('.slot-2').css('top', -(this.fillingIndexes.fillingOne) * SLOT_HEIGHT + 'px');
  $('.slot-3').css('top', -(this.fillingIndexes.fillingTwo) * SLOT_HEIGHT + 'px');
  $('.slot-4').css('top', -(this.fillingIndexes.fillingThree) * SLOT_HEIGHT + 'px');
}



Slots.prototype.playSound = function() {
  this.anthem.play();
};



Slots.prototype.shuffleIngredients = function(ingredients) {
  // Create a random shuffle of ingredients
  var currentIndex = ingredients.length,
      temporaryValue,
      randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {

    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element
    temporaryValue = ingredients[currentIndex];
    ingredients[currentIndex] = ingredients[randomIndex];
    ingredients[randomIndex] = temporaryValue;
  }

  return ingredients;
};