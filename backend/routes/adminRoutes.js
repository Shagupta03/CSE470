const express = require("express");
const router = express.Router();
const { loginAdmin, getAllUsers, deleteUser } = require("../controllers/adminController");

router.post("/login", loginAdmin);
router.get("/users", getAllUsers);
router.delete("/user/:userId", deleteUser);

module.exports = router;
