const express = require("express");
const { jsonParser } = require("./middlewares/bodyParserMiddleware.js");
const employeesRoutes = require("./routes/employeesRoutes.js");

const app = express();
const port = 5000;

// Middleware
app.use(jsonParser);

// Use user routes
app.use("/employees", employeesRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
