//inicialización del cliente en express
const express = require('express');
const PORT = 3000;
const app = express();

//creamos respuesta
app.get('/', (req, res) => {
    res.send('App books')
});

const list = [
    {
        id: 1,
        name: 'El problema de los tres cuerpos',
        author: 'Cixin Liu',
        description: '"El problema de los tres cuerpos" arranca en la Revolución cultural china y salta uno años para seguir el proyecto gubernamental secreto Costa Roja. Un proyecto de busca de vida extraterrestre en el que trabaja Ye Wenjie, científica hija de un profesor purgado en esa época.',
        
    }
]




app.listen(PORT, () => {
    console.log('Port listening')
});