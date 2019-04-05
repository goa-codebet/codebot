import webClient from '../services/webClient'

interface ISendMessageToUserParams {
  message: string
  user: string
}

const sendMessageToUser = ({ message, user }: ISendMessageToUserParams) =>
  webClient.im
    .open({ user })
    .then(({ channel: { id } }: any) =>
      webClient.chat.postMessage({ channel: id, text: message }),
    )

export default sendMessageToUser
