const { Op } = require("sequelize");
const Cart = require("../model/cart.model");
const Goods = require("../model/goods.model");
class CartService {
  async createOrUpdate(user_id, goods_id) {
    // 查找购物车是否有该商品
    const res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id,
        },
      },
    });
    if (res) {
      // 若有记录则数量加一
      await res.increment("number");
      return await res.reload();
    } else {
      return await Cart.create({ user_id, goods_id });
    }
  }

  async findCarts(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize;
    const limit = pageSize * 1;
    const { count, rows } = await Cart.findAndCountAll({
      attributes: ["id", "number", "selected"],
      offset,
      limit,
      include: {
        model: Goods,
        as: "goods_info",
        attributes: ["id", "goods_name", "goods_price", "goods_img"],
      },
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }

  async updateCarts(params) {
    const { id, number, selected } = params;
    const res = await Cart.findByPk(id);

    if (!res) return "无该条数据";
    number != undefined ? (res.number = number) : "";
    selected != undefined ? (res.selected = selected) : "";

    return await res.save();
  }

  async removeCarts(ids) {
    const res = await Cart.destroy({ where: { id: { [Op.in]: ids } } });
    return res;
  }

  async selectAllCarts(user_id, condition) {
    const res = await Cart.update(condition, { where: { user_id } });
    return res;
  }
}

module.exports = new CartService();
