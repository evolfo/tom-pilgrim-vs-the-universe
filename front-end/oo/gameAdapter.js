class GameAdapter {
  constructor() {
  this.endPoint = 'http://localhost:3000/api/v1/games';
  // this.updateDiv = document.querySelector('#update');
  }

  getAllGames() {
    return fetch(this.endPoint)
    .then(res => res.json())
  }

  createGame(userId) {
    return fetch(this.endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({api_v1_game: {user_id: userId, score: 0, victory: false}})
    })
    .then(resp => resp.json())
  }

  updateGame(id, score, victory) {
    return fetch(this.endPoint + `/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({api_v1_game: {score: score}})
    })
    .then(resp => resp.json())
  }
}
