const Address = require("../model/address.model");
class AddressService {
  async createAddress(address) {
    return await Address.create(address);
  }
  async findAllAddress(user_id) {
    return await Address.findAll({
      attributes: ["id", "consignee", "phone", "address", "is_default"],
      where: { user_id },
    });
  }
  async updateAddress(id, address) {
    return await Address.update(address, { where: { id } });
  }

  async removeAddress(id) {
    return await Address.destroy({ where: { id } });
  }

  async setDefaultAddress(user_id, id) {
    await Address.update({ is_default: false }, { where: { user_id } });
    return await Address.update(
      { is_default: true },
      { where: { id, user_id } }
    );
  }
}

module.exports = new AddressService();
