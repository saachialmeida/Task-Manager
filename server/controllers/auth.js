const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/schema/user");

exports.signup = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions

  console.log(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: hashedPw
      });

      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: "User created!" });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const _email = req.body.email;
  const _password = req.body.password;

  //console.log(req.body);
  let loadedUser;
  User.findOne({ where: { email: _email } })
    .then(user => {
      if (!user) {
        // const error = new Error("A user with this email could not be found.");
        // error.statusCode = 401;
        // throw error;
        res
          .status(401)
          .json({ message: "A user with this email could not be found." });
      }

      loadedUser = user;
      return bcrypt.compare(_password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        // const error = new Error("Wrong password!");
        // error.statusCode = 401;
        // throw error;

        res.status(401).json({ message: "Wrong password!" });
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.id.toString()
        },
        "somesupersecretsecret",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, userId: loadedUser.id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
