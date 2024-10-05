export default function concatArrays(array1, array2, string) {
  const retunvalue = [...array1, ...array2, ...string];
  return retunvalue;
}
