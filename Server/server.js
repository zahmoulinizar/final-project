const express = require('express')
const app = express()
const port = 5500
const connectDB = require('./config/Connectdb')
const cors = require('cors')

// import the router user
app.use(express.json({limit: '50mb'}))
//app.use(express.limit(100000000))
// import cors
app.use(cors())
app.use("/user" , require('./routes/user')) 
app.use("/prod" , require('./routes/product'))
// invoque the connectDB 
 connectDB()
app.listen(port , ()=> {
    console.log('server started')
})

