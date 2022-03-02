# Task Management Application - (MERN)

## Prerequisite

- MERN

- Mysql
- Express
- React
- Node/NPM

## Install

- `npm install`
- `npm install2`

## Configure DB

- edit database.js for db settings

- `vi server\util\database.js`

```
const Sequelize = require("sequelize");

const sequelize = new Sequelize("task_manager", "username", "password", {
dialect: "mysql",
host: "localhost",
});

module.exports = sequelize;
```

# Start

- `npm start`
