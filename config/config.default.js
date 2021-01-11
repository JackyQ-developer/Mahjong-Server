/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1608704637124_4503';

  // add your middleware config here
  config.middleware = [ 'auth' ];

  // cros
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  // mysql
  config.sequelize = {
    dialect: 'mariadb',
    // host: '192.168.31.80',
    host: '172.16.3.106',
    port: 3306,
    database: 'mahjong',
    username: 'jackyq',
    password: 'xiaowo12',
    query: {
      raw: true,
      underscored: true //列名驼峰转下划线
    },
    timezone: '+08:00'
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    auth: {
      whiteList: [ '/login' ]
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
