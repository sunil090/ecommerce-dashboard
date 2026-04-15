const express = require("express")
const ctrl = require("../../controllers/address.controller")
const validate = require("../../middlewares/validate"); // ✅ no {}

const { isAuthenticated } = require("../../middlewares/auth.middleware")
const {
  canCreateAddress,
  canListAddressesByCustomer,
  canReadAddressById,
  canUpdateAddressById,
  canDeleteAddressById,
} = require("../../middlewares/ownership.middleware")
const { createAddressSchema, updateAddressSchema } = require("../../validators/address.validator")

const router = express.Router()

// Customer can manage their addresses (self) or admin/permission can act
router.post("/", isAuthenticated, canCreateAddress, validate(createAddressSchema), ctrl.create)

// List addresses for a customer (self or admin/permission)
router.get("/customer/:customerId", isAuthenticated, canListAddressesByCustomer, ctrl.listByCustomer)

router.get("/:id", isAuthenticated, canReadAddressById, ctrl.getById)
router.put("/:id", isAuthenticated, canUpdateAddressById, validate(updateAddressSchema), ctrl.update)

// Admin/permission can delete any; customer can delete own
router.delete("/:id", isAuthenticated, canDeleteAddressById, ctrl.remove)

module.exports = router
