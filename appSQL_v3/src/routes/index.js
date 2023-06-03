import {Router} from"express";
import path  from'path';
const router = Router();
import {healthCheck, welcomePage} from'../controllers/appControllers';

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
      

export default router;