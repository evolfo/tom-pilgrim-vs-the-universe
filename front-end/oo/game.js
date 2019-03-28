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

  static generateScoreHTML(userScoresUL) {
    userScoresUL.innerHTML = "";

    const sortedGames = Game.all.sort((a, b) => {
      return b.score - a.score
    });
    let displayedUsers = [];
    // debugger
    for(let i = 0; i < 11; i++) {
      if( i < sortedGames.length && !displayedUsers.includes(sortedGames[i].user_id)){

        userScoresUL.innerHTML += `<li id="${sortedGames[i].id}">${sortedGames[i].user.username} - ${sortedGames[i].score}</li>`
        displayedUsers.push(sortedGames[i].user_id);
      }
    }
  }

}

Game.all = [];
