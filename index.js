const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5001
const db = require('./config/db')
var bodyParser = require('body-parser')
const bookRoute = require('./routes/bookRoute')
const userRoute = require('./routes/userRoute')
const cors = require('cors')
db()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/books',bookRoute)
app.use('/user',userRoute)

app.listen(port,err=>{
    err?console.log(err): console.log(`go to the port ${port}`)
})

