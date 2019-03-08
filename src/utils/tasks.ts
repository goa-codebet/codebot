export const createGetErrorText = (taskName: string) => (reason: string) =>
  `\`[codebot/${taskName}]:\` ${reason}`
