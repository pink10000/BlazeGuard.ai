const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database
const db = new sqlite3.Database('./data/FPA_FOD_20221014.sqlite');

// Define SQL query to select latitude and longitude columns from the Fires table
const query = `SELECT LATITUDE, LONGITUDE FROM Fires`;

// Execute the query
db.all(query, [], (err, rows) => {
  if (err) {
    throw err;
  }

  let sum = 0;
  // Process each row
  rows.forEach(row => {
    const latitude = row.LATITUDE;
    const longitude = row.LONGITUDE;

    // Do something with latitude and longitude, such as printing them
    // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    sum = sum + 1;
  });

  console.log("sum: " + sum);
});

// Close the database connection
db.close();