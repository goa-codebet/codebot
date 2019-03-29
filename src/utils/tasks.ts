import { arrayToSpeakFriendlyString } from './general'
import { ITask } from '../types'
import { splitEvery, pipe, replace, split, reduce, tap, test } from 'ramda'

export const createGetErrorText = (taskName: string) => (reason: string) =>
  `\`[codebot/${taskName}]:\` ${reason}`

export const getTaskName = (text: string) =>
  text.indexOf(' ') > -1 ? text.substring(0, text.indexOf(' ')) : text

const removeTaskName = replace(/^.*? /g, '')

export const getTaskInstructions = (text: string) => {
  const taskName = text.split(' ')[0]
  const parameters = text.replace(/(^.*? | -.*)/g, '').split(' ')

  const hasFlags = pipe(
    removeTaskName,
    test(/-/),
  )(text)

  const flags = !hasFlags
    ? {}
    : pipe(
        removeTaskName,
        replace(/.+?(?=-)/, ''),
        tap(console.log),
        split(' '),
        splitEvery(2),
        reduce(
          (acc, [key, value]) => ({
            ...acc,
            [(key as string).replace('-', '')]: value,
          }),
          {},
        ),
      )(text)

  return {
    taskName,
    parameters,
    flags,
  }
}

export const getHelpText = (taskNameToTask: { [key: string]: ITask }) =>
  pipe(
    Object.keys,
    arrayToSpeakFriendlyString,
    avilableCommands => `Available commands are: \`${avilableCommands}\``,
  )(taskNameToTask)
