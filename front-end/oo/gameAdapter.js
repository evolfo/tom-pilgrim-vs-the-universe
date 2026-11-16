class GameAdapter {
  getAllGames() {
    return readLocalRecords('games');
  }

  createGame(userId) {
    const user = User.findById(userId) || User.all[User.all.length - 1];
    const game = {
      id: createLocalId('game'),
      user_id: user ? user.id : userId,
      score: 0,
      victory: false,
      user: user ? { id: user.id, username: user.username } : { id: userId, username: 'Player' }
    };
    const games = this.getAllGames();
    games.push(game);
    writeLocalRecords('games', games);
    return game;
  }

  updateGame(id, score, victory) {
    const games = this.getAllGames();
    const game = games.find(record => record.id === id);
    if (!game) {
      return null;
    }

    game.score = score;
    game.victory = victory;
    writeLocalRecords('games', games);
    return game;
  }
}
