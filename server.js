const express = require('express')
const connectDB = require('./config/db')
const app = express();
const cors = require('cors');

connectDB();

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json({
    extended: false
}))

app.get('/',(req,res)=>{
    res.send('API Running')
})

app.use('/api/user',require('./routes/api/user'))

app.listen(PORT, ()=>{
    console.log(`Server Started on Port ${PORT}`)
})

