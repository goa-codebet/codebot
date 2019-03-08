export const createGetErrorText = (taskName: string) => (reason: string) =>
  `[${taskName} error]: ${reason}`
