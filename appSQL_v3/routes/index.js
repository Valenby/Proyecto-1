const {Router} = require("express");
const path = require('path');
const router = Router();
const {healthCheck, welcomePage} = require('../controllers/appControllers');

router 
    .get("/", welcomePage)
    .get("/health", healthCheck)
    .use("/v1/products", require("./productRoute"))
    .use("/v1/users", require("./userRouter"))
    .use('/login', require('./authRoute'))

  
router.get("/login", (req, res) => {
  res.sendFile(path.resolve("views/login.html"));
});
router.get("/playground", (req, res) => {
  res.sendFile(path.resolve("views/playGround.html"));
});
      

module.exports = router;