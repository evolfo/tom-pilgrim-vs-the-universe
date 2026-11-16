class Game {
  constructor(data) {
    this.id = data.id;
    this.score = data.score;
    this.victory = data.victory;
    this.user_id = data.user_id;
    this.attempts = data.attempts;
    this.shared = data.shared === true;
    this.user = data.user || { username: 'Player' };
    Game.all.push(this);
  }

  static findById(id) {
    return this.all.find(game => game.id === id);
  }

  static generateScoreHTML(userScoresUL) {
    userScoresUL.replaceChildren();
    const gamesByUser = new Map();
    const sortedGames = [...Game.all].sort((a, b) => b.score - a.score);

    sortedGames.forEach(game => {
      const username = (game.user.username || 'Player').trim().toLocaleLowerCase();
      const entry = gamesByUser.get(username);
      if (entry) {
        entry.gamesPlayed += Number(game.attempts) || 1;
      } else {
        gamesByUser.set(username, { game, gamesPlayed: Number(game.attempts) || 1 });
      }
    });

    const rankColors = ['#f7c25a', 'silver', '#906717'];
    [...gamesByUser.values()].slice(0, 8).forEach(({ game, gamesPlayed }, index) => {
      const listItem = document.createElement('li');
      const username = document.createElement('span');
      username.className = 'username';
      username.textContent = game.user.username || 'Player';
      if (rankColors[index]) {
        username.style.color = rankColors[index];
      }

      listItem.append(username, document.createTextNode(` - ${game.score} `));
      listItem.append(document.createElement('br'));
      listItem.append(document.createTextNode(`Attempts: ${gamesPlayed}`));
      userScoresUL.append(listItem);
    });
  }

}

Game.all = [];
