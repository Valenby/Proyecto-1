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
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const postgresql_1 = __importDefault(require("./utils/postgresql"));
const socket_io_1 = require("socket.io");
const ioController_1 = require("./controllers/ioController");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app); // el servidor de expres con sever
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
const PORT = 3000;
app.use(express_1.default.json());
app.use('/', routes_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.MONGODB_CONNECTION === undefined) {
            throw new Error("MONGODB_CONNECTION no esta definido");
        }
        yield postgresql_1.default.sync();
        yield mongoose_1.default.connect(process.env.MONGODB_CONNECTION);
        console.log("conexion a la base de datos exitosa");
        io.on("connection", ioController_1.ws_io);
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
