require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import slashController from './controllers/slash'
import authController from './controllers/auth'

const app = express()
const PORT = process.env.PORT || 3030

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('tiny'))

app.post('/slash', slashController.store)
app.get('/auth', authController.index)

const onServerStartListen = () =>
  console.log(`Server is running on port: ${PORT}`)

app.listen(PORT, onServerStartListen)
