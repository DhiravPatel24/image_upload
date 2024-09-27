const express = require('express')
const {connectionToDatabase} = require('./connection/connection.js')
const productRoutes = require('./routes/productRoutes.js')
require('dotenv').config();
const PORT = process.env.PORT

const app = express();
app.use(express.json());

connectionToDatabase()

app.get('/',(req,res)=>{
    res.json({
        message:"hello"
    })
})

app.use('/api/product', productRoutes)
app.use('/uploads', express.static('uploads'));

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})