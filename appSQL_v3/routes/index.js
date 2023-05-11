const {Router} = require("express");
const router = Router();
const {healthCheck, welcomePage} = require('../controllers/appControllers');

router 
    .get("/", welcomePage)
    .get("/health", healthCheck)
    .use("/v1/products", require("./productRoute"))
    .use("/v1/users", require("./userRouter"));

module.exports = router;