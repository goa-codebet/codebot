import { ISlashRequestBody } from '../types'
import { arrayToSpeakFriendlyString } from '../utils/general'
import { pipe } from 'ramda'
import { taskNameToFunction } from './taskNameToFunctionMap'

const getTaskName = (text: string) =>
  text.indexOf(' ') > -1 ? text.substring(0, text.indexOf(' ')) : text

const getTaskInstructions = (text: string) =>
  text.substring(text.indexOf(' ') + 1, text.length)

const getHelpText = (taskNameToFunction: { [key: string]: Function }) =>
  pipe(
    Object.keys,
    arrayToSpeakFriendlyString,
    avilableCommands => `Available commands are: \`${avilableCommands}\``,
  )(taskNameToFunction)

export const getResponseText = (slashRequestBody: ISlashRequestBody) => {
  const taskFunction = taskNameToFunction[getTaskName(slashRequestBody.text)]
  if (!taskFunction) return getHelpText(taskNameToFunction)
  const taskResponse = taskFunction(getTaskInstructions(slashRequestBody.text))
  if (!taskResponse) return getHelpText(taskNameToFunction)
  return taskResponse
}
