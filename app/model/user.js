'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(255),
    password: STRING(255)
  });

  User.findByLogin = async function(login) {
    return await this.findOne({
      where: login
    });
  }

  return User;
};