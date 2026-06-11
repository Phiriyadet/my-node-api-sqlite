const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const userController = require("./controllers/userController");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// 🔹 Swagger Config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Node.js API",
      version: "1.0.0",
      description: "API documentation with Swagger",
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: ["./src/app.js"], // Swagger docs ตรงนี้
};
const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: Health check endpoints
 *   - name: Users
 *     description: User management endpoints
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Returns welcome message
 */
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Node.js + Docker demo running 🚀" });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Returns app status and uptime
 */
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
app.get("/users", userController.getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               age:
 *                 type: integer
 *                 example: 25
 *     responses:
 *       200:
 *         description: User created
 */
app.post("/users", userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               age:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       200:
 *         description: User updated
 */
app.put("/users/:id", userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
 */
app.delete("/users/:id", userController.deleteUser);

module.exports = { app, PORT };
