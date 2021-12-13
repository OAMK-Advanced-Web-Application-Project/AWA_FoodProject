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
    methods: ["GET", "POST", "PUT"],
    credentials: true,
    optionSuccessStatus: 200,
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

app.use((req, res, next) => {
  console.log("middleware");
  next();
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "AWAgroup8",
};

// user jwt
passport.use(
  "jwt1",
  new JwtStrategy(jwtOptions, function (payload, done) {
    console.log("payload: " + JSON.stringify(payload));
    done(null, JSON.stringify(payload));
  })
);

// test URL for user jwt
app.get(
  "/authCheckUser",
  passport.authenticate("jwt1", { session: false }),
  (req, res) => {
    res.send("you are authenticated!");
  }
);

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

// user basic strategy
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

// user login
app.post(
  "/UserLogin",
  passport.authenticate("auth1", { session: false }),
  (req, res) => {
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
    res.json({ auth: true, token: token });
  }
);

//------------------------------------------------------------------------------

// restaurant jwt

passport.use(
  "jwt2",
  new JwtStrategy(jwtOptions, function (payload, done) {
    console.log("payload: " + JSON.stringify(payload));
    done(null, JSON.stringify(payload));
  })
);

// test URL for restuarant jwt
app.get(
  "/authCheckRestaurant",
  passport.authenticate("jwt2", { session: false }),
  (req, res) => {
    res.send("you are authenticated!");
  }
);

//restaurant signup
app.post("/createRestaurant", (req, res) => {
  const restaurantname = req.body.restaurantname;
  const username = req.body.username;
  const password = req.body.password;
  const address = req.body.address;
  const operatinghours = req.body.operatinghours;
  const type = req.body.type;
  const pricelevel = req.body.pricelevel;
  const image = req.body.image;

  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO restaurant (restaurantname, username, password, address, operatinghours, type, pricelevel, image) VALUES (?,?,?,?,?,?,?,?)",
      [
        restaurantname,
        username,
        hash,
        address,
        operatinghours,
        type,
        pricelevel,
        image,
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

// restaurant basic strategy
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
    const body = {
      id: req.user.idrestaurant,
      restaurantname: req.user.restaurantname,
      username: req.user.restaurantname,
      address: req.user.address,
      operatinghours: req.user.operatinghours,
      type: req.user.type,
      pricelevel: req.user.pricelevel,
      image: req.user.image,
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

//------------------------------------------------------------------------------

//food item creation
app.post(
  "/createMenuItem",
  passport.authenticate("jwt2", { session: false }),
  (req, res) => {
    const idmenu = req.body.idmenu;
    const idrestaurant = req.body.idrestaurant;
    const productname = req.body.productname;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;

    db.query(
      "INSERT INTO menu (idmenu, idrestaurant, productname, description, price, image) VALUES (?,?,?,?,?,?)",
      [idmenu, idrestaurant, productname, description, price, image],
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

// getting restaurant menu in the restaurant mainpage
app.get("/getMenuItems/:idrestaurant", (req, res) => {
  db.query(
    `SELECT idrestaurant, productname, description, price, image FROM menu WHERE idrestaurant =${req.params.idrestaurant}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//fetch all restaurant data
app.get(
  "/fetchData/restaurants",
  passport.authenticate("jwt1", { session: false }),
  (req, res) => {
    db.query(
      "SELECT idrestaurant, restaurantname, type, pricelevel FROM restaurant",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  }
);

//restaurant menu on user side
app.get("/restaurantById/:idrestaurant", async (req, res) => {
  db.query(
    `SELECT productname, description, price FROM menu WHERE idrestaurant=${req.params.idrestaurant}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//Order----------
app.post("/createOrder", (req, res) => {
  const restaurantID = req.body.restaurantID;
  const userID = req.body.userID;
  const price = req.body.price;
  const status = "In Progress";

  db.query(
    "INSERT INTO food.order (iduser, price, status, idrestaurant) VALUES (?, ?, ?, ?)",
    [userID, price, status, restaurantID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values read");
      }
    }
  );
});

app.get("/getOrder/:id", (req, res) => {
  db.query(
    `SELECT iduser, price, status, idrestaurant FROM food.order 
    where iduser = ${req.params.id} AND
    status = "In Progress"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

app.get("/getOrderRestaurant/:id", (req, res) => {
  db.query(
    `Select food.order.idorder, food.order.iduser, food.user.firstname,
    food.user.lastname, food.user.address, food.order.status
    from food.order
    inner join food.user on
    food.order.iduser = food.user.iduser
    where food.order.idrestaurant = ${req.params.id} AND
    food.order.status != "Done";`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

//restaurant image
app.put("/restaurantImage", (req, res) => {
  const image = req.body.image;
  const idrestaurant = req.body.idrestaurant;
  db.query(
    "UPDATE restaurant SET image = ? WHERE idrestaurant = ?",
    [image, idrestaurant],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.get("/getImage/:id", async (req, res) => {
  db.query(
    `SELECT image FROM restaurant WHERE idrestaurant=${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
        console.log(result);
      }
    }
  );
});

app.post("/confirmOrder", (req, res) => {
  const orderid = req.body.orderid;

  db.query(
    "UPDATE food.order SET status = 'Order Confirmed' WHERE idorder = ?",
    [orderid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});
