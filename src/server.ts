import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import { AppDataSource } from "./database/dataSource"
import routers from './app/routes'
import httpErrorMiddleware from './app/middlewares/ErroMiddlewares'

const app = express()

app.use(cors())

app.use(express.json())

app.use(routers)

//Quando tiver um erro esse erro vai ser capturado
app.use(httpErrorMiddleware)


AppDataSource.initialize().then(async () => {
    console.log('DataBase start')
    app.listen(process.env.PORT || 3000, () => {
        console.log('Serve Started!')
    })
})