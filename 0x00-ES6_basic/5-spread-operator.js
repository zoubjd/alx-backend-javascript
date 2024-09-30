export default function concatArrays(array1, array2, string) {
    let retunvalue = array1.concat(array2)
    for(let i = 0; i < string.length; i++){
        retunvalue.push(string[i])
    }
    return retunvalue;
}