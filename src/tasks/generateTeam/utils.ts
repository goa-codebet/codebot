import { splitEvery } from 'ramda'
import { arrayToSpeakFriendlyString } from '../../utils/general'

export const getTeamSize = (instructions: string) =>
  Number(instructions.split(' ')[0]) || false
export const getPlayers = (instructions: string, hasTeamSize: boolean) =>
  hasTeamSize ? instructions.split(' ').slice(1) : instructions.split(' ')
export const getTeams = (players: string[], teamSize: number | false) =>
  splitEvery(teamSize || players.length / 2, players)
export const getTeamPresentationText = (teams: string[][]) =>
  teams.reduce((acc, val, index) => {
    return `${acc}\nTeam ${index + 1}: ${arrayToSpeakFriendlyString(val)}`
  }, '')
