import { pool } from "../../../db/db.js";

export default async function updateEmployee(req, res) {
  let { id } = req.params;
  const { name, salary } = req.body;

  if (name !== undefined) {
    if (typeof name !== "string" || name.length < 1) {
      return res
        .status(400)
        .json({ message: "The name is require and must be of type string" });
    }
  }
  if (salary !== undefined) {
    if (salary < 0 || typeof salary !== "number") {
      return res.status(400).json({
        message:
          "The salary is require and must be of type number, cannot be a negative value",
      });
    }
  }

  id = parseInt(id);

  if (!isNaN(id)) {
    try {
      const [rows] = await pool.query(
        "UPDATE employee SET name= IFNULL(?, name), salary= IFNULL(?, salary) WHERE id=?",
        [name, salary, id]
      );

      if (rows.affectedRows > 0) {
        const [rows] = await pool.query("SELECT * FROM employee WHERE id=?", [
          id,
        ]);

        return res.status(201).json({
          message: `User successfully updated from DB `,
          data: rows[0],
        });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(`Error updated user in DB: [${error}]`);
      return res.status(500).json({ message: "Internal error" });
    }
  } else {
    res
      .status(400)
      .json({ message: "Error the Id parameter must be of type number" });
  }
}
