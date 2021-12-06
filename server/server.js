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
    origin: ["http://localhost:3000"],
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
  new BasicStrategy(function (username, password, done) {
    db.query(
      "SELECT * FROM user WHERE username = ?",
      username,
      (err, result) => {
        if (err) {
          done({ err: err });
        }
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              done(null, result[0]);
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
  new JwtStrategy(jwtOptions, function (jwtpayload, done) {
    console.log("payload is as follows: " + jwtpayload);

    done(null, jwtpayload);
  })
);

app.post(
  "/UserLogin",
  passport.authenticate("auth1", { session: false }),
  (req, res) => {
    console.log(req.user);
    const body = {
      iduser: req.user.iduser,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      username: req.user.username,
      address: req.user.address,
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
    res.json({ auth: true, token: token });
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
      [
        restaurantname,
        username,
        hash,
        address,
        operatinghours,
        type,
        pricelevel,
      ],
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
  new BasicStrategy(function (username, password, done) {
    db.query(
      "SELECT * FROM restaurant WHERE username = ?",
      username,
      (err, result) => {
        if (err) {
          done({ err: err });
        }
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              done(null, result[0]);
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

//restaurant login
app.post(
  "/RestaurantLogin",
  passport.authenticate("auth2", { session: false }),
  (req, res) => {
    console.log(req.user);
    const body = {
      idrestaurant: req.user.idrestaurant,
      restaurantname: req.user.restaurantname,
      username: req.user.username,
      address: req.user.address,
      operatinghours: req.user.operatinghours,
      type: req.user.type,
      pricelevel: req.user.pricelevel,
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
    res.json({ auth: true, token: token });
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

//fetch all restaurant data
app.get("/fetchData/restaurants", passport.authenticate("auth1", { session: false }), (req, res) => {

  const restaurantname = req.body.restaurantname;
  const type = req.body.type;
  const pricelevel = req.body.pricelevel;

    db.query(
      "SELECT restaurantname, type, pricelevel FROM restaurant",
      [restaurantname, type, pricelevel],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values read");
        }
      }
    );
});



//Order----------
app.post(
  "/createOrder", (req, res) =>{
    const restaurantID = req.body.restaurantID;
    const userID = req.body.userID;
    const price = req.body.price;
    const status = "In Progress";

    db.query(
      "INSERT INTO food.order (iduser, price, status, idrestaurant) VALUES (?, ?, ?, ?)",
      [userID, price, status, restaurantID],
      (err, result) =>{
        if (err) {
          console.log(err);
        } else {
          res.send("Values read");
        }
      }
    )
  }
)

app.get("/getOrder", (req, res)=>{
  const restaurantID = req.body.restaurantID;
  const userID = req.body.userID;
  const price = req.body.price;

  db.query(
    "SELECT iduser, price, idrestaurant FROM food.order",
    [userID, price, restaurantID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
  
})

app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});
