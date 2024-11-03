
const express = require('express');
// Create an instance of the express application
const app= express();
// Specify a port number for the server
const port=5000;
// Start the server and listen to the port

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});