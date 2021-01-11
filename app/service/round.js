const Service = require('egg').Service;

class RoundService extends Service {
  async getRoundList(query) {
    const result = await this.ctx.model.Round.findAll(query)
    return result;
  }

  async addRound(Round) {
    const result = await this.ctx.model.Round.create(Round)
    return result;
  }
}

module.exports = RoundService;