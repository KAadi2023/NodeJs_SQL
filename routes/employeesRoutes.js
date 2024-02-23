const express = require("express");
const { jsonParser } = require("../middlewares/bodyParserMiddleware");
const employeesController = require("../controllers/employeesController");

const router = express.Router();

// Routes

// Get Employees
router.get("/getEmployees", employeesController.getEmployees);

// Add Employees
router.post("/addEmployees", jsonParser, employeesController.addEmployees);

// Update Employees
router.put("/updateEmployees/:ids", jsonParser, employeesController.updateEmployees);

// Delete Employees
router.delete("/deleteEmployees/:id", employeesController.deleteEmployees);

// Search Employees
router.post("/searchEmployees", jsonParser, employeesController.searchEmployees);

module.exports = router;
