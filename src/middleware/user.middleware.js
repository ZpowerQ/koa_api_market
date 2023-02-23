const userService = require("../service/user.service.js");
const errType = require("../constant/err.type.js");
const bcrypt = require("bcryptjs");
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // 判断参数是否为空
  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", errType.userFormateError, ctx);

    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // 判断用户是否存在
  try {
    const res = await userService.getUserInfo({ user_name });
    if (res) {
      ctx.app.emit("error", errType.userAlreadyExited, ctx);
      return;
    }
  } catch (error) {
    console.error("获取用户信息错误", error);
    ctx, app.emit("error", errType.userRegisterError, ctx);
    return;
  }

  await next();
};

const cryptPassword = async (ctx, next) => {
  // 密码加密
  const { password } = ctx.request.body;
  // 加盐加密
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;

  await next();
};

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  let res = null;
  // 验证用户是否存在
  try {
    res = await userService.getUserInfo({ user_name });

    if (!res) {
      console.error("用户不存在", { user_name });
      ctx.app.emit("error", errType.userDoesNotExit, ctx);
      return;
    }
  } catch (error) {
    console.error("用户登录失败", error);
    ctx.app.emit("error", errType.userLoginError, ctx);
    return;
  }
  // 验证密码是否正确
  if (!bcrypt.compareSync(password, res.password)) {
    console.error("密码错误");
    ctx.app.emit("error", errType.invalidPassword, ctx);
    return;
  }

  await next();
};
module.exports =  { userValidator, verifyUser, cryptPassword, verifyLogin };
