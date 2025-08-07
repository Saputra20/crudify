# Crudify

> Effortless CRUD generator for Express.js projects. Boost your productivity by automating CRUD boilerplate code for your RESTful APIs.

[![npm version](https://img.shields.io/npm/v/@dctrl/crudify.svg)](https://www.npmjs.com/package/@dctrl/crudify)
[![license](https://img.shields.io/npm/l/@dctrl/crudify.svg)](LICENSE)

---

## ✨ Features

- ⚡ Instant CRUD scaffolding for your Express.js project, Compatible with [here](https://github.com/Saputra20/boilerplate-express-craft)
- 🛠️ Generates controller, service, route and validation files
- 📦 CLI interface for fast integration
- ✅ Easily extendable and customizable
- 🧪 Supports your existing folder structure

---

## 📦 Installation

```bash
npm install -g @dctrl/crudify
```

> Or use it locally in your project:

```bash
npm install --save-dev @dctrl/crudify
```

---

## 🚀 Quick Start

Generate CRUD files for a `User` model:

```bash
crudify generate User --attributes=name:string,email:string
```

This will generate:

```
src/
├── application/
│   └── user
│       └── user.controller.js
│       └── user.route.js
│       └── user.service.js
│       └── user.validation.js
```

Generate Controller files for a `User` model:

```bash
crudify generate User -c
```

This will generate:

```
src/
├── application/
│   └── user
│       └── user.controller.js
```

Generate Service files for a `User` model:

```bash
crudify generate User -s
```

This will generate:

```
src/
├── application/
│   └── user
│       └── user.service.js
```

Generate Route files for a `User` model:

```bash
crudify generate User -r
```

This will generate:

```
src/
├── application/
│   └── user
│       └── user.route.js
```

Generate Validation files for a `User` model:

```bash
crudify generate User -v --attributes=email:string
```

This will generate:

```
src/
├── application/
│   └── user
│       └── user.validation.js
```

---

## 🛠️ Usage

```bash
crudify generate [name] [options]
```

### Options

| Option                                       | Description                                                               |
|----------------------------------------------|---------------------------------------------------------------------------|
| `--controller, -c`                           | Generate the controller file that handles HTTP requests and responses.    |
| `--service, -s`                              | Generate the service file that contains business logic or database access.|
| `--router, -r`                               | Generate the route file to map HTTP endpoints to controller methods.      |
| `--validation, -v`                           | Generate the validation file to enforce input rules for request data.     |
| `--attributes=<attributes>, -a=<attributes>` | Comma-separated list of attributes for the entity                         |

### Example

Generate only controller:

```bash
crudify generate User -c
```

Generate only service:

```bash
crudify generate User -s
```

Generate only route:

```bash
crudify generate User -r
```

Generate only validation:

```bash
crudify generate User -a --attributes=email:string
```

---

## 📁 Default Generated Structure

Each generated model will include:

- **Controller**: Handles HTTP request and response. It receives the request from the route and calls the appropriate service logic
- **Service**: Contains the core business logic such as database operations or data processing. It is reusable and keeps controllers clean.
- **Route**: Maps incoming HTTP requests (e.g., GET, POST) to the appropriate controller functions.
- **Validation**: Ensures that incoming request data (e.g., body, params) meets required rules before it reaches the controller.
---

## ✅ Example Output (Controller)

```js
const list = catchAsync(async (req, res) => {
  const { query } = req;
  const result = await __Name__Service.findAll(query);
  return new ApiResponse({
    messages: messages.COMMON.OK,
    data: result,
  }).send(res);
});
```

## ✅ Example Output (Service)

```js
const BaseService = require('../../../../@core/service/BaseService');
const { User } = require('../../../../database/models');

class UserService extends BaseService {}

module.exports = new UserService(User);

```

## ✅ Example Output (Route)

```js
/**
 * @swagger
 * /core/v1/users:
 *   post:
 *     summary: Create User
 *     tags: [User]
 *     security:
 *       - bearerAuth: [auth]
 *     description: Returns users data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createOrUpdateUserRequest'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/createOrUpdateUserRequest'
 *     responses:
 *       '201':
 *         description: Successful Response
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/userCreatedResponse'
 *       '401':
 *         description: Unauthorize response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/unauthorizedResponse'
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/forbiddenResponse'
 *       '404':
 *         description: Not Found response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/notFoundResponse'
 *       '422':
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/badRequestFormResponse'
 */
router.post(
  '/',
  authCore({ menu: menuName, permission: 'create' }),
  validate(userValidation.createOrUpdate),
  userController.create,
);
```

## ✅ Example Output (Validation)

```js
const Joi = require('joi');

const createOrUpdate = {
  body: Joi.object().keys({ 
     name: Joi.string().required()
  }),
};

module.exports = {
  createOrUpdate,
};

```
---

## 🧩 Integration Notes

- Compatible with Boilerplate Express [here](https://github.com/Saputra20/boilerplate-express-craft)
---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---