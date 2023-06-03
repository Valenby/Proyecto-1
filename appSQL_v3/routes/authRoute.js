const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authControllers");

router.post('/', authController.signIn)

module.exports = router;