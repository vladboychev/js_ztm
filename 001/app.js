let highScore = 1450;
let userScore = 1200;

if (userScore >= highScore) {
    console.log(`Congratulations! You have the new high score of ${userScore}!`);
    highScore = userScore;
}
else {
    console.log(`Good game! You have to work out a lot to beat the high score of ${highScore}!`);
}