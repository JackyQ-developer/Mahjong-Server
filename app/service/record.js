const Service = require('egg').Service;

class RecordService extends Service {
  async getRecordList(query) {
    const result = await this.ctx.model.Record.findAll(query)
    return result;
  }

  async addRecord(Record) {
    const result = await this.ctx.model.Record.create(Record)
    return result;
  }
}

module.exports = RecordService;