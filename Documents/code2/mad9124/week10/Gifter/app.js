require('./startup/connectDatabase')();
const express = require('express');
const app = express();

// Apply global middleware with app.use()
//cors helmet xss
const cors = require('cors');
app.use(cors());
app.use(express.json());


// Add the health check route
app.get('/', (req, res) => res.send({ data: { healthStatus: 'UP' } }));

// Link the auth and api route handler modules
app.use('/auth', require('./routes/auth'));
app.use("/api/people", require("./routes/auth/people"));
app.use("/api/gifts", require("./routes/auth/gifts"));

// Apply the global error handler middleware
app.use(require('./middleware/logErrors'));
app.use(require('./middleware/errorHandler'));

// Export the `app` object
module.exports = app;