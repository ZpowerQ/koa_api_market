const app = require("./app/index.js") ;
const { APP_PORT }  = require("./config/config.default.js") ;


app.listen(APP_PORT, () => {
  console.log(`servr is running on http://localhost:${APP_PORT}`);
});
