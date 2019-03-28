class Game {
  constructor(data) {
    this.id = data.id;
    this.score = data.score;
    this.victory = data.victory;
    this.user_id = data.user_id;
    this.user = data.user;
    Game.all.push(this);
  }

  static findById(id) {
    return this.all.find(game => game.id === id);
  }

  static generateScoreHTML(sortedGames, userScoresUL) {
    userScoresUL.innerHTML = "";

    for(let i = 0; i < 11; i++) {
      let newGame = sortedGames[i];
      userScoresUL.innerHTML += `
        <li id="${newGame.id}">${newGame.user.username} - ${newGame.score}</li>
      `
    }
  }

}

Game.all = [];
