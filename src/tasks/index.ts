import { ISlashRequestBody } from '../types'
import { arrayToSpeakFriendlyString } from '../utils/general'
import generateTeam from '../tasks/generateTeam'

export const taskNameToFunction: { [key: string]: Function } = {
  'generate-team': generateTeam,
}
export const getTaskName = (text: string) =>
  text.indexOf(' ') > -1 ? text.substring(0, text.indexOf(' ')) : text
export const getTaskInstructions = (text: string) =>
  text.substring(text.indexOf(' ') + 1, text.length)
export const getTaskFunction = (text: string) => {
  const taskName = getTaskName(text)
  return taskNameToFunction[taskName]
}
const getHelpText = () => {
  const availableCommands = Object.keys(taskNameToFunction)
  const availableCommandsText = arrayToSpeakFriendlyString(availableCommands)

  return `Available commands are: \`${availableCommandsText}\``
}

export const getResponseText = (slashRequestBody: ISlashRequestBody) => {
  const taskFunction = getTaskFunction(slashRequestBody.text)
  if (!taskFunction) return getHelpText()
  const taskResponse = taskFunction(getTaskInstructions(slashRequestBody.text))
  if (!taskResponse) return getHelpText()
  return taskResponse
}
