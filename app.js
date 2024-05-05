require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./server/database/db");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const User = require("./server/models/User");
const methodOverride = require("method-override");

const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

connectDB();

app.use(passport.initialize());
app.use(passport.session());

//Static Files
app.use(express.static("public"));

//Templating Engines
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

const port = 3000 || process.env.PORT;

//Routes
app.use("/", require("./server/routes/auth"));
app.use("/", require("./server/routes/index"));
app.use("/", require("./server/routes/dashboard"));

//Handle 404
app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
