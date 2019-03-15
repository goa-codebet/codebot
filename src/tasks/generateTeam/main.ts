import { ISlashResponse, ITaskFunctionParams } from '../../types'
import { pipe, map } from 'ramda'
import {
  splitString,
  shuffleArray,
  chunkArray,
  arrayToSpeakFriendlyString,
} from '../../utils/general'

const main = ({ instructions }: ITaskFunctionParams): ISlashResponse =>
  pipe(
    splitString(' '),
    shuffleArray,
    chunkArray,
    map(arrayToSpeakFriendlyString),
    ([teamOne, teamTwo]): ISlashResponse => ({
      text: `Teams have been generated!\nTeam A: ${teamOne}\nTeam B: ${teamTwo}`,
      response_type: 'in_channel',
    }),
  )(instructions)

export default main
