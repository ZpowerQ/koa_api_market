const { cartFormatError } = require("../constant/err.type");
const cartValidator = (rule) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rule);
    } catch (error) {
      cartFormatError.result = error;
      return ctx.app.emit("error", cartFormatError, ctx);
    }
    await next();
  };
};

module.exports = {
  cartValidator,
};
