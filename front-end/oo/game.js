class Game {
  constructor(data) {
    this.id = data.id;
    this.score = data.score;
    this.victory = data.victory;
    this.user_id = data.user_id;
    Game.all.push(this);
  }

  static findById(id) {
    return this.all.find(game => game.id === id);
  }

  generateScoreHTML() {
    return `
      <li id="${this.id}">${this.score}</li>
    `
  }

}

Game.all = [];
