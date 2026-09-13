const express = require("express");
const path = require("path");
const cors = require("cors");
require('dotenv').config(); 
const { connectToMongoDB } = require("./db/connection");

const app = express();
const PORT_NUMBER = 8080;

// enable cors for angular frontend
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static stuff
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use(express.static("public/imgs"));
app.use(express.static("public/css"));

// connect to mongodb
connectToMongoDB();

// import all routes
const authRoutes = require("./routes/authenticate");
const dashboardRoutes = require("./routes/dashboard");
const recipeRoutes = require("./routes/recipes");
const inventoryRoutes = require('./routes/inventory');
const healthAnalysisRoutes = require('./routes/healthAnalysis');
const translationService = require('./routes/translationService');

// use routes under /api
app.use("/api", authRoutes);
app.use("/api", dashboardRoutes); 
app.use("/api", recipeRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', healthAnalysisRoutes);
app.use('/api', translationService);

// redirect url to frontend register page
app.get("/", (req, res) => {
  res.redirect("http://localhost:4200/register");
});

app.listen(PORT_NUMBER, () => {
  console.log(`Listening on http://localhost:${PORT_NUMBER}`);
});
