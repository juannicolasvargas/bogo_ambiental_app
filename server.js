//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use('/', express.static("build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
