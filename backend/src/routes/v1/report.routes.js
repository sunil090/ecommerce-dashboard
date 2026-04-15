const express = require("express");
const ctrl = require("../../controllers/report.controller");
const { isAdmin } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/summary", isAdmin, ctrl.summary);
router.get("/top-products", isAdmin, ctrl.topProducts);
router.get("/active-customers", isAdmin, ctrl.activeCustomers);

module.exports = router;
