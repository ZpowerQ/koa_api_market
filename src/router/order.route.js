const Router = require("koa-router");
const { auth } = require("../middleware/auth.middleware");
const { orderValidator } = require("../middleware/order.middleware");
const { create, findAll, update } = require("../controller/order.controller");
const router = new Router({ prefix: "/order" });

router.post(
  "/add",
  auth,
  orderValidator({
    address_id: "int",
    goods_info: "string",
    total: "string",
  }),
  create
);

router.get("/getAll", auth, findAll);

router.patch(
  "/update/:id",
  auth,
  orderValidator({
    status: "number",
  }),
  update
);
module.exports = router;
