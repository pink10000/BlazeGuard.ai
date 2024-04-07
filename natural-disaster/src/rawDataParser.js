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

      const data = [];
      let isFirstLine = true; // Flag to track if the first line has been encountered

      fs.createReadStream(inputFile)
        .pipe(csv())
        .on('data', (row) => {
          if (isFirstLine) {
            isFirstLine = false;
            return; // Skip processing the first line
          }

          const latitude = parseFloat(row.LATITUDE);
          const longitude = parseFloat(row.LONGITUDE);
          const fireSize = parseFloat(row.FIRE_SIZE); // in acres
          const causeClass = row.NWCG_CAUSE_CLASSIFICATION;
          const genCause = row.NWCG_GENERAL_CAUSE;
          const discoverDate = row.DISCOVERY_DATE;
          const countyName = row.FIPS_NAME;

          // Check if all required fields are present and valid
          if (!isNaN(latitude) && !isNaN(longitude) && !isNaN(fireSize) &&
              causeClass !== undefined && genCause !== undefined &&
              discoverDate !== undefined && countyName !== undefined) {
            data.push({
              LATITUDE: latitude,
              LONGITUDE: longitude,
              FIRE_SIZE: fireSize,
              NWCG_CAUSE_CLASSIFICATION: causeClass,
              NWCG_GENERAL_CAUSE: genCause,
              DISCOVERY_DATE: discoverDate,
              FIPS_NAME: countyName
            });
          }
        })
        .on('end', () => {
          // If there's no data, exit early
          if (data.length === 0) {
            console.log(`No valid data found in ${inputFile}`);
            return;
          }
          
          // Convert data array to CSV string
          const csvData = data.map(row => {
            // Map each value, wrapping non-float values with quotes
            return Object.values(row).map(value => {
              return typeof value === 'number' ? value : `"${value}"`;
            }).join(',');
          }).join('\n');

          // Write CSV data to file
          fs.writeFileSync(outputFile, csvData);
          console.log(`CSV file created: ${outputFile}`);
        })
        .on('error', (err) => {
          console.error(`Error reading CSV file ${inputFile}:`, err);
        });
    }
  });
});
