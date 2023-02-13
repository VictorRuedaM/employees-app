import { Router } from "express";
import getEmployees from "./controllers/getEmployees.controller.js";
import getOneEmployee from "./controllers/getOneEmployee.controller.js";
import createEmployee from "./controllers/createEmployee.controller.js";
import updateEmployee from "./controllers/updateEmployee.controller.js";
import deleteEmployee from "./controllers/deleteEmployee.controller.js";

const router = Router();

router.get("/", getEmployees);
router.get('/:id', getOneEmployee);
router.post("/", createEmployee);
router.patch("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
