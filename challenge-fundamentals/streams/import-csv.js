// Import necessary modules
import fs from 'node:fs'; // Native module to work with the file system
import { parse } from 'csv-parse'; // Library to parse CSV files

// Path to your CSV file
const csvFilePath = new URL('../tasks.csv', import.meta.url);

// Create a readable stream from the CSV file rather than reading it directly aat once with fs.readFile()
const readStream = fs.createReadStream(csvFilePath);

// Initialize the CSV parser
const csvParser = parse({
  columns: true,       // Automatically map rows to objects based on column headers
  skip_empty_lines: true, // Ignore empty lines in the CSV
});

// Pipe the read stream into the CSV parser || Pipe takes the output from readStream (raw CSV data) and passes it to 
// csvParser for parsing into structured rows.  
readStream.pipe(csvParser);

// Async function to handle the processing of each CSV row
(async () => {
  try {
    for await (const record of csvParser) {
      // Log each task for debugging
      console.log('Parsed task:', record);

      // Prepare data for the POST request
      const taskData = {
        title: record.title,
        description: record.description,
      };

      fetch('http://localhost:5555/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    })
      await wait(1000);

      console.log(`Task "${record.title}" successfully added.`);
    }

    console.log('All tasks have been successfully uploaded.');
  } catch (error) {
    console.error('Error processing CSV file:', error.message);
  }
})();

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
