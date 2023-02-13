import { pool } from "../../../db/db.js";

export default async function getEmployees(req, res) {
  try {
    
    const result = await pool.query("SELECT * FROM employee");

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(`Error getting the users from the DB: [${error}]`);
    return res.status(500).json({ message: "Internal error" });
  }
}
