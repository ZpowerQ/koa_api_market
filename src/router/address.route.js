const Router = require("koa-router");
const { auth } = require("../middleware/auth.middleware");
const { addressValidator } = require("../middleware/address.middleware");
const {
  create,
  findAll,
  update,
  remove,
  setDefault
} = require("../controller/address.controller");
const router = new Router({ prefix: "/address" });

router.post(
  "/",
  auth,
  addressValidator({
    consignee: "string",
    phone: { type: "string", format: /^1\d{10}$/ },
    address: "string",
  }),
  create
);

router.get("/getall", auth, findAll);

router.put(
  "/update/:id",
  auth,
  addressValidator({
    consignee: "string",
    phone: { type: "string", format: /^1\d{10}$/ },
    address: "string",
  }),
  update
);

router.delete("/delete/:id", auth, remove);

router.patch('/default/:id',auth,setDefault)
module.exports = router;
