const fs = require('fs');
const csv = require('csv-parser');

const filePath = './data/NE.csv';
const latLongPairs = [];

fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (row) => {
    // Extract latitude and longitude from each entry
    const latitude = parseFloat(row.LATITUDE);
    const longitude = parseFloat(row.LONGITUDE);

    // Add to the array if latitude and longitude are valid numbers
    if (!isNaN(latitude) && !isNaN(longitude)) {
      latLongPairs.push([latitude, longitude]);
    }
  })
  .on('end', () => {
    // Write the array into another JavaScript file
    const arrayString = JSON.stringify(latLongPairs);
    fs.writeFileSync('latLongPairs.js', `const latLongPairs = ${arrayString};\n\nmodule.exports = latLongPairs;`);
    console.log('Latitude and Longitude pairs exported to latLongPairs.js');
  })
  .on('error', (err) => {
    console.error('Error reading CSV file:', err);
  });
