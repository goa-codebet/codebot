import {
  arrayToSpeakFriendlyString,
  shuffleArray,
  splitString,
  chunkArray,
} from '../utils/general'
import { createGetErrorText } from '../utils/tasks'
import { pipe, map } from 'ramda'
import { ITask } from '../types'

const validate = (instructions: string) => {
  const getErrorText = createGetErrorText(task.name)

  if (!instructions.length) return getErrorText('You must enter instructions')

  if (instructions.split(' ').length % 2 !== 0)
    return getErrorText('You must enter an even amount of players')

  return true
}

const main = (instructions: string): [string, boolean] => {
  if (typeof validate(instructions) === 'string')
    return [validate(instructions) as string, true]

  return pipe(
    splitString(' '),
    shuffleArray,
    chunkArray,
    map(arrayToSpeakFriendlyString),
    ([teamOne, teamTwo]) => [
      `Teams have been generated!\nTeam A: ${teamOne}\nTeam B: ${teamTwo}`,
      false,
    ],
  )(instructions) as [string, boolean]
}

const task: ITask = {
  name: 'generate-team',
  function: main,
  guide:
    'Usage: `/codebot generate-team [names space seperated]`\nExample: `/codebot generate-team @x @y @z @t`',
}

export default task
