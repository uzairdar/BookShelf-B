const router = require("express").Router();
let User = require("../models/User.model");
let jwt = require("jsonwebtoken");

router.route("/createaccount").post((req, res) => {
  const { username, email, password } = req.body;
  //   const isVerified = false;
  const newUser = new User({
    username,
    email,
    password,
  });
  newUser
    .save()
    .then((user) => {
      //   console.log("check", user);
      if (user) {
        jwt.sign({ user: user }, "secretkey", (error, token) => {
          return res.status(200).json({
            message: "User added successfully",
            user,
            token,
          });
        });
      }
    })
    .catch((error) => {
      if (error.code === 11000) {
        res.status(409).json({ message: "Email already exists", error: error });
      } else {
        console.log("errorsss", error);
        res.status(400).json({ message: "User cannot be added!", error });
      }
    });
});
router.route("/loaduser/:token").post((req, res) => {
  const token = req.params.token;
  jwt.verify(token, "secretkey", (error, authData) => {
    if (error) {
      res.status(403).json({ error, message: "User not found" });
    } else {
      console.log(authData);
      const id = authData.user._id;
      // console.log(id)
      User.findById(id)
        .then((user) => {
          if (user) {
            return res.json({ user });
          } else {
            return res.json({ message: "User not found" });
          }
        })
        .catch((error) => {
          return res.json({ error });
        });
    }
  });
});
router.route("/login").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email, password })
    .then((user) => {
      if (user) {
        console.log(user);
        jwt.sign({ user }, "secretkey", (error, token) => {
          res.json({
            token,
            user,
          });
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});
module.exports = router;
