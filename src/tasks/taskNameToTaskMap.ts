import generateTeam from './generateTeam'
import { ITask } from '../types'

const taskNameToTask: { [key: string]: ITask } = {
  'generate-team': generateTeam,
}

export default taskNameToTask
