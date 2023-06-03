"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const http = require('http');
const { default: mongoose } = require("mongoose");
const sequelize = require('./utils/postgresql');
const { Server } = require('socket.io');
const { ws_io } = require('./controllers/ioController');
const app = (0, express_1.default)();
const server = http.createServer(app); // el servidor de expres con sever
const io = new Server(server, { cors: { origin: "*" } });
const PORT = 3000;
app.use(express_1.default.json());
app.use('/', routes_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.sync();
        yield mongoose.connect(process.env.MONGODB_CONNECTION);
        console.log("conexion a la base de datos exitosa");
        io.on("connection", ws_io);
        server.listen(PORT, () => {
            console.log('Port listening');
        });
    }
    catch (error) {
        console.log("tuvimos un error campeon xd");
        console.error(error);
        process.exit(1);
    }
});
start();
