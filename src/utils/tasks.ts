import { pipe } from 'ramda'
import { arrayToSpeakFriendlyString } from './general'
import { ITask } from '../types'

export const createGetErrorText = (taskName: string) => (reason: string) =>
  `\`[codebot/${taskName}]:\` ${reason}`

export const getTaskName = (text: string) =>
  text.indexOf(' ') > -1 ? text.substring(0, text.indexOf(' ')) : text

export const getTaskInstructions = (text: string) =>
  text.substring(text.indexOf(' ') + 1, text.length)

export const getHelpText = (taskNameToTask: { [key: string]: ITask }) =>
  pipe(
    Object.keys,
    arrayToSpeakFriendlyString,
    avilableCommands => `Available commands are: \`${avilableCommands}\``,
  )(taskNameToTask)
