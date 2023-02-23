const {
  createAddress,
  findAllAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
} = require("../service/address.service");
const {
  getAllAddressError,
  updateAddressError,
  deleteAddressError,
} = require("../constant/err.type");
class AddressController {
  async create(ctx) {
    const user_id = ctx.state.user.id;

    const { consignee, phone, address } = ctx.request.body;

    try {
      const res = await createAddress({ user_id, consignee, phone, address });
      ctx.body = {
        code: 0,
        message: "添加地址成功",
        result: res,
      };
    } catch (error) {
      console.error("添加地址失败", error);
    }
  }
  async findAll(ctx) {
    const user_id = ctx.state.user.id;

    try {
      const res = await findAllAddress(user_id);
      ctx.body = {
        code: 0,
        message: "获取地址列表成功",
        result: res,
      };
    } catch (error) {
      console.error("获取地址列表失败", error);
      ctx.app.emit("error", getAllAddressError, ctx);
    }
  }

  async update(ctx) {
    const { id } = ctx.request.params;
    try {
      const res = await updateAddress(id, ctx.request.body);
      ctx.body = {
        code: 0,
        message: "更新地址成功",
        result: res,
      };
    } catch (error) {
      console.error("更新地址信息失败", error);
      ctx.app.emit("error", updateAddressError, ctx);
    }
  }

  async remove(ctx) {
    const id = ctx.request.params.id;

    try {
      const res = await removeAddress(id);

      ctx.body = {
        code: 0,
        message: "删除地址成功",
        result: res,
      };
    } catch (error) {
      console.error("删除地址失败", error);
      return ctx.app.emit("error", deleteAddressError, ctx);
    }
  }

  async setDefault(ctx) {
    const user_id = ctx.state.user.id;
    const id = ctx.request.params.id;

    try {
      const res = await setDefaultAddress(user_id, id);

      ctx.body = {
        code: 0,
        message: "设置默认地址成功",
        result: res,
      };
    } catch (error) {
      console.error("设置默认地址失败", error);
    }
  }
}

module.exports = new AddressController();
