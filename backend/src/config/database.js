const mongoose=require('mongoose');

function connecttoDB(){
    mongoose.connect(process.env.URI).then(()=>{
        console.log('Connected to database');
    })

}

module.exports=connecttoDB;