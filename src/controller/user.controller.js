const {
  createUser,
  getUserInfo,
  updateById,
} = require("../service/user.service.js");
const jwt = require("jsonwebtoken");
const errType = require("../constant/err.type.js");
const config = require("../config/config.default.js");
class UserController {
  async register(ctx, next) {
    // 获取参数
    const { user_name, password } = ctx.request.body;

    // 操作数据库
    try {
      const res = await createUser(user_name, password);
      ctx.body = {
        code: 0,
        message: "用户注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (error) {
      console.error(error);
      ctx.app.emit("error", errType.userRegisterError, ctx);
    }
  }
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    try {
      const { password, ...rest } = await getUserInfo({ user_name });
      ctx.body = {
        code: 0,
        message: "用户登录成功",
        result: {
          token: jwt.sign(rest, config.TOKEN_SECRET, { expiresIn: "10d" }),
        },
      };
    } catch (err) {
      console.error("用户登录失败", error);
      ctx.app.emit("error", errType.userLoginError, ctx);
    }
  }
  async verifyAuth(ctx, next) {
    const user = ctx.state.user;
    if (user) {
      ctx.body = user;
    }
  }
  async changePassword(ctx, next) {
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    try {
      const res = await updateById(id, { password });
      if (res) {
        ctx.body = {
          code: 0,
          message: "修改密码成功",
          result: "",
        };
      }
    } catch (error) {
      console.error("修改密码失败");
      ctx.app.emit("error", errType.updatePwdError, ctx);
    }
  }
}

module.exports = new UserController();
