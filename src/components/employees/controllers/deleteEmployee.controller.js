import { pool } from "../../../db/db.js";

export default async function deleteEmployee(req, res) {
  let { id } = req.params;

  id = parseInt(id);

  if (!isNaN(id)) {
    try {
      const [rows] = await pool.query("DELETE FROM employee WHERE id=?", [id]);
     
      if (rows.affectedRows > 0) {
        return res
          .status(200)
          .json({ message: "User successfully removed from DB" });
      } else {
        return res.status(400).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(`Error impossible delete user from the DB: [${error}]`);
      return res.status(500).json({ message: "Internal error" });
    }
  } else {
    res
      .status(400)
      .json({ message: "Error the Id parameter must be type number" });
  }
}
