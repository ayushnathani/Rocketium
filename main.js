const express = require('express');
const app = express();
const http = require("http");
const path = require('path');


app.use(express.static(path.resolve(__dirname, 'public')));
var mongodb = require('mongodb');
var dbConn = mongodb.MongoClient.connect('mongodb://5f2bfc5d9a5ba507a8ea52b9:c22osqlokisj9qtfc22osqlokisj9qtg@128.199.17.119:3002/c22osqlokisj9qta?authSource=admin', { useUnifiedTopology: true });
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://5f2bfc5d9a5ba507a8ea52b9:c22osqlokisj9qtfc22osqlokisj9qtg@128.199.17.119:3002/c22osqlokisj9qta?authSource=admin";

app.use("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
   });

app.post('/add-species', function (req, res) {
    dbConn.then(function(db) {
        
        db.collection('bird-species').insertOne(req.body ,function(err,res){
            if(err) throw err;
            console.log("1 document inserted");
        db.close();
        } );
    });    
    res.send('Data received:\n' + JSON.stringify(req.body));
});

app.get('/view-species',  function(req, res) {
    dbConn.then(function(db) {
        
        db.collection('bird-species').find({}).toArray().then(function(species) {
            res.status(200).json(species);
        });
    });
});


app.listen(3001, () => {
    console.log(`Discussion app listening at http://localhost:${3001}`);
  });