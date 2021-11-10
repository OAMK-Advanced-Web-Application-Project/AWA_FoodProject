const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "1216",
  database: "food",
});

app.post("/create", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const password = req.body.password;
  const address = req.body.address;

  db.query(
    "INSERT INTO user (firstname, lastname, username, password, address) VALUES (?,?,?,?,?)",
    [firstname, lastname, username, password, address],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result) {
        res.send(result);
      } else {
        res.send({ message: "Invalid" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});
