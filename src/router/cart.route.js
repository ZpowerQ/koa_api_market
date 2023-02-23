const Router = require("koa-router");
const { auth } = require("../middleware/auth.middleware");
const { cartValidator } = require("../middleware/cart.middleware");
const {
  add,
  findAll,
  update,
  remove,
  selectAll,
} = require("../controller/cart.controller");
const router = new Router({ prefix: "/cart" });

router.post("/add", auth, cartValidator({ goods_id: "number" }), add);

router.get("/", auth, findAll);

router.patch(
  "/:id",
  auth,
  cartValidator({
    number: { type: "number", required: false },
    selected: { type: "bool", required: false },
  }),
  update
);

router.delete("/delete", auth, cartValidator({ ids: "array" }), remove);

router.post("/selectAll", auth, cartValidator({ selected: "bool" }), selectAll);

module.exports = router;
