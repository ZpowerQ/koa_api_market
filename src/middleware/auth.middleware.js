const jwt = require("jsonwebtoken");
const config = require("../config/config.default.js");
const errType = require("../constant/err.type.js");

// 验证token
const auth = async (ctx, next) => {
  const { authorization = "" } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  try {
    const user = jwt.verify(token, config.TOKEN_SECRET);
    ctx.state.user = user;
  } catch (error) {
    switch (error.name) {
      case "TokenExpiredError":
        console.error("用户token过期");
        return ctx.app.emit("error", errType.tokenExpiredError, ctx);
      case "JsonWebTokenError":
        console.error("用户token无效");
        return ctx.app.emit("error", errType.invalidToken, ctx);
    }
  }
  await next();
};

// 验证管理员权限
const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user;
  if (!is_admin) {
    console.error("该用户没有管理员权限", ctx.state.user.user_name);
    return ctx.app.emit("error", errType.hadNotAdminPermission, ctx);
  }
  await next();
};
module.exports = { auth, hadAdminPermission };
