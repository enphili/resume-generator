export const toUpperCaseFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1)


export function compare(where, what){
  for(let i=0; i < what.length; i++){
    if(where.indexOf(what[i]) === -1) return false
  }
  return true
}
