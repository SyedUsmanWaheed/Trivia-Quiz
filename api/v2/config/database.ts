import dotenv, { DotenvConfigOutput } from "dotenv"
const output: DotenvConfigOutput = dotenv.config()
import mongoose from "mongoose"

let databaseURL: string =  "mongodb://127.0.0.1:27017/quiz_system"

// Mongoose connecting event
mongoose.connection.on('connecting', () => {
    console.info('Mongoose connecting to ')
})

// Mongoose conneccted event
mongoose.connection.on('connected', () => {
    console.info('Mongoose connected to ')
})

// Mongoose open event
mongoose.connection.once('open', () => {
    console.info('Mongoose connection opened to ')
})

// Mongoose reconnected event
mongoose.connection.on('reconnected', () => {
    console.info('Mongoose reconnected to ')
})

// Mongoose disconnected event
mongoose.connection.on('disconnected', () => {
    console.info('Mongoose disconnected')
    //console.log(dbURI);
})

// Mongoose error event
mongoose.connection.on('error', (error) => {
    console.error('Mongoose: ' + error)
    mongoose.disconnect()
})

// Mongoose SIGINT event
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.info('Mongoose disconnected through app termination')
        process.exit(0)
    })
})


mongoose.connect(databaseURL)