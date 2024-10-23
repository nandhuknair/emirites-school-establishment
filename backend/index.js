const { MongoClient } = require('mongodb');
const xlsx = require('xlsx');
require('dotenv').config();
const path = require('path')

// MongoDB connection string (use your actual connection string)
const uri = process.env.MONGO_URI
console.log(uri)
// Connect to MongoDB
async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Define your database and collection
    const database = client.db('studentDB'); // Change 'studentDB' to your database name
    const collection = database.collection('studentsLMF'); // Change 'students' to your collection name

    // Load the Excel file
    const workbook = xlsx.readFile(path.join(__dirname, 'public', 'lmf.xlsx'));
    const sheet_name = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheet_name];

    // Convert Excel data to JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Insert the JSON data into MongoDB
    const result = await collection.insertMany(jsonData);

    console.log(`${result.insertedCount} records inserted into the collection.`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

main().catch(console.error);
