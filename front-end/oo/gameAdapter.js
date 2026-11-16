class GameAdapter {
  async getAllGames() {
    const localGames = readLocalRecords('games');
    const baseUrl = window.GAME_API_BASE_URL;
    if (!baseUrl) {
      return localGames;
    }

    try {
      const response = await fetch(`${baseUrl}/api/v1/leaderboard`, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(2500)
      });
      if (!response.ok) {
        return localGames;
      }

      const data = await response.json();
      const sharedGames = (data.players || []).map(player => ({
        id: `shared-${player.username_key}`,
        user_id: `shared-${player.username_key}`,
        score: player.score,
        victory: Boolean(player.victory),
        attempts: player.attempts,
        shared: true,
        user: { id: `shared-${player.username_key}`, username: player.username }
      }));

      return sharedGames.concat(localGames.filter(game => !game.synced));
    } catch (_error) {
      return localGames;
    }
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
    const games = readLocalRecords('games');
    games.push(game);
    writeLocalRecords('games', games);
    return game;
  }

  updateGame(id, score, victory) {
    const games = readLocalRecords('games');
    const game = games.find(record => record.id === id);
    if (!game) {
      return null;
    }

    game.score = score;
    game.victory = victory;
    writeLocalRecords('games', games);

    if (window.GAME_API_BASE_URL && game.user && game.user.username && !game.synced && !game.syncing) {
      game.syncing = true;
      fetch(`${window.GAME_API_BASE_URL}/api/v1/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: game.user.username, score, victory }),
        signal: AbortSignal.timeout(3000)
      }).then(response => {
        if (!response.ok) {
          throw new Error('Shared score request failed.');
        }

        game.synced = true;
        delete game.syncing;
        writeLocalRecords('games', games);
        window.dispatchEvent(new Event('scores:updated'));
      }).catch(() => {
        delete game.syncing;
        writeLocalRecords('games', games);
      });
    }

    return game;
  }
}
