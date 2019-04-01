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

  static generateScoreHTML(userScoresUL, user) {
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
        game.gamesPlayed = 1;
        uniqueArray.push(game);
      } else {
        uniqueArray.forEach(uniqueGame => {
          if (uniqueGame.user_id === game.user_id) {
            uniqueGame.gamesPlayed++;
          }
        })
      }
    });

    for(let i = 0; i < 8; i++) {
      if( i < uniqueArray.length ){
        userScoresUL.innerHTML += `<li id="${uniqueArray[i].user_id}"><span class="username">${uniqueArray[i].user.username}</span> - ${uniqueArray[i].score} <br> Attempts: ${uniqueArray[i].gamesPlayed} </li>`
      }
    };

    document.querySelector('.username').style.color = "#f7c25a";
    document.querySelectorAll('.username')[1].style.color = "silver";
    document.querySelectorAll('.username')[2].style.color = "#906717";
  }

}

Game.all = [];
