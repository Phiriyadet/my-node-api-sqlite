// IMPORTANT: บอกให้ Sequelize ใช้ SQLite in-memory ก่อน require models/app
process.env.IN_MEMORY_DB = "true";

const request = require("supertest");
const { app } = require("../src/app");
const sequelize = require("../src/models");
const User = require("../src/models/user");

// Run before all tests
beforeAll(async () => {
  await sequelize.sync({ force: true }); // สร้างตารางใหม่
});

// Clean table after each test
afterEach(async () => {
  await User.destroy({ where: {} }); // ลบข้อมูลทั้งหมด
});

// Close DB after all tests
afterAll(async () => {
  await sequelize.close();
});


// ========== Test Cases ==========

// 1️⃣ Health Check
describe("GET /", () => {
  it("should return API health status", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});

// 2️⃣ CREATE (POST /users)
describe("POST /users", () => {
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "John", age: 25 });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("John");
    expect(res.body.age).toBe(25);
  });
});

// 3️⃣ READ (GET /users)
describe("GET /users", () => {
  it("should return all users", async () => {
    await User.create({ name: "Alice", age: 30 });

    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Alice");
  });
});

// 4️⃣ UPDATE (PUT /users/:id)
describe("PUT /users/:id", () => {
  it("should update user by id", async () => {
    const user = await User.create({ name: "Old Name", age: 20 });

    const res = await request(app)
      .put(`/users/${user.id}`)
      .send({ name: "New Name", age: 25 });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("New Name");
  });
});

// 5️⃣ DELETE (DELETE /users/:id)
describe("DELETE /users/:id", () => {
  it("should delete a user", async () => {
    const user = await User.create({ name: "To Delete", age: 40 });

    const res = await request(app).delete(`/users/${user.id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User deleted");
  });
});
