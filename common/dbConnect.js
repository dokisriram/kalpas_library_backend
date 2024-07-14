import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()

// function for database connectivity

export default function dbConnect(){
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log('Database Connected Successfully')
    }).catch((err) => {
        console.log('Error in Database Connection', err.message)
    })
}