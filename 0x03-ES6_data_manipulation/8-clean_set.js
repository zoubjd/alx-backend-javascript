export default function cleanSet(set, startString) {
  if (typeof set !== 'object') return '';
  if (typeof startString !== 'string' || startString.length === 0) return '';
  const newarrat = Array.from(set);
  const returnval = [];
  for (const word of newarrat) {
    if (word.indexOf(startString) === 0) {
      returnval.push(word.slice(startString.length));
    }
  }
  // return Array.from(set).filter((value) => value.indexOf(startString) === 0);
  let retstr = '';
  retstr += returnval[0];
  for (let i = 1; i < returnval.length; i += 1) {
    retstr += `-${returnval[i]}`;
  }
  return retstr;
}
