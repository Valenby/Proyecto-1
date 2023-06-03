const {Router} = require('express');
const router = Router();
const usersController = require("../controllers/userController");

router.get("/",usersController.getAllUsers);
router.get("/:id", usersController.getUserById) ;  

router.post("/", usersController.createUser);
router.put("/:id", usersController.updateUser);
router.patch("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);
    
module.exports = router; 