const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');



require('dotenv').config();


const app =express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection extablished successfully");
});

const exerciseRouter = require('./route/exercises');
const usersRouter = require('./route/users');

app.use('/exercises',exerciseRouter);
app.use('/users',usersRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'/client/build')));

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname,"client", "build" ,"index.html"));
    });
}else{
    app.get("/" ,(req,res) => {
        res.send("API running");
    })
}

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});