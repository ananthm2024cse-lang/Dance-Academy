const express = require("express");
const router = express.Router();
const { signupUser, loginUser, getAllUsers, getLoginHistory, updateUser, deleteUser } = require("../Controller/UserController");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers);
router.get("/logins", getLoginHistory);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;