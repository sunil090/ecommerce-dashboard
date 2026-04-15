// - addresses can be managed by owner (customer) OR by admin/permission holders

const ApiError = require("../utils/apiError")
const { Address } = require("../models")
const { hasAccess } = require("./authorization.middleware")

// helper: compare the current user.customerId to a param
function isSelfByCustomerParam(req, paramName = "customerId") {
  const userCustomerId = req.user && (req.user.customerId ?? req.user.id)
  const paramVal = req.params[paramName]
  return userCustomerId && String(userCustomerId) === String(paramVal)
}

// helper: compare req.user.customerId to body.customerId (for POST create)
function isSelfByCustomerBody(req) {
  const userCustomerId = req.user && (req.user.customerId ?? req.user.id)
  const bodyCustomerId = req.body && req.body.customerId
  return userCustomerId && bodyCustomerId && String(userCustomerId) === String(bodyCustomerId)
}

async function isOwnerOfAddress(req) {
  const id = req.params.id
  const address = await Address.findByPk(id)
  if (!address) throw new ApiError(404, "Address not found")
  const userCustomerId = req.user && (req.user.customerId ?? req.user.id)
  return userCustomerId && String(userCustomerId) === String(address.customerId)
}

// POST /addresses
const canCreateAddress = async (req, res, next) => {
  try {
    // admin or permission OR owner (body.customerId)
    if (await hasAccess(req, { roles: ["admin"], permissions: ["address:create"] })) return next()
    if (isSelfByCustomerBody(req)) return next()
    return next(new ApiError(403, "Forbidden"))
  } catch (e) {
    return next(e)
  }
}

// GET /addresses/customer/:customerId
const canListAddressesByCustomer = async (req, res, next) => {
  try {
    if (await hasAccess(req, { roles: ["admin"], permissions: ["address:read"] })) return next()
    if (isSelfByCustomerParam(req, "customerId")) return next()
    return next(new ApiError(403, "Forbidden"))
  } catch (e) {
    return next(e)
  }
}

// GET /addresses/:id
const canReadAddressById = async (req, res, next) => {
  try {
    if (await hasAccess(req, { roles: ["admin"], permissions: ["address:read"] })) return next()
    if (await isOwnerOfAddress(req)) return next()
    return next(new ApiError(403, "Forbidden"))
  } catch (e) {
    return next(e)
  }
}

// PUT /addresses/:id
const canUpdateAddressById = async (req, res, next) => {
  try {
    if (await hasAccess(req, { roles: ["admin"], permissions: ["address:update"] })) return next()
    if (await isOwnerOfAddress(req)) return next()
    return next(new ApiError(403, "Forbidden"))
  } catch (e) {
    return next(e)
  }
}

// DELETE /addresses/:id
const canDeleteAddressById = async (req, res, next) => {
  try {
    if (await hasAccess(req, { roles: ["admin"], permissions: ["address:delete"] })) return next()
    if (await isOwnerOfAddress(req)) return next()
    return next(new ApiError(403, "Forbidden"))
  } catch (e) {
    return next(e)
  }
}

module.exports = {
  canCreateAddress,
  canListAddressesByCustomer,
  canReadAddressById,
  canUpdateAddressById,
  canDeleteAddressById,
}
