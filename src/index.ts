import express from 'express'
import bodyParser from 'body-parser'
import { ISlashRequestBody } from './types'
import { getResponseText } from './tasks'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/', (req, res) => {
  const body = req.body as ISlashRequestBody
  res.send(getResponseText(body))
})

app.listen(3030, () => console.log('Server is runninng'))
