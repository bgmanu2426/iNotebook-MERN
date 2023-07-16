const express = require('express')
const connectToMongo = require('./config/db')
var cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT ?? 5000;
const app = express();
connectToMongo();

// Express Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// set CORS origin
app.use(cors(
  {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
))

require("./routes/user.routes")(app);
require("./routes/notes.routes")(app);

app.listen(port, () => {
  console.log(`App is listning on http://localhost:${port}`);
})
