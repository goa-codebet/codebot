import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import slashController from './controllers/slash'
import interactiveController from './controllers/interactive'

const app = express()
const PORT = process.env.PORT || 3030

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('tiny'))

app.post('/slash', slashController)
app.post('/interactive', interactiveController)

const onServerStartListen = () =>
  console.log(`Server is running on port: ${PORT}`)
app.listen(PORT, onServerStartListen)
