const Router = require("koa-router");
const {
  upload,
  create,
  update,
  remove,
  restore,
  findAll,
} = require("../controller/goods.controller.js");
const { goodsValidator } = require("../middleware/goods.middleware");
const {
  auth,
  hadAdminPermission,
} = require("../middleware/auth.middleware.js");
const { route } = require("./user.route.js");
const router = new Router({ prefix: "/goods" });

// 商品图片上传
router.post("/uploadimg", auth, hadAdminPermission, upload);
// 发布商品接口
router.post("/uploadmsg", auth, hadAdminPermission, goodsValidator, create);

router.put("/update/:id", auth, hadAdminPermission, update);
// 商品下架
router.post("/:id/off", auth, hadAdminPermission, remove);
// 商品上架
router.post("/:id/on", auth, hadAdminPermission, restore);
// 获取商品列表
router.get("/", findAll);

module.exports = router;
