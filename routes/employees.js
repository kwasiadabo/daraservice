const Employees = require("../models/employee");
const express = require("express");
const router = express.Router();

router.get("/:directorate/:department/:unit/:category", async (req, res) => {
  const results = await Employees.getEmployees(
    req.params.directorate,
    req.params.department,
    req.params.unit,
    req.params.category
  );
  res.send(results);
  //res.json(results[0]);
});

router.get("/isworking", async (req, res) => {
  const results = await Employees.isWorking();
  res.send(results);
  //res.json(results[0]);
});

module.exports = router;
