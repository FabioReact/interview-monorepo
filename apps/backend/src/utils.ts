export const removeFromArray = (
  array: unknown[],
  predicate: (el: unknown) => boolean
) => {
  for (let index = array.length - 1; index > 0; index--) {
    if (predicate(array[index])) array.splice(index, 1);
  }
  return array;
};
