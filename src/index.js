const express = require('express');
const {createServer}= require('http');
const path = express('path');

const app = express();
const httpServer=createServer(app)

httpServer.listen(process.env.PORT || 3000);

//Ejecutamos la función de sockets.js
require('./sockets')(socketio);

//Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Lanzamos el servidor
app.get("/", (req, res) =>{
    res.sendFile(__dirname +"public");
});
