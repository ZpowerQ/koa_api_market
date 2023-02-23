const { addressFormatError } = require("../constant/err.type");

const addressValidator = (rule) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rule);
    } catch (err) {
      addressFormatError.result = err;
      return ctx.app.emit("error", addressFormatError, ctx);
    }
    await next();
  };
};

module.exports = {
  addressValidator,
};
