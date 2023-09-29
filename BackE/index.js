const connectToMongo = require('./db'); // Import the connectToMongo function
const express = require('express');
const cors = require('cors');

// Call the connectToMongo function to establish a connection to MongoDB
connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Define and mount your API routes
app.use('/api/auth', require('./routes/auth')); // Adjust the path as needed
app.use('/api/notes', require('./routes/notes')); // Adjust the path as needed

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
