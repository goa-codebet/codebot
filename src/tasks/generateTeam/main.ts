import { ISlashResponse, ITaskFunctionParams } from '../../types'
import { shuffleArray } from '../../utils/general'
import {
  getTeamSize,
  getPlayers,
  getTeams,
  getTeamPresentationText,
} from './utils'

const main = ({ instructions }: ITaskFunctionParams): ISlashResponse => {
  const teamSize = getTeamSize(instructions)
  const players = getPlayers(instructions, Boolean(teamSize))
  const shuffledPlayers = shuffleArray(players)
  const teams = getTeams(shuffledPlayers, teamSize)

  return {
    text: getTeamPresentationText(teams),
    response_type: 'in_channel',
  }
}

export default main
