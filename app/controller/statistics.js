'use strict';

// const { Op } = require("egg-sequelize");
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class StatisticsController extends Controller {
  /**
   * @description 获取流水统计数据
   */
  async getStatisticsRecord() {
    const { ctx } = this;
    const user_id = toInt(ctx.get('token'));
    const datetime = ctx.query.datetime;
    const { Op } = ctx.app.Sequelize;
    const query = {
      where: {
        user_id: user_id,
        created_at: {
          [Op.gt]: new Date(datetime),
          [Op.lt]: new Date()
        }
      }
    };
    const res = await ctx.service.statistics.getStatisticsRecordList(query);
    ctx.body = {
      code: 20000,
      message: 'success',
      data: res
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

module.exports = StatisticsController;
