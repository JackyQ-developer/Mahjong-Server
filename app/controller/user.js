'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.findByUsername(username);
    if (user === null) {
      ctx.body = {
        code: 50000,
        message: '查无此人'
      };
    } else if (user !== null && password !== user.password) {
      ctx.body = {
        code: 50000,
        message: '密码不对'
      };
    } else {
      ctx.body = {
        code: 20000,
        message: '登录成功',
        data: {
          token: user.id
        }
      };
    }
  }
}

module.exports = UserController;
