import {
  arrayToSpeakFriendlyString,
  shuffleArray,
  splitString,
  chunkArray,
} from '../utils/general'
import { createGetErrorText } from '../utils/tasks'
import { pipe, map } from 'ramda'

const task = {
  name: 'generate-team',
}

const validate = (instructions: string) => {
  const getErrorText = createGetErrorText(task.name)

  if (instructions.split(' ').length % 2 !== 0)
    return getErrorText('You must enter an even amount of players')

  return true
}

export default (instructions: string) => {
  if (typeof validate(instructions) === 'string') return validate(instructions)

  return pipe(
    splitString(' '),
    shuffleArray,
    chunkArray,
    map(arrayToSpeakFriendlyString),
    ([teamOne, teamTwo]) => `Team A: ${teamOne}\nTeam B: ${teamTwo}`,
  )(instructions)
}
