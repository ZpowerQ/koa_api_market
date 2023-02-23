const Router = require("koa-router");
const {
  register,
  login,
  verifyAuth,
  changePassword,
} = require("../controller/user.controller");
const {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
} = require("../middleware/user.middleware.js") ;
const { auth } = require("../middleware/auth.middleware.js");
const router = new Router({ prefix: "/users" });

router.post("/register", userValidator, verifyUser, cryptPassword, register);
router.post("/login", userValidator, verifyLogin, login);
router.post("/", auth, verifyAuth);
router.patch("/updatepwd", auth, cryptPassword);
module.exports = router;
