const express = require("express");
const app = express();

const mysql = require("mysql2");

// Create connection
const db = mysql.createConnection({
  host: "", //Hostname of the database you are connecting to. (Default: localhost)
  user: "", //MySQL user to authenticate as
  password: "", //The password of that MySQL user.
  database: "", //Name of the database to use for this connection. (Optional and you can add it after created)
});

// Connect to DB
db.connect((err) => {
  if (err) throw err;
  console.log("DB connected");
});

// Create DB
app.post("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("DB created");
  });
});

//Create table
app.post("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id) )";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Table created");
  });
});

// Insert post
app.post("/post", (req, res) => {
  let post = { title: "post 2", body: "Hello sql 2" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post added");
  });
});

// Select posts
app.get("/posts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Select single post
app.get("/posts/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Update post
app.put("/posts/:id", (req, res) => {
  let newTitle = "Updated Title";
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Delete post
app.delete("/delete/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
