class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    User.all.push(this);
  }

  static findById(id) {
    return this.all.find(user => user.id === id);
  }

  static current() {

    return User.all.last;
  }

}

User.all = [];
