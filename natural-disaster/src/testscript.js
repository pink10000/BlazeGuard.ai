const fs = require('fs');
const csv = require('csv-parser');

const inputFolder = './data';
const outputFolder = './outdata';

// Create output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error('Error reading input folder:', err);
    return;
  }

  files.forEach(file => {
    if (file.match(/^[A-Z]{2}\.csv$/)) {
      const inputFile = `${inputFolder}/${file}`;
      const outputFile = `${outputFolder}/${file}`;

      const latLongPairs = [];

      fs.createReadStream(inputFile)
        .pipe(csv())
        .on('data', (row) => {
          // Extract latitude and longitude from each row
          const latitude = parseFloat(row.LATITUDE);
          const longitude = parseFloat(row.LONGITUDE);

          // Add to the array if latitude and longitude are valid numbers
          if (!isNaN(latitude) && !isNaN(longitude)) {
            latLongPairs.push([latitude, longitude]);
          }
        })
        .on('end', () => {
          // Write the latLongPairs into another CSV file
          const csvData = latLongPairs.map(pair => pair.join(',')).join('\n');
          fs.writeFileSync(outputFile, csvData);
          console.log(`Latitude and Longitude pairs exported to ${outputFile}`);
        })
        .on('error', (err) => {
          console.error(`Error reading CSV file ${inputFile}:`, err);
        });
    }
  });
});
