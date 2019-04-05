export const arrayToSpeakFriendlyString = (array: string[]) =>
  array.reduce(
    (acc, val, index, { length }) =>
      `${acc}${index === length - 1 ? ' &' : ','} ${val}`,
  )

export const shuffleArray = (array: any[]) => {
  let j, x, i
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = array[i]
    array[i] = array[j]
    array[j] = x
  }
  return array
}

export const chunkArray = (arr: any[]) => [
  arr.slice(0, arr.length / 2),
  arr.slice(arr.length / 2, arr.length),
]

export const splitString = (seperator: string) => (string: string) =>
  string.split(seperator)

export const getUserIdFromUserInputReference = (rawUserId: string) =>
  rawUserId.replace(/(<|@|\|.*)/g, '')
