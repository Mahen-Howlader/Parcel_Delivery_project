import { Server } from "http";
import mongoose from "mongoose";
import { app } from "./app";
import { envVars } from "./config/env";
let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect(`${envVars.DB_URL}`);

        console.log("Mongodb Conected..");

        server = app.listen(envVars.PORT, () => {
            console.log("Server is listening to port 5000");
        });
    } catch (error) {
        console.log(error);
    }
};
 startServer();
