const { log } = require('console');
const express = require('express');

const app= express();

app.get('/', (req,res) =>{
    //res.end('Bienvenido al server'),
    res.sendFile(__dirname+'/public/index.html')
})

//Para acceder a las rutas
app.use('/public', express.static(__dirname+'/public'));
app.use('/src', express.static(__dirname+'/src'));
app.use('/node_modules', express.static(__dirname+'/node_modules'));

// Confugurar server basico
app.listen(5003, function(){
    console.log("Servidor NODE corriendo correctamente");
})