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
    const { Op } = ctx.app.Sequelize;
    const user_id = ctx.get('token');
    const startTime = ctx.query.startTime;
    const endTime = ctx.query.endTime;
    console.log(startTime, endTime)
    const query = {
      where: {
        user_id: toInt(user_id),
        created_at: {
          [Op.gt]: startTime,
          [Op.lte]: endTime
        }
      },
      limit: toInt(ctx.query.limit),
      offset: (ctx.query.page - 1) * ctx.query.limit
    };
    const items = await ctx.service.record.getRecordList(query);
    const total = await ctx.model.Record.count(query);
    console.log(items)
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
    const moment = require('moment');
    const { ctx } = this;
    const { Op } = ctx.app.Sequelize;
    const { money, type } = ctx.request.body;
    const user_id = ctx.get('token');

    const query = {
      where: {
        user_id: toInt(user_id),
        created_at: {
          [Op.gt]: moment().subtract(5, 'minutes').utc(),
          [Op.lte]: moment().utc()
        }
      }
    };
    const items = await ctx.service.round.getRoundList(query);
    if (items.length === 0) {
      const res = await ctx.service.round.addRound({ user_id });
      const round_id = res.id;
      await ctx.service.record.addRecord({ money, type, user_id, round_id });
      ctx.body = {
        code: 20000,
        message: 'success'
      };
    } else if (items.length === 1) {
      const round_id = items[0].id;
      const res = await ctx.service.record.addRecord({ money, type, user_id, round_id });
      ctx.body = {
        code: 20000,
        message: 'success'
      };
    } else {
      ctx.body = {
        code: 50000,
        message: '五分钟之内不止一局'
      };
    }
  }
}

module.exports = RecordController;
