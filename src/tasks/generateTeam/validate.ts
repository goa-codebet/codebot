import { createGetErrorText } from '../../utils/tasks'
import task from '.'

const validate = (instructions: string): null | string => {
  const getErrorText = createGetErrorText(task.name)
  if (!instructions.length) return getErrorText('You must enter instructions')
  return null
}

export default validate
