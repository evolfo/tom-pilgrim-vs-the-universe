class UserAdapter {
  getAllUsers() {
    return readLocalRecords('users');
  }

  getOneUser(id) {
    return this.getAllUsers().find(user => user.id === id);
  }

  createUser(username) {
    const user = { id: createLocalId('user'), username, local: true };
    const users = this.getAllUsers();
    users.push(user);
    writeLocalRecords('users', users);
    return user;
  }
}
