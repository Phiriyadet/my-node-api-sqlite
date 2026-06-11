const User = require("../models/user");

/**
 * GET /users
 * ดึงข้อมูลผู้ใช้ทั้งหมด
 */
exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

/**
 * POST /users
 * สร้างผู้ใช้ใหม่
 */
exports.createUser = async (req, res) => {
  const { name, age } = req.body;
  const user = await User.create({ name, age });
  res.json(user);
};

/**
 * PUT /users/:id
 * แก้ไขข้อมูลผู้ใช้ตาม ID
 */
exports.updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await user.update(req.body);
  res.json(user);
};

/**
 * DELETE /users/:id
 * ลบผู้ใช้ตาม ID
 */
exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await user.destroy();
  res.json({ message: "User deleted" });
};
