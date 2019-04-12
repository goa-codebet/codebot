import { RequestHandler } from 'express'
import axios from 'axios'
import qs from 'querystring'

const index: RequestHandler = (req, res) => {
  const getParams = qs.stringify({
    code: req.query.code,
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET,
    redirect_uri: process.env.SLACK_OAUTH_REDIRECT_URI,
  })

  axios
    .get(`https://slack.com/api/oauth.access?${getParams}`)
    .then(response => {
      console.log(response.data)

      res.send('Success!')
    })
    .catch(() => res.sendStatus(400))
}

export default { index }
