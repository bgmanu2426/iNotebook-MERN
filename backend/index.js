const connectToMongo = require('./db');
const express = require('express')

const app = express()
const port = 5000
connectToMongo();

app.use(express.json())

//Avilable routes
app.use('/api/auth', require('./routes/user.routes'))
app.use('/api/notes', require('./routes/notes.routes'))

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})