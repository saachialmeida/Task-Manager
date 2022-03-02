const { validationResult } = require("express-validator");

exports.get_user = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions

  const User = require("../models/schema/user");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user_id = req.body.user_id;

  User.findOne({ where: { id: user_id } })
    .then((result) => {
      if (!result) {
        return Promise.reject("UserID is not found!");
      }

      res.status(200).json({ data: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
