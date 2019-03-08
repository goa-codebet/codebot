import { ISlashRequestBody, ITask } from '../types'
import { arrayToSpeakFriendlyString } from '../utils/general'
import { pipe } from 'ramda'
import generateTeam from './generateTeam'

const taskNameToTask: { [key: string]: ITask } = {
  'generate-team': generateTeam,
}

const getTaskName = (text: string) =>
  text.indexOf(' ') > -1 ? text.substring(0, text.indexOf(' ')) : text

const getTaskInstructions = (text: string) =>
  text.substring(text.indexOf(' ') + 1, text.length)

const getHelpText = (taskNameToTask: { [key: string]: ITask }) =>
  pipe(
    Object.keys,
    arrayToSpeakFriendlyString,
    avilableCommands => `Available commands are: \`${avilableCommands}\``,
  )(taskNameToTask)

export const getResponseText = (
  slashRequestBody: ISlashRequestBody,
): [string, boolean] => {
  const task = taskNameToTask[getTaskName(slashRequestBody.text)]
  if (!task) return [getHelpText(taskNameToTask), true]

  const instructions = getTaskInstructions(slashRequestBody.text)
  if (instructions === 'help') return [task.guide, true]

  return task.function(getTaskInstructions(slashRequestBody.text))
}
