const Service = require('egg').Service;

class StatisticsService extends Service {
  async getStatisticsRecordList(query) {
    const results = await this.ctx.model.Record.findAll(query);
    let sum = 0, collect = 0, pay = 0;
    results.forEach(item => {
      if (item.money > 0) collect += item.money;
      if (item.money < 0) pay += item.money;
      sum += item.money;
    });
    return {
      total: results.length,
      sum,
      collect,
      pay
    };
  }

  async addRecord(Record) {
    const result = await this.ctx.model.Record.create(Record)
    return result;
  }
}

module.exports = StatisticsService;