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
    .catch(() => {}) // simply ignore error if the user wasn't found

export default sendMessageToUser
