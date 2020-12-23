const Service = require('egg').Service;

class UserService extends Service {
  async findByUsername(username) {
    const user = await this.ctx.model.User.findOne({
      where:{
        username: username
      }
    })
    return user;
  }
}

module.exports = UserService;