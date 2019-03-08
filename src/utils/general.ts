export const arrayToSpeakFriendlyString = (array: string[]) =>
  array.reduce(
    (acc, val, index, { length }) =>
      `${acc}${index === length - 1 ? ' &' : ','} ${val}`,
  )

export const shuffleArray = (array: any[]) => {
  var j, x, i
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = array[i]
    array[i] = array[j]
    array[j] = x
  }
  return array
}
