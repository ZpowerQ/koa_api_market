const {orderFormatError} = require('../constant/err.type')
const orderValidator = (rule) =>{
  return async (ctx,next) =>{
    try {
      ctx.verifyParams(rule)
    } catch (error) {
      console.error("订单参数错误",error);
      orderFormatError.result = error
      return ctx.app.emit('error',orderFormatError,ctx)
    }
    await next()
  }
}

module.exports = {
  orderValidator
}