const path = require("path");
const errType = require("../constant/err.type.js");
const {
  createGoods,
  updateGoods,
  removeGoods,
  restoreGoods,
  findGoods,
} = require("../service/goods.service");
class GoodsController {
  async upload(ctx, next) {
    const { file } = ctx.request.files;
    const fileType = ["image/jpeg", "image/png"];
    if (file) {
      ctx.body = {
        code: 0,
        message: "商品图片上传成功",
        result: {
          goods_img: path.basename(file.filepath),
        },
      };
    } else {
      return ctx.app.emit("error", errType.fileUploadError, ctx);
    }
  }

  async create(ctx) {
    try {
      const { createdAt, updatedAt, ...res } = await createGoods(
        ctx.request.body
      );

      ctx.body = {
        code: 0,
        message: "发布商品成功",
        result: res,
      };
    } catch (error) {
      console.error("上传商品信息失败", error);
      return ctx.app.emit("error", errType.publishGoodsError, ctx);
    }
  }

  async update(ctx) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: "修改商品信息成功",
          result: "",
        };
      } else {
        ctx.body = {
          code: 0,
          message: "修改失败,商品不存在",
          result: "",
        };
      }
    } catch (error) {
      console.error("更新商品信息失败", error);
      ctx.app.emit("error", errType.invalidGoodsID, ctx);
    }
  }

  async remove(ctx) {
    try {
      const res = await removeGoods(ctx.params.id);
      if (res) {
        ctx.body = {
          code: 0,
          message: "删除商品成功",
          result: "",
        };
      } else {
        ctx.app.emit("error", errType.invalidGoodsID, ctx);
      }
    } catch (error) {
      console.error("删除商品信息失败", error);
    }
  }

  async restore(ctx) {
    try {
      const res = await restoreGoods(ctx.params.id);
      if (res) {
        ctx.body = {
          code: 0,
          message: "商品上架成功",
          result: "",
        };
      } else {
        ctx.app.emit("error", errType.invalidGoodsID, ctx);
      }
    } catch (error) {
      console.error("商品上架失败", error);
    }
  }

  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    try {
      const res = await findGoods(pageNum, pageSize);
      ctx.body = {
        code: 0,
        message: "获取商品信息成功",
        ...res,
      };
    } catch (error) {
      console.error("获取商品信息失败", error);
    }
  }
}

module.exports = new GoodsController();
