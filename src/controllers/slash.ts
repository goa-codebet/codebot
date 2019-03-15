import { RequestHandler } from 'express'
import { getResponseBody } from '../tasks'
import { ISlashRequest } from '../types'
import axios from 'axios'

const slashController: RequestHandler = (req, res) => {
  res.status(200).end()
  const slashRequest = req.body as ISlashRequest
  axios.post(slashRequest.response_url, getResponseBody(slashRequest))
}

export default slashController
