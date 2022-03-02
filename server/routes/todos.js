const express = require("express");
const { check } = require("express-validator");

const todosController = require("../controllers/todos");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/all", [], isAuth, todosController.get_todos);
router.post(
  "/completed/:id",
  [
    check("id").isNumeric().withMessage("Please enter a valid id."),
    check("completed").isNumeric(),
  ],
  isAuth,
  todosController.completed
);
router.put(
  "/update/:id",
  [
    check("id").isNumeric().withMessage("Please enter a valid id."),
    check("text").isString().withMessage("Please enter a valid task."),
    check("text").notEmpty().withMessage("Task should not empty."),
  ],
  isAuth,
  todosController.update
);

router.delete(
  "/:id",
  [check("id").isNumeric().withMessage("Please enter a valid id.")],
  isAuth,
  todosController.delete
);
router.post(
  "/create",
  [
    check("text").isString().withMessage("Please enter a valid task."),
    check("text").notEmpty().withMessage("Task should not empty."),
  ],
  isAuth,
  todosController.create
);

module.exports = router;
