var imageCards = document.querySelectorAll(".parent");
var backCards = document.querySelectorAll(".back");

function randomizeCards(x) {
  var random = Math.floor(Math.random() * imageCards.length);
  x.style.order = random;
}
for (var i = 0; i < imageCards.length; i++) {
  randomizeCards(imageCards[i]);
}

var flippedCount = 0;
var flippedCards = [];
var matchingCardsElem = [];
var remainingCards = imageCards.length;
var startTime;
var endTime;

function flipCards(e) {
  // console.log(e.target.attributes.class.textContent);
  if (e.target.attributes.class.textContent === "back") {
    flippedCount++;
    e.target.style.display = "none";
    matchingCardsElem.push(e.target);
    flippedCards.push(e.target.alt);
    if (flippedCount < 3) {
      if (flippedCards[0] !== flippedCards[1]) {
        // console.log(flippedCards);
        // console.log(matchingCardsElem);
        // console.log("don't match");
      } else {
        // console.log(flippedCards);
        // console.log(matchingCardsElem);
        // console.log("match");
        matchingCardsElem[0].remove();
        matchingCardsElem[1].remove();
        remainingCards -= 2;
        // console.log(remainingCards);
      }
    } else {
      flippedCount = 0;
      flippedCards = [];
      matchingCardsElem = [];
      for (var k = 0; k < backCards.length; k++) {
        backCards[k].style.display = "block";
      }
    }
    if (remainingCards === 0) {
      var timeElapsed = Math.round((new Date() - startTime) / 1000);
      alert("You found all the animals in " + timeElapsed + " seconds!");
    }
  }
}

for (var j = 0; j < imageCards.length; j++) {
  startTime = new Date();
  imageCards[j].addEventListener("click", flipCards);
}
