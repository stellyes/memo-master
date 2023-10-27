const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");
const { notStrictEqual } = require("assert");

// Set server port
const PORT = 3001;

// Start express application
const app = express();

// Set to use files in public folder
app.use(express.static("public"));

// User is directed to index.html (homepage) on open
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// User is directed to notes.html when "Get Started" is pressed
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.send(noteData);
});

app.post("/api/notes", (req, res) => {
  // Do something
});

app.delete("/api/notes", (req, res) => {
  // Do something
});

// Listener on PORT
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
