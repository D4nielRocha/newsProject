// app.js

// Define an instance of Express
const express = require("express");

// Define Express App
const app = express();

// TCP port 
const PORT = 8080;
// Serve Static Assets from the public folder
app.use(express.static('public'));

// Start the server and listen on the TCP port defined above
// Display a console message to indicate that the server staarted and is running
app.listen(PORT, () => {
    console.log(`Your are connected at http://localhost:${PORT}`);
})



