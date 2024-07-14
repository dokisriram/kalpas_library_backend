import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dbConnect from './common/dbConnect.js';

import userRoute from './routes/userRoute.js'
import booksRoute from './routes/bookRoute.js';
import libraryRoute from './routes/libraryRoute.js'
import validateToken from './common/verifyToken.js';

const app = express();
dbConnect();
app.use(cors());
app.use(express.json())

app.use('/', userRoute);


app.use(validateToken);

app.use('/', booksRoute);
app.use('/', libraryRoute);


app.listen(8080, ()=> {
    console.log("server is running on 8080");
})