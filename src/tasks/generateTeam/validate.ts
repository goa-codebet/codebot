import { createGetErrorText } from '../../utils/tasks'
import task from '.'
import { ITask } from '../../types'

const validate: ITask['validate'] = ({ parameters }) => {
  const getErrorText = createGetErrorText(task.name)
  if (!parameters.length) return getErrorText('You must enter parameters')
  return null
}

export default validate
