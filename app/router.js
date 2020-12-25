'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.user.login);
  router.get('/record/list', controller.record.getRecordList);
  router.post('/record', controller.record.addRecord);
};
