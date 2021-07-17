import 'reflect-metadata'
import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'

import { router } from './routes'
import { errorHandler } from './middleware/errorHandler'

import './database/connect'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 5000

app.use(express.json())

app.use(router)

app.use(errorHandler)

app.listen(PORT, () => console.log(`🔥 Listening on port ${PORT}`))
