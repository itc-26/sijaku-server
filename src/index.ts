import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import {dbConfig} from "./configs/connection.config";
import morgan from "morgan"; 

const app = express();


app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({
    extended: true
}))


mongoose.connect(dbConfig as string)
    .then(() => {
        console.log("db started");
        
        app.listen(process.env.PORT || 5000, () => {
            console.log("app started");
            
        })
    })
    .catch((e) => {
        console.log(e);
        console.log("db failed to connect");
    })