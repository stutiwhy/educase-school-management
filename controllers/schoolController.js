// /controllers/schoolController.js

// manages all the real communication with db with input validation
const pool = require("../database");
const { haversineDistance } = require("../utils/findDistance");

async function addSchool(req, res) {
  const { name, address, latitude, longitude } = req.body;

  // checking if inputs are valid
  const errors = [];

  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("name is required and must be a non-empty string.");
  }
  if (!address || typeof address !== "string" || address.trim() === "") {
    errors.push("address is required and must be a non-empty string.");
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (latitude === undefined || latitude === null || latitude === "") {
    errors.push("latitude is required.");
  } else if (isNaN(lat) || lat < -90 || lat > 90) {
    errors.push("latitude must be a number between -90 and 90.");
  }

  if (longitude === undefined || longitude === null || longitude === "") {
    errors.push("longitude is required.");
  } else if (isNaN(lon) || lon < -180 || lon > 180) {
    errors.push("longitude must be a number between -180 and 180.");
  }

  if (errors.length > 0) {
    return res.status(422).json({ success: false, errors });
  }

  // querying db to insert
  try {
    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name.trim(), address.trim(), lat, lon],
    );

    // showing school added in result of insertion
    return res.status(201).json({
      success: true,
      message: "school added successfully!",
      data: {
        id: result.insertId,
        name: name.trim(),
        address: address.trim(),
        latitude: lat,
        longitude: lon,
      },
    });
  } catch (err) {
    console.error("addSchool DB error:", err);
    return res.status(500).json({ success: false, message: "database error." });
  }
}

async function listSchools(req, res) {
  const { latitude, longitude } = req.query;

  // user input validation
  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  // response code 422 means input can't be processed cuz invalid
  if (latitude === undefined || latitude === "") {
    return res
      .status(422)
      .json({ success: false, message: "latitude is required." });
  }
  if (isNaN(userLat) || userLat < -90 || userLat > 90) {
    return res
      .status(422)
      .json({
        success: false,
        message: "latitude must be a number between -90 and 90.",
      }); // because science
  }
  if (longitude === undefined || longitude === "") {
    return res
      .status(422)
      .json({ success: false, message: "longitude is required." });
  }
  if (isNaN(userLon) || userLon < -180 || userLon > 180) {
    return res
      .status(422)
      .json({
        success: false,
        message: "longitude must be a number between -180 and 180.",
      });
  }

  // based on valid user input, querying db for schools and sorting them
  try {
    const [rows] = await pool.execute(
      "SELECT id, name, address, latitude, longitude FROM schools",
    );

    const sorted = rows
      .map((school) => ({
        ...school,
        distance_km: parseFloat(
          haversineDistance(
            userLat,
            userLon,
            school.latitude,
            school.longitude,
          ).toFixed(6),
        ),
      }))
      .sort((a, b) => a.distance_km - b.distance_km);

    return res.json({ success: true, count: sorted.length, data: sorted });
  } catch (err) {
    console.error("listSchools DB error:", err);
    return res.status(500).json({ success: false, message: "database error." });
  }
}

module.exports = { addSchool, listSchools };
