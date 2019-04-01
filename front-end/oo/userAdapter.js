class UserAdapter {
  constructor() {
  this.endPoint = 'https://strawberry-tart-52843.herokuapp.com/api/v1/users';
  // this.updateDiv = document.querySelector('#update');
  }

  getAllUsers() {
    return fetch(this.endPoint)
    .then(res => res.json())
  }

  getOneUser(id) {
    return fetch(this.endPoint + `/${id}`)
    .then(res => res.json())
  }

  createUser(username) {
    return fetch(this.endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({api_v1_user: {username: username}})
    })
    .then(resp => resp.json())
  }
}
