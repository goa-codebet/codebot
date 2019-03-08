import { arrayToSpeakFriendlyString, shuffleArray } from '../utils/general'
import { getErrorText } from '../utils/tasks'
import { pipe, map } from 'ramda'

const task = {
  name: 'generate-team',
}

const validate = (instructions: string) => {
  if (instructions.split(' ').length % 2 !== 0)
    return getErrorText('You must enter an even amount of players', task.name)

  return true
}

const chunkArray = (arr: any[]) => [
  arr.slice(0, arr.length / 2),
  arr.slice(arr.length / 2, arr.length),
]

const splitString = (seperator: string) => (string: string) =>
  string.split(seperator)

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
