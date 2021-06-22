import 'reflect-metadata'
import express from 'express'

import './database/connect'

const app = express()
const PORT = Number(process.env.PORT) || 5000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
