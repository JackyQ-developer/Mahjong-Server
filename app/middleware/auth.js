/**
 * @description 用户Token校验
 */

const user = require("../model/user");

module.exports = options => {
  return async function gzip(ctx, next) {
    const token = ctx.get('token');
    const whiteList = options.whiteList;
    if((token === null || token === '') && !whiteList.includes(ctx.path)) {
      ctx.body = {
        code: 50014,
        message: '请重新登录'
      };
    } else {
      await next();
    }
  };
};