function pickRandomElement(array) {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}

function getRandomCard() {
    const values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
    return {value: pickRandomElement(values), suit: pickRandomElement(suits)};
}