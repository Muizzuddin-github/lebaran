const camelCase = (str) => {
    return str.split(' ').map(value => `${value[0].toUpperCase()}${value.slice(1,str.length)}`).join(' ')
}
 
export default camelCase;