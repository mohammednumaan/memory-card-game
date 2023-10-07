export default function maxOfArray(array){
    array = array.sort((a, b) => a - b)
    return array
}