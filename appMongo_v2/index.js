require("dotenv").config();
//inicialización del cliente en express
const express = require('express');
const { default: mongoose } = require("mongoose");
const productRoutes = require("./routes")

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/',  productRoutes)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("conexion a la base de datos exitosa")
        app.listen(PORT, () => {
            console.log('Port listening')
        });   
    } catch (error) {
        console.log("tuvimos un error campeon xd")
        console.error(error);
        process.exit(1);
    }
}

start();

