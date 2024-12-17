const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/eCommerce")
.then(()=>{
    console.log("The database is connected successfully....");
})
.catch((err)=>{
    console.log(`The database is not connected successfully there is some error : ${err} `);
})