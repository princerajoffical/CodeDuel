const express = require("express");
const router = express.Router();
const judgeController = require("../controllers/judgeController");

router.post("/submissions", judgeController.createSubmission);
router.get("/submissions/:token", judgeController.getSubmission);

module.exports = router;
