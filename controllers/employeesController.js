const { db } = require("../middlewares/dbMiddleware.js");

const getEmployees = (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.error("Error getting employees:", err);
      res.status(500).json({ error: "Error getting employees" });
    } else {
      res.json(result);
    }
  });
};

const addEmployees = (req, res) => {
  const {
    name,
    email,
    address,
    startDate,
    endDate,
    position,
    salary,
    department,
  } = req.body;

  // Check if any details are provided
  if (!(name || email || address || startDate || position || department)) {
    return res.status(400).json({ error: "No details provided for insertion" });
  }

  // Build the dynamic conditions based on provided parameters
  const conditions = [];
  const values = [];

  if (name) {
    conditions.push("name = ?");
    values.push(name);
  }
  if (email) {
    conditions.push("email = ?");
    values.push(email);
  }
  if (address) {
    conditions.push("address = ?");
    values.push(address);
  }
  if (startDate) {
    conditions.push("startDate = ?");
    values.push(startDate);
  }
  if (endDate) {
    conditions.push("endDate = ?");
    values.push(endDate);
  }
  if (position) {
    conditions.push("position = ?");
    values.push(position);
  }
  if (salary) {
    conditions.push("salary = ?");
    values.push(salary);
  }
  if (department) {
    conditions.push("department = ?");
    values.push(department);
  }

  // Construct the final query
  const query = `INSERT INTO employees SET ${conditions.join(", ")}`;

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting employee:", err);
      res.status(500).json({ error: "Error inserting employee" });
    } else {
      console.log("Employee inserted:", result);
      res.json({ message: "Employee inserted successfully" });
    }
  });
};


const updateEmployees = (req, res) => {
  const {
    id,
    name,
    email,
    address,
    startDate,
    endDate,
    position,
    salary,
    department,
  } = req.body;

  // Check if any details are provided
  if (!id || !(name || email || address || startDate || endDate || position || salary || department)) {
    return res.status(400).json({ error: "Invalid request. Provide employee ID and at least one detail for update." });
  }

  // Build the dynamic conditions based on provided parameters
  const conditions = [];
  const values = [];

  if (name) {
    conditions.push("name = ?");
    values.push(name);
  }
  if (email) {
    conditions.push("email = ?");
    values.push(email);
  }
  if (address) {
    conditions.push("address = ?");
    values.push(address);
  }
  if (startDate) {
    conditions.push("startDate = ?");
    values.push(startDate);
  }
  if (endDate) {
    conditions.push("endDate = ?");
    values.push(endDate);
  }
  if (position) {
    conditions.push("position = ?");
    values.push(position);
  }
  if (salary) {
    conditions.push("salary = ?");
    values.push(salary);
  }
  if (department) {
    conditions.push("department = ?");
    values.push(department);
  }

  // Construct the final query
  const query = `UPDATE employees SET ${conditions.join(", ")} WHERE id = ?`;

  // Add the employee ID to the values array
  values.push(id);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating employee:", err);
      res.status(500).json({ error: "Error updating employee" });
    } else {
      console.log("Employee updated:", result);
      res.json({ message: "Employee updated successfully" });
    }
  });
};


const deleteEmployees = (req, res) => {
  const userIdsToDelete = req.params.id.split(",");

  userIdsToDelete.forEach((userId) => {
    db.query("DELETE FROM employees WHERE id =?", [userId], (err, result) => {
      if (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ error: "Error deleting employees" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json({
          message: `${result.affectedRows} employees deleted successfully`,
        });
      }
    });
  });
};

const searchEmployees = (req, res) => {
  const {
    id,
    name,
    email,
    address,
    startDate,
    endDate,
    position,
    salary,
    department,
  } = req.body;

  // Check if any search criteria are provided
  if (!(id || name || email || address || startDate || endDate || position || salary || department)) {
    return res.status(400).json({ error: "No search criteria provided" });
  }

  // Build the dynamic conditions based on provided parameters
  const conditions = [];
  const values = [];

  if (id) {
    conditions.push("id = ?");
    values.push(id);
  }
  if (name) {
    conditions.push("name = ?");
    values.push(name);
  }
  if (email) {
    conditions.push("email = ?");
    values.push(email);
  }
  if (address) {
    conditions.push("address = ?");
    values.push(address);
  }
  if (startDate) {
    conditions.push("startDate >= ?");
    values.push(startDate);
  }
  if (endDate) {
    conditions.push("endDate <= ?");
    values.push(endDate);
  }
  if (position) {
    conditions.push("position = ?");
    values.push(position);
  }
  if (salary) {
    conditions.push("salary = ?");
    values.push(salary);
  }
  if (department) {
    conditions.push("department = ?");
    values.push(department);
  }

  // Construct the final query
  let query = "SELECT * FROM employees";

  // Add WHERE clause only if conditions are provided
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error searching employees:", err);
      res.status(500).json({ error: "Error searching employees" });
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  getEmployees,
  addEmployees,
  updateEmployees,
  deleteEmployees,
  searchEmployees,
};
