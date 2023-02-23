const {
  createOrder,
  findAllOrder,
  updateOrder,
} = require("../service/order.service");
const { getAllOrderError, updateOrderError } = require("../constant/err.type");
class OrderController {
  async create(ctx) {
    const user_id = ctx.state.user.id;
    console.log(user_id);
    const { address_id, goods_info, total } = ctx.request.body;
    const order_number = "ZD" + Date.now();
    const res = await createOrder({
      user_id,
      address_id,
      goods_info,
      total,
      order_number,
    });
    ctx.body = {
      code: 0,
      message: "添加订单成功",
      result: res,
    };
  }
  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10, status = 0 } = ctx.request.query;

    try {
      const res = await findAllOrder(pageNum, pageSize, status);

      ctx.body = {
        code: 0,
        message: "获取订单列表成功",
        result: res,
      };
    } catch (error) {
      console.error("获取订单列表失败", error);
      ctx.app.emit("error", getAllOrderError, ctx);
    }
  }

  async update(ctx) {
    const id = ctx.request.params.id;
    const { status } = ctx.request.body;

    try {
      const res = await updateOrder(id, status);

      ctx.body = {
        code: 0,
        message: "更新订单状态成功",
        result: res,
      };
    } catch (error) {
      console.error("更新订单状态失败", error);
      ctx.app.emit("error", updateOrderError, ctx);
    }
  }
}

module.exports = new OrderController();
