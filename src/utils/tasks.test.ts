import { getTaskInstructions, addValueToNonValueFlags } from './tasks'

describe('tasks.test.ts', () => {
  test("getTaskInstructions: 'generate-team a b c d --size 2 --stealth'", () => {
    const { taskName, parameters, flags } = getTaskInstructions(
      'generate-team a b c d --size 2 --stealth',
    )

    expect(taskName).toBe('generate-team')

    expect(parameters.length).toBe(4)
    expect(parameters[0]).toBe('a')
    expect(parameters[3]).toBe('d')

    expect(flags.size).toBe('2')
    expect(flags.stealth).toBe('true')
  })

  test("getTaskInstructions: ''", () => {
    const { taskName, parameters, flags } = getTaskInstructions('')

    expect(taskName).toBe('')
    expect('length' in parameters).toBe(true)
    expect(parameters.length).toBe(0)
    expect(Object.keys(flags).length).toBe(0)
  })

  test("getTaskInstructions: 'generate-team'", () => {
    const { taskName, parameters, flags } = getTaskInstructions('generate-team')

    expect(taskName).toBe('generate-team')
    expect('length' in parameters).toBe(true)
    expect(parameters.length).toBe(0)
    expect(Object.keys(flags).length).toBe(0)
  })

  test("getTaskInstructions: 'generate-team a b c d e f'", () => {
    const { taskName, parameters, flags } = getTaskInstructions(
      'generate-team a b c d e f',
    )

    expect(taskName).toBe('generate-team')
    expect(parameters.length).toBe(6)
    expect(Object.keys(flags).length).toBe(0)
  })

  test('addValueToNonValueFlags', () => {
    const flags = addValueToNonValueFlags([
      '--stealth',
      '--lorem',
      '--size',
      '2',
      '--ipsum',
    ])

    expect(flags[0]).toBe('--stealth')
    expect(flags[1]).toBe('true')
    expect(flags[3]).toBe('true')
    expect(flags[5]).toBe('2')
    expect(flags[7]).toBe('true')
  })
})
