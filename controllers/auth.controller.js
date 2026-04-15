const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../models/user.model');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1,$2) RETURNING *",
      [email, hashed]
    );
    res.json({
    id: user.rows[0].id,
    email: user.rows[0].email
});
  } catch {
    res.status(400).json({ msg: "User exists" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

  if (user.rows.length === 0) return res.status(400).json({ msg: "Invalid" });

  const valid = await bcrypt.compare(password, user.rows[0].password);
  if (!valid) return res.status(400).json({ msg: "Invalid" });

  const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);
  res.json({ token });
};

exports.profile = (req, res) => {
  res.json(req.user);
};
