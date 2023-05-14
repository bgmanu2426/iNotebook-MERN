const express = require('express')
const connectToMongo = require('./config/db')
require('dotenv').config()

const port =  process.env.PORT
const app = express();
connectToMongo();

// Express Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require("./routes/user.routes")(app);

app.listen(port, () => {
  console.log(`App is listning on http://localhost:${port}`);
})
