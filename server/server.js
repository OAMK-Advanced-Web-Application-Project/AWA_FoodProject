const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRound = 10;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "1216",
  database: "food",
});

//user signup
app.post("/createUser", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const password = req.body.password;
  const address = req.body.address;

  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO user (firstname, lastname, username, password, address) VALUES (?,?,?,?,?)",
      [firstname, lastname, username, hash, address],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });
});

//user login
app.post("/UserLogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            res.send(result);
          } else {
            res.send({ message: "Wrong username or password" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
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

  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO restaurant (restaurantname, username, password, address) VALUES (?,?,?,?)",
      [restaurantname, username, hash, address],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });
});

//restaurant login
app.post("/loginRestaurant", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM restaurant WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            res.send(result);
          } else {
            res.send({ message: "Invalid" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});
