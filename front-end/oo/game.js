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
    let sortedGames = Game.all;

    sortedGames = sortedGames.sort((a, b) => {
      return b.score - a.score
    });

    let allUserIds = [];
    let uniqueArray = [];

    sortedGames.forEach((game) => {
      if(!allUserIds.includes(game.user_id)){
        allUserIds.push(game.user_id);
        uniqueArray.push(game);
      }
    })


    let createdUser = [];
    for(let i = 0; i < 10; i++) {
      if( i < uniqueArray.length ){

        userScoresUL.innerHTML += `<li id="${uniqueArray[i].user_id}">${uniqueArray[i].user.username} - ${uniqueArray[i].score}</li>`


      }
    }
  }

}

Game.all = [];
