import {
  arrayToSpeakFriendlyString,
  getUserIdFromUserInputReference,
} from './general'
import { ITask } from '../types'
import {
  filter,
  splitEvery,
  pipe,
  replace,
  split,
  reduce,
  test,
  clone,
  forEach,
  map,
} from 'ramda'
import sendMessageToUser from './web/sendMessageToUser'

const removeTaskName = (text: string) =>
  text.includes(' ') ? text.replace(/^.*? /g, '') : ''

const filterOutFalsyValues: any = filter(i => Boolean(i))

export const createGetErrorText = (taskName: string) => (reason: string) =>
  `\`[codebot/${taskName}]:\` ${reason}`

export const getTaskName = (text: string) =>
  text.indexOf(' ') > -1 ? text.substring(0, text.indexOf(' ')) : text

export const addValueToNonValueFlags = (arr: (string)[]) => {
  const checkIsFlag = (item: string) => Boolean(item && item.includes('--'))

  const clonedArr = clone(arr)

  for (let i = 0; i < clonedArr.length; i += 2) {
    const isLast = i === clonedArr.length - 1
    const isFlag = checkIsFlag(clonedArr[i])
    const nextItemIsFlag = checkIsFlag(clonedArr[i + 1])

    if ((isLast && isFlag) || (isFlag && nextItemIsFlag)) {
      clonedArr.splice(i + 1, 0, 'true')
    }
  }

  return clonedArr
}

const getFlags = pipe(
  removeTaskName,
  replace(/.+?(?=--)/, ''),
  split(' '),
  addValueToNonValueFlags,
  splitEvery(2),
  reduce(
    (acc, [key, value]) => ({
      ...acc,
      [(key as string).replace(/-/g, '')]: value,
    }),
    {},
  ),
)

const getParameters: (text: string) => string[] = pipe(
  removeTaskName,
  replace(/-.*/g, ''),
  split(' '),
  filterOutFalsyValues,
)

export const getTaskInstructions = (text: string) => {
  const taskName = text.split(' ')[0]
  const parameters = getParameters(text)

  const hasFlags = pipe(
    removeTaskName,
    test(/--/),
  )(text)

  const flags: { [key: string]: string } = !hasFlags ? {} : getFlags(text)

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

const createMessageForUser = (team: string[]) => (user: string) => ({
  user,
  message: `Here is your team: ${arrayToSpeakFriendlyString(team)}`,
})

const createAllMessages = (team: string[]) =>
  map(
    pipe(
      getUserIdFromUserInputReference,
      createMessageForUser(team),
    ),
  )(team)

export const sendTeamToAllPlayers = forEach(
  pipe(
    createAllMessages,
    forEach(sendMessageToUser),
  ),
)
