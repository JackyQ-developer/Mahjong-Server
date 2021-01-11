'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Record = app.model.define('record', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    money: INTEGER(255),
    type: INTEGER(255),
    user_id: INTEGER(255),
    round_id: INTEGER(255),
  });

  return Record;
};