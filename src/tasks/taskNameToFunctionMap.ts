import generateTeam from './generateTeam'

export const taskNameToFunction: { [key: string]: Function } = {
  'generate-team': generateTeam,
}
