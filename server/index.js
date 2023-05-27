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
app.use(cors())

require("./routes/user.routes")(app);
require("./routes/notes.routes")(app);

app.listen(port, () => {
  console.log(`App is listning on http://localhost:${port}`);
})
