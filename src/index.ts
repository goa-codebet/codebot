import express from 'express'
import bodyParser from 'body-parser'
import { ISlashRequestBody, ISlashResponseBody } from './types'
import { getResponseText } from './tasks'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/', (req, res) => {
  const body = req.body as ISlashRequestBody
  const [text, error] = getResponseText(body)

  const responseBody: ISlashResponseBody = {
    response_type: error ? 'ephemeral' : 'in_channel',
    text,
  }

  res.send(responseBody)
})

app.listen(3030, () => console.log('Server is runninng'))
