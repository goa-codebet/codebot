import { ISlashResponse, ITaskFunctionParams } from '../../types'
import { shuffleArray } from '../../utils/general'
import { getTeams, getTeamPresentationText } from './utils'

const main = ({ parameters, flags }: ITaskFunctionParams): ISlashResponse => {
  const teamSize = Number(flags.s || flags.size || parameters.length / 2)
  const teams = getTeams(shuffleArray(parameters), teamSize)

  return {
    text: `Teams have been generated!\n${getTeamPresentationText(teams)}`,
    response_type: 'in_channel',
  }
}

export default main
