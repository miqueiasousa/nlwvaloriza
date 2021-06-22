import 'reflect-metadata'
import express from 'express'

import { router } from './routes'

import './database/connect'

const app = express()
const PORT = Number(process.env.PORT) || 5000

app.use(express.json())

app.use(router)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
