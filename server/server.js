const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const saltRound = 10;

const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3002"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "AWAgroup8",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.use((req, res, next) => {
  console.log("demo middleware executing ...");
  next();
});

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "1216",
  database: "food",
});

// ------------------------------------------------------------------

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

passport.use(
  "auth1",
  new BasicStrategy(function (username, password, done, res) {
    db.query(
      "SELECT * FROM user WHERE username = ?",
      username,
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              done(null, response);
              const body = {
                iduser: result[0].iduser,
                firstname: result[0].firstname,
                lastname: result[0].lastname,
                username: result[0].username,
                address: result[0].address,
                orderhistory: result[0].orderhistory,
              };
              const payload = {
                user: body,
              };
              const secretKey = "AWAgroup8";
              const options = {
                expiresIn: 60 * 60 * 24,
              };
              const token = jwt.sign(payload, secretKey, options);
              console.log(token);
            } else {
              done(null, false);
            }
          });
        } else {
          done(null, false);
        }
      }
    );
  })
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "AWAgroup8",
};

passport.use(
  new JwtStrategy(jwtOptions, function (jwt_payload, done) {
    console.log("payload is as follows: " + jwt_payload);

    done(null, jwt_payload);
  })
);

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
            const id = result[0].id;
            const token = jwt.sign({ id }, "AWAgroup8", {
              expiresIn: 60 * 60 * 24,
            });
            res.json({ auth: true, token: token, result: result });
          } else {
            res.json({ auth: false, message: "wrong username/password" });
          }
        });
      } else {
        res.json({ auth: false, message: "no user exists" });
      }
    }
  );
});

app.get(
  "/my-protected-resource",
  passport.authenticate("auth1", { session: false }),
  (req, res) => {
    console.log("protected resource accessed");

    res.send("Hello protected world");
  }
);

app.get(
  "/jwt-protected-resource",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.send(req.user);
  }
);

//------------------------------------------------------------------------------

//restaurant signup
app.post("/createRestaurant", (req, res) => {
  const restaurantname = req.body.restaurantname;
  const username = req.body.username;
  const password = req.body.password;
  const address = req.body.address;
  const operatinghours = req.body.operatinghours;
  const type = req.body.type;
  const pricelevel = req.body.pricelevel;

  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO restaurant (restaurantname, username, password, address, operatinghours, type, pricelevel) VALUES (?,?,?,?,?,?,?)",
      [restaurantname, username, hash, address, operatinghours, type, pricelevel],
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

passport.use(
  "auth2",
  new BasicStrategy(function (username, password, done, res) {
    db.query(
      "SELECT * FROM restaurant WHERE username = ?",
      username,
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              done(null, response);
              const body = {
                idrestaurant: result[0].idrestaurant,
                restaurantname: result[0].restaurantname,
                username: result[0].username,
                address: result[0].address,
                operatinghours: result[0].operatinghours,
                type: result[0].type,
                pricelevel: result[0].pricelevel,
/*                 sellhistory: result[0].sellhistory,
 */              };
              const payload = {
                user: body,
              };
              const secretKey = "AWAgroup8";
              const options = {
                expiresIn: 60 * 60 * 24,
              };
              const token = jwt.sign(payload, secretKey, options);
              console.log(token);
            } else {
              done(null, false);
            }
          });
        } else {
          done(null, false);
        }
      }
    );
  })
);

app.get(
  "/my-protected-resource-restaurant",
  passport.authenticate("auth2", { session: false }),
  (req, res) => {
    console.log("protected resource accessed");

    res.send("Hello protected world restaurant");
  }
);

app.get(
  "/jwt-protected-resource-restaurant",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.send(req.user);
  }
);

//restaurant login
app.post("/RestaurantLogin", (req, res) => {
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
            const id = result[0].id;
            const token = jwt.sign({ id }, "AWAgroup8", {
              expiresIn: 60 * 60 * 24,
            });
            res.json({ auth: true, token: token, result: result });
          } else {
            res.json({ auth: false, message: "wrong username/password" });
          }
        });
      } else {
        res.json({ auth: false, message: "no user exists" });
      }
    }
  );
});

//------------------------------------------------------------------------------

//food item creation
app.post(
  "/createMenuItem",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const idmenu = req.body.idmenu;
    const idrestaurant = req.body.idrestaurant;
    const idorder = req.body.idorder;
    const productname = req.body.productname;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;

    db.query(
      "INSERT INTO menu (idmenu, idrestaurant, idorder, productname, description, price, image) VALUES (?,?,?,?,?,?)",
      [idmenu, idrestaurant, idorder, productname, description, price, image],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  }
);

app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});
