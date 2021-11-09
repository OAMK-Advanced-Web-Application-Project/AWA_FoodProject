const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({origin: true, credentials: true}));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "1216",
  database: "food",
});

app.post("/register", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const password = req.body.password;
  const address = req.body.address;

  db.query(
    "INSERT INTO user (firstname, lastname, username, password, address) VALUES (?,?,?,?,?)",
    [firstname, lastname, username, password, address],
    (err, result) => {
      console.log(err);
    }
  );
});

app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});
