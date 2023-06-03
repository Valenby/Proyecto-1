require("dotenv").config();

import express  from "express";
import Routes  from "./routes"
import http from 'http';


import { default as mongoose } from "mongoose";
import sequelize from './utils/postgresql';
import { Server } from 'socket.io';
import { ws_io } from './controllers/ioController';

const app = express();
const server = http.createServer(app);// el servidor de expres con sever
const io = new Server(server, { cors: {origin: "*"} } );


const PORT = 3000;

app.use(express.json());
app.use('/',  Routes)



const start = async () => {
    try {

        if (process.env.MONGODB_CONNECTION === undefined) {
            throw new Error("MONGODB_CONNECTION no esta definido");
        }

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

