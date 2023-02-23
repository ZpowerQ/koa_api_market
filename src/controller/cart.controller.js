const {
  createOrUpdate,
  findCarts,
  updateCarts,
  removeCarts,
  selectAllCarts,
} = require("../service/cart.service");
const errType = require("../constant/err.type");
const { cartFormatError } = require("../constant/err.type");
class CartController {
  async add(ctx) {
    const user_id = ctx.state.user.id;
    const goods_id = ctx.request.body.goods_id;
    try {
      const res = await createOrUpdate(user_id, goods_id);
      ctx.body = {
        code: 0,
        messgae: "成功添加商品到购物车",
        result: res,
      };
    } catch (error) {
      console.error("添加商品到购物车失败", error);
      ctx.app.emit("error", errType.addGoodsToCartError, ctx);
    }
  }

  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    try {
      const res = await findCarts(pageNum, pageSize);
      ctx.body = {
        code: 0,
        message: "获取购物车商品成功",
        result: res,
      };
    } catch (error) {
      console.error("获取购物车商品失败");
      ctx.app.emit("error", errType.getCartGoodsError, ctx);
    }
  }

  async update(ctx) {
    const { id } = ctx.request.params;
    const { number, selected } = ctx.request.body;
    if (number === undefined && selected === undefined) {
      return ctx.app.emit("error", cartFormatError, ctx);
    }

    const res = await updateCarts({ id, number, selected });

    ctx.body = {
      code: 0,
      message: "更新购物车信息成功",
      result: res,
    };
  }

  async remove(ctx) {
    const { ids } = ctx.request.body;

    try {
      const res = await removeCarts(ids);

      ctx.body = {
        code: 0,
        message: "删除购物车信息成功",
        result: res,
      };
    } catch (error) {
      console.error("删除购物车信息失败", error);
      ctx.app.emit("error", errType.deleteCartsError, ctx);
    }
  }

  async selectAll(ctx) {
    const user_id = ctx.state.user.id;
    const condition = ctx.request.body;
    const res = await selectAllCarts(user_id, condition);

    ctx.body = {
      code: 0,
      message: "成功更新商品选择状态",
      result: res,
    };
  }
}

module.exports = new CartController();
