import { pool } from "../../../db/db.js";

export default async function createEmployee(req, res) {
  const { name, salary } = req.body;

  if (name && typeof name === "string" && typeof salary === "number") {
    try {
      const [rows] = await pool.query(
        "INSERT INTO employee (name, salary) VALUES (?,?)",
        [name, salary]
      );

      return res.status(201).json({ id: rows.insertId, name, salary });
    } catch (error) {
      console.log(`Error creating user in DB: [${error}]`);
      return res.status(500).json({ message: "Internal error" });
    }
  } else {
    return res
      .status(400)
      .json({
        message: `Error sending data: [The name parameter is require, name must be of type string and salary must be of type number`,
      });
  }
}
