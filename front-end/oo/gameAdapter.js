class GameAdapter {
  constructor() {
  this.endPoint = 'http://localhost:3000/api/v1/games';
  // this.updateDiv = document.querySelector('#update');
  }

  getAllGames() {
    return fetch(this.endPoint)
    .then(res => res.json())
  }

  createGame(game) {
    return fetch(this.endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({api_v1_user: {game})
    })
    .then(resp => resp.json())
  }
}
