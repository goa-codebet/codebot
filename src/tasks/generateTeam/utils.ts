import { splitEvery } from 'ramda'
import { arrayToSpeakFriendlyString } from '../../utils/general'

export const getTeams = (players: string[], teamSize: number | false) =>
  splitEvery(teamSize || players.length / 2, players)
export const getTeamPresentationText = (teams: string[][]) =>
  teams.reduce((acc, val, index) => {
    return `${acc}\nTeam ${index + 1}: ${arrayToSpeakFriendlyString(val)}`
  }, '')
