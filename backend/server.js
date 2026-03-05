const app=require('./src/app')
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const connecttoDB=require('./src/config/database');
require('dotenv').config();

connecttoDB();

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

