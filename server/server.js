const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Baguvix1994",
  database: "food",
});

//user signup
app.post("/createUser", (req, res) => {
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

//restaurant signup
app.post("/createRestaurant", (req, res) => {
  const restaurantname = req.body.restaurantname;
  const username = req.body.username;
  const password = req.body.password;
  const address = req.body.address;

  db.query(
    "INSERT INTO restaurant (restaurantname, username, password, address) VALUES (?,?,?,?)",
    [restaurantname, username, password, address],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//user login
app.post("/loginUser", (req, res) => {
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

//restaurant login
app.post("/loginRestaurant", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM restaurant WHERE username = ? AND password = ?",
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
