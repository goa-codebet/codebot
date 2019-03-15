import { createGetErrorText } from '../../utils/tasks'
import task from '.'

const validate = (instructions: string): null | string => {
  const getErrorText = createGetErrorText(task.name)
  if (!instructions.length) return getErrorText('You must enter instructions')
  if (instructions.split(' ').length % 2 !== 0)
    return getErrorText('You must enter an even amount of players')
  return null
}

export default validate
