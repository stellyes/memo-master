const express = require("express");
const hash = require("object-hash");
const fs = require("fs");
const path = require("path");
const noteData = require("./db/db.json");
const { notStrictEqual } = require("assert");

// Set server port
const PORT = 3001;

// Start express application
const app = express();

// Set to use files in public folder
app.use(express.static("public"));

// Parse body of requests to JSON
app.use(express.json());

// User is directed to index.html (homepage) on open
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// User is directed to notes.html when "Get Started" is pressed
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Sends note data to public/index.js to be rendered to page
app.get("/api/notes", (req, res) => {
  res.send(noteData);
});

app.post("/api/notes", (req, res) => {
  // Get request body
  res.json({ requestBody: req.body });

  // Create ID parameter, represents hash value of title
  req.body.id = hash(req.body.title);

  // Add new note to noteData
  noteData.push(req.body);

  // Write to db.json file
  fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
    // Throw error if program fails to write to db.json
    if (err) {
      throw new Error(err);
    }
  });
});

app.delete("/api/notes", (req, res) => {
  // Do something
});

// Listener on PORT
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
