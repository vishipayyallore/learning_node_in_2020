'use strict';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { webApi } from './app';
import * as colors from 'colors';
const mongoose = require('mongoose');

// Loading Configuration from .env file.
dotenv.config({ path: path.resolve(process.cwd(), 'src/config/appConfig.env') });

logMessage(`Env Port: ${process.env.PORT}`);
const PORT = process.env.PORT || 3060;

mongoose.connect(process.env.MongoDBCONNECTION, {

    useNewUrlParser: true,
    useUnifiedTopology: true

}, (error) => {

    if (error) {

        console.log(`Error Connecting to Cloud MongoDb ${error}`);
        throw new Error(error);

    } else {

        // Connecting to the MongoDb Cloud Instance
        console.log(`Mongo Db Connection: ${process.env.MongoDBCONNECTION}`);
        console.log('Connected to MongoDb in Cloud');

    }

});

webApi.listen(PORT, () => {
    logMessage(`Server Listening at port ${PORT}. http://localhost:${PORT}/api`);
});

function logMessage(message: String) {
    console.log(colors.cyan(`${new Date().toISOString()} :: ${message}`).bold);
}
