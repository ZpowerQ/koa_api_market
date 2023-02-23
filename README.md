# koa_api_market
一个基于node.js开发的商城API

**技术栈：**koa、koa-router、koa-body、koa-parameter、koa-static、mysql2、sequelize、jsonwebtoken、dotenv、bcrypt.js

**项目配置：**

在.env中进行项目配置，因使用了dotenv，在.env配置的参数会挂载到process.env中

**表创建：**

在model目录的所有文件，都有一行创建表的代码，如在user.model.js中有User.sync({force:true}),意思为若数据库中存在表，则将表删除并重新创建，在第一次运行项目时可解除注释，再次运行时需注释、否则会将原有的表数据删除

**依赖下载：**

```
npm install
```

**项目启动：**

```
npm install nodemon -g
```

```
npm run dev
```

