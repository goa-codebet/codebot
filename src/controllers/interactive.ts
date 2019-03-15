import { RequestHandler } from 'express'
import { IInteractivityPayload, IInteractivityResponse } from '../types'
import axios from 'axios'

const interactiveController: RequestHandler = (req, res) => {
  res.status(200).end()
  const payload = JSON.parse(req.body.payload) as IInteractivityPayload
  const message: IInteractivityResponse = {
    text: `${payload.user.name} clicked: ${payload.actions[0].name}`,
    replace_original: false,
    response_type: 'in_channel',
  }
  axios.post(payload.response_url, message)
}

export default interactiveController
