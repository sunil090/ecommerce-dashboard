const express = require("express")
const ctrl = require("../../controllers/customer.controller")
const validate = require("../../middlewares/validate"); // ✅ no {}

const { isAuthenticated } = require("../../middlewares/auth.middleware")
const { authorize } = require("../../middlewares/authorization.middleware")
const { createCustomerSchema, updateCustomerSchema } = require("../../validators/customer.validator")

const router = express.Router()

// Admin-only CRUD (or permission holders)
router.post(
  "/",
  isAuthenticated,
  authorize({ roles: ["admin"], permissions: ["customer:manage"] }),
  validate(createCustomerSchema),
  ctrl.create,
)

router.get("/", isAuthenticated, authorize({ roles: ["admin"], permissions: ["customer:read"] }), ctrl.list)

router.get("/:id", isAuthenticated, authorize({ roles: ["admin"], permissions: ["customer:read"] }), ctrl.getById)

router.put(
  "/:id",
  isAuthenticated,
  authorize({ roles: ["admin"], permissions: ["customer:update"] }),
  validate(updateCustomerSchema),
  ctrl.update,
)

router.delete("/:id", isAuthenticated, authorize({ roles: ["admin"], permissions: ["customer:delete"] }), ctrl.remove)

module.exports = router
