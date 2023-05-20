const express= require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const mongoose = require("mongoose");

app.use(express.json());
app.use((req,res,next)=>{
    console.log("HTTP Method -" +req.method + ", URL - " + req.url);
    next();
})

app.use("/users",userRoutes);
app.use("/note",noteRoutes);

app.get("/",(req,res)=>{
    res.send("Hello");
});

mongoose.connect("mongodb+srv://knightharsh:harsh@cluster0.iqd5dnx.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    app.listen(5000,()=>{
        console.log("Server started on port no. 5000");
    });
})
.catch((error)=>{
    console.log(error)
})


