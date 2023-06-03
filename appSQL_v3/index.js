require("dotenv").config();

const express = require('express');
const Routes = require("./routes")
const http = require('http');


const { default: mongoose } = require("mongoose");
const sequelize  = require('./utils/postgresql');
const {Server} = require('socket.io');
const {ws_io} = require('./controllers/ioController');

const app = express();
const server = http.createServer(app);// el servidor de expres con sever
const io = new Server(server, { cors: {origin: "*"} } );


const PORT = 3000;

app.use(express.json());
app.use('/',  Routes)



const start = async () => {
    try {
        await sequelize.sync()
        await mongoose.connect(process.env.MONGODB_CONNECTION);

        console.log("conexion a la base de datos exitosa")

        io.on("connection",ws_io);
        
        server.listen(PORT, () => {
            console.log('Port listening')
        });   
    } catch (error) {
        console.log("tuvimos un error campeon xd")
        console.error(error);
        process.exit(1);
    }
}

start();

