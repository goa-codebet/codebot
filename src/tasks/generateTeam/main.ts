import { ISlashResponse, ITaskFunctionParams } from '../../types'
import { shuffleArray } from '../../utils/general'
import { getTeams, getTeamPresentationText } from './utils'
import { sendTeamToAllPlayers } from '../../utils/tasks'

const main = ({ parameters, flags }: ITaskFunctionParams): ISlashResponse => {
  const teamSize = Number(flags.s || flags.size || parameters.length / 2)
  const teams = getTeams(shuffleArray(parameters), teamSize)

  if (flags.stealth) sendTeamToAllPlayers(teams as any)

  return {
    text: flags.stealth
      ? `Teams have been generated!`
      : `Teams have been generated!\n${getTeamPresentationText(teams)}`,
    response_type: 'in_channel',
  }
}

export default main
