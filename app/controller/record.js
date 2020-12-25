'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class RecordController extends Controller {
  async getRecordList() {
    const { ctx } = this;
    const user_id = ctx.get('token');
    const query = {
      where: {
        user_id: toInt(user_id)
      },
      limit: toInt(ctx.query.limit),
      offset: (ctx.query.page - 1) * ctx.query.limit
    };
    const items = await ctx.service.record.getRecordList(query);
    const total = await ctx.model.Record.count();
    ctx.body = {
      code: 20000,
      message: 'success',
      data: {
        items,
        total
      }
    };
  }

  async addRecord() {
    const { ctx } = this;
    const { money, type } = ctx.request.body;
    const user_id = ctx.get('token');
    const res = await ctx.service.record.addRecord({ money, type, user_id });
    console.log(res)
    ctx.body = {
      code: 20000,
      message: 'success'
    };
  }
}

module.exports = RecordController;
