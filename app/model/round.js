'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const Round = app.model.define('round', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: INTEGER }
  });

  return Round;
};