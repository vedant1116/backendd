const express=require('express');
const noteModel=require('./model/note.model');
const app=express();
app.use(express.json());
const path=require('path');

const cors = require("cors")
app.use(cors())
app.use(express.static('./public/dist'))
 app.post('/api/notes',async(req , res)=>{
    const {title,content}=req.body;
    const note= await   noteModel.create({
       title,content
    })

    res.status(201).json({
        message:"note created successfully",
        note
    })
 })

 app.get('/api/notes',async(req,res)=>{
    const notes= await noteModel.find()

    res.status(200).json({
        message:"notes fetched succesfully",
        notes
    })
 })

app.delete('/api/notes/:id',async(req,res)=>{
    const id=req.params.id;

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"notes deleted successfully"
        
    })
})


app.patch('/api/notes/:id',async(req,res)=>{
    const id=req.params.id;
    const content=req.body;
  await noteModel.findByIdAndUpdate(id,content)

  res.status(200).json({
    message:"notes updated successfully"
  })
})
console.log(__dirname);

app.use('*name',(req,res)=>{
 res.sendFile(path.join(__dirname,'..','/public/dist/index.html'))
})
module.exports=app;
