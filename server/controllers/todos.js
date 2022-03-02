const Todo = require("../models/schema/todo");
const { validationResult } = require("express-validator");

exports.get_todos = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions

  const Todo = require("../models/schema/todo");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Todo.findAll()
    .then((result) => {
      if (!result) {
        return Promise.reject("No data found!");
      }
      res.status(200).json({ ok: true, text: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json({ error: "Unable to fetch records" });
      next(err);
    });
};

exports.completed = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = req.params.id;
  const completed = req.body.completed;
  Todo.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        return Promise.reject("No data found!");
      }

      result.update({ completed: completed }).then((result) => {
        Todo.findAll().then((data) => {
          res.status(200).json({ ok: true, text: data });
        });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json({ error: "Unable to fetch records" });
      next(err);
    });
};

exports.update = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = req.params.id;
  const text = req.body.text;
  Todo.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        return Promise.reject("No data found!");
      }

      result.update({ text: text }).then((result) => {
        Todo.findAll().then((data) => {
          res.status(200).json({ ok: true, text: data });
        });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json({ error: "Unable to fetch records" });
      next(err);
    });
};
exports.create = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const text = req.body.text.trim();

  Todo.findOne({ where: { text: text } })
    .then((result) => {
      if (result) {
        return Promise.reject("Duplicate task found!");
      }
      const Task = new Todo({
        text: text,
      });
      Task.save().then((result) => {
        Todo.findAll().then((data) => {
          res.status(200).json({ ok: true, text: data });
        });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json({ error: "Unable to fetch records" });
      next(err);
    });
};

exports.delete = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = req.params.id;

  Todo.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        return Promise.reject("No data found!");
      }

      result.destroy().then(() => {
        Todo.findAll().then((data) => {
          res.status(200).json({ ok: true, text: data });
        });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json({ error: "Unable to fetch records" });
      next(err);
    });
};
