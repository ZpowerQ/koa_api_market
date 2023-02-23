const path = require("path");
const Koa = require("koa");
const { koaBody } = require("koa-body");
const router = require("../router/index");
const koaStatic = require("koa-static");
const parameter = require("koa-parameter");
const app = new Koa();
app.use(
  koaBody({
    multipart: true,
    // 目录相对于process.cwd()
    formidable: {
      uploadDir: path.join(__dirname, "../upload"),
      keepExtensions: true,
    },
    parsedMethods: ["POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(koaStatic(path.join(__dirname, "../upload")));
// 参数校验需在使用路由前加入
app.use(parameter(app));
app.use(router.routes()).use(router.allowedMethods());
app.on("error", (err, ctx) => {
  ctx.status = err.status;
  ctx.body = err;
});
module.exports = app;
