function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function shuffleArray(array) {
    var shuffleArray = array.slice(0)
for (var i = shuffleArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = shuffleArray[i];
    shuffleArray[i] = shuffleArray[j];
    shuffleArray[j] = temp;
}
return(shuffleArray)
}

export {shuffleArray, getRandomInt}