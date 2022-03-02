const express = require("express");
const { check, validationResult } = require("express-validator");

const userController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");

const User = require("../models/schema/user");

const router = express.Router();

// put /user/feedback
router.put(
  "/get_user",
  [
    check("user_id")
      .isInt()
      .custom((value, { req }) => {
        return User.findOne({ where: { id: value } }).then((result) => {
          if (!result) {
            return Promise.reject("UserID is not found!");
          }
        });
      }),
    check("user_id").trim().not().isEmpty(),
  ],
  isAuth,
  userController.get_user
);

module.exports = router;
