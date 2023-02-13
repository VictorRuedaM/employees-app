import { pool } from "../../../db/db.js";

export default async function getOneEmployee(req, res) {
  let { id } = req.params;

  id = parseInt(id);

  if (!isNaN(id)) {
    try {
      const [rows] = await pool.query("SELECT * FROM employee WHERE id=?", [id]);
     
      if (rows.length > 0) {
        return res.status(200).json(rows[0]);
      } else {
        return res
          .status(404)
          .json({ message: "The user is not registered in the DataBase" });
      }
    } catch (error) {
      console.log(`Error getting the user from the DB: [${error}]`);
      return res.status(500).json({ message: "Internal error" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Error the Id parameter must be of type number" });
  }
}
