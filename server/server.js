const express = require("express");
const app = express();
const cors = require("cors");
const client = require('prom-client');

const register = new client.Registry();
// Create a counter metric
const httpRequestsCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path'],
});

register.registerMetric(httpRequestsCounter);

// Add a default metrics collection
client.collectDefaultMetrics({ register });

// Increment counter for each request
app.use((req, res, next) => {
  httpRequestsCounter.inc({ method: req.method, path: req.path });
  next();
});

// Expose metrics at /metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

require("dotenv").config();
const port = process.env.PORT || 9000;
app.use(
  cors()
);
app.use(express.json());
app.use(require("./routes/record"));
app.get("/", function (req, res) {
  res.send("App is running");
});
const dbo = require("./db/conn");


dbo.connectToMongoDB(function (error) {
  if (error) throw error;
console.log("the server is running");
});
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
