import { Router } from "express";
const router = Router();
import authController  from "../controllers/authControllers";

router.post('/', authController.signIn)

module.exports = router;