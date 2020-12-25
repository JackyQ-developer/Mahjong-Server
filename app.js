module.exports = app => {
  app.beforeStart(async function () {
    console.log('APP初始化')
    await app.model.sync();
  });
}