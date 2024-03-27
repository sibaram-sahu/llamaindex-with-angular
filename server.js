const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const PORT = 8002;

const {
  Document,
  VectorStoreIndex,
  SimpleDirectoryReader
} = require("llamaindex")

// Enable CORS middleware
app.use(cors());

// Sample data
let data = [];

// Middleware to parse JSON bodies
app.use(express.json());

// GET API to fetch data
app.get('/', (req, res) => {
  res.json({msg: "hello world"});
});

// POST API to add data
app.post('/', async (req, res) => {
  const documents = await new SimpleDirectoryReader().loadData({ directoryPath: "./data" })
  const index = await VectorStoreIndex.fromDocuments(documents)
  const queryEngine = index.asQueryEngine()
  try {
    let data = req.body;
    let answer = await queryEngine.query({ query: data.query });
    // Prepare response object
    let responseObj = {
      response: answer.toString()
    };
    // Send response
    res.status(200).json(responseObj);
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
