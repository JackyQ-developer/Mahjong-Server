module.exports = app => {
  app.beforeStart(async function () {
    console.log('APP初始化')
    const cls = require('cls-hooked');
    const namespace = cls.createNamespace('my-very-own-namespace');
    app.Sequelize.useCLS(namespace);
    await app.model.sync();
  });
}