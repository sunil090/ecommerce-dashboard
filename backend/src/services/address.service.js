// src/services/address.service.js
const { Address } = require("../models");


function normalizePayload(input = {}) {
  const payload = { ...input };

  // map incoming 'type' to model attribute 'addressType'
  if (payload.type !== undefined) {
    payload.addressType = payload.type;
    delete payload.type;
  }

  // Some clients may send snake_case or alternate names; map them if needed
  if (payload.zip && !payload.postalCode) {
    payload.postalCode = payload.zip;
    delete payload.zip;
  }

  // Keep only attributes that our model expects — optional but safer
  const allowed = [
    "customerId",
    "firstName",
    "lastName",
    "phone",
    "addressLine1",
    "addressLine2",
    "city",
    "state",
    "country",
    "postalCode",
    "label",
    "addressType",
    "isDefault",
    "company",
  ];

  const normalized = {};
  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      normalized[key] = payload[key];
    }
  }

  return normalized;
}

async function createAddress(payload) {
  // Normalize keys first
  const data = normalizePayload(payload);

  // required JS attribute names for model
  const requiredFields = ["customerId", "city", "state", "country", "postalCode", "firstName"];

  for (let field of requiredFields) {
    if (!data[field]) {
      throw new Error(`${field} is required`);
    }
  }

  // If setting isDefault, unset others for this customer
  if (data.isDefault) {
    await Address.update(
      { isDefault: false },
      { where: { customerId: data.customerId } }
    );
  }

  const address = await Address.create(data);
  return address;
}

async function listAddressesByCustomer(customerId, { page, limit, offset }) {
  const result = await Address.findAndCountAll({
    where: { customerId },
    limit,
    offset,
    order: [
      ["isDefault", "DESC"],
      ["createdAt", "DESC"],
    ],
  });
  return result;
}

async function getAddressById(id) {
  return Address.findByPk(id);
}

async function updateAddress(id, payload) {
  const address = await Address.findByPk(id);
  if (!address) return null;

  const data = normalizePayload(payload);

  if (data.isDefault) {
    // unset other addresses for this customer
    await Address.update({ isDefault: false }, { where: { customerId: address.customerId } });
  }

  // Assign and save only allowed fields
  Object.assign(address, data);
  await address.save();
  return address;
}

async function deleteAddress(id) {
  const count = await Address.destroy({ where: { id } });
  return count > 0;
}

module.exports = {
  createAddress,
  listAddressesByCustomer,
  getAddressById,
  updateAddress,
  deleteAddress,
};
