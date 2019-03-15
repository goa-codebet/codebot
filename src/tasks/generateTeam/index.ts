import { ITask } from '../../types'
import main from './main'
import validate from './validate'

const task: ITask = {
  name: 'generate-team',
  function: main,
  validate,
  guide:
    'Usage: `/codebot generate-team [names space seperated]`\nExample: `/codebot generate-team @x @y @z @t`',
}

export default task
