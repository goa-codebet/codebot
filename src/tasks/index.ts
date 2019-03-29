import { ISlashRequest, ISlashResponse } from '../types'
import taskNameToTask from './taskNameToTaskMap'
import { getTaskInstructions, getHelpText } from '../utils/tasks'

export const getResponseBody = (
  slashRequestBody: ISlashRequest,
): ISlashResponse => {
  const { taskName, parameters, flags } = getTaskInstructions(
    slashRequestBody.text,
  )
  const task = taskNameToTask[taskName]

  if (
    !task ||
    parameters[0] === 'help' ||
    flags.help ||
    (task.validate && task.validate({ parameters, flags }))
  )
    return {
      text: !task
        ? getHelpText(taskNameToTask)
        : parameters[0] === 'help' || flags.help
        ? task.guide
        : (task.validate({ parameters, flags }) as string),
      response_type: 'ephemeral',
    }

  return task.function({ parameters, flags }, slashRequestBody)
}
