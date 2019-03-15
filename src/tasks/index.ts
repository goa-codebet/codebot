import { ISlashRequest, ISlashResponse } from '../types'
import taskNameToTask from './taskNameToTaskMap'
import { getTaskName, getTaskInstructions, getHelpText } from '../utils/tasks'

export const getResponseBody = (
  slashRequestBody: ISlashRequest,
): ISlashResponse => {
  const task = taskNameToTask[getTaskName(slashRequestBody.text)]
  const instructions = getTaskInstructions(slashRequestBody.text)

  if (
    !task ||
    instructions === 'help' ||
    (task.validate && task.validate(instructions))
  )
    return {
      text: !task
        ? getHelpText(taskNameToTask)
        : instructions === 'help'
        ? task.guide
        : (task.validate(instructions) as string),
      response_type: 'ephemeral',
    }

  return task.function({ instructions }, slashRequestBody)
}
