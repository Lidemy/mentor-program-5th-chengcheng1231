const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  solve(lines)
})

function solve(lines) {
  const tmp = lines[0]
  console.log(Palindrome(tmp))
}

function Palindrome(str) {
  if (str === reverse(str)) {
    return 'True'
  } else {
    return 'False'
  }
}

function reverse(str) {
  const splitstr = str.split('')
  let result = ''
  for (let i = -1; i >= -(splitstr.length); i--) { // let i as index in order to get elements from the end of splitstr
    result = result + splitstr.slice(i)[0]
  }
  return result
}
