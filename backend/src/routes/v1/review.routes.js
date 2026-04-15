const express = require("express");
const ctrl = require("../../controllers/review.controller");
const validate = require("../../middlewares/validate"); // ✅ use as function

const { isAuthenticated, isAdmin } = require("../../middlewares/auth.middleware"); // note: must match filename
const { addReviewSchema } = require("../../validators/review.validator");

const router = express.Router();

router.post("/", isAuthenticated, validate(addReviewSchema), ctrl.add);
router.get("/product/:productId", ctrl.listByProduct);
router.delete("/:id", isAdmin, ctrl.remove);

module.exports = router;
