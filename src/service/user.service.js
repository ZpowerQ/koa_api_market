const User = require("../model/user.model.js") ;
class UserService {
  async createUser(user_name, password) {
    const res = await User.create({ user_name, password });
    return res;
  }
  async getUserInfo(condition) {
    const res = await User.findOne({
      attributes: ["id", "user_name", "password", "is_admin"],
      where: condition,
    });
    return res ? res.dataValues : null;
  }
  async updateById(id, condition) {
    const res = await User.update(condition, { where: { id } });
    return res[0]>0 ? true : false;
  }
}

module.exports =  new UserService();
