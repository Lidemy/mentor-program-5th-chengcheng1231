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
  printStars(tmp)
}

function printStars(n) {
  for (let i = 1; i <= n; i++) {
    console.log(repeatStar(i))
  }
}

function repeatStar(m) {
  let result = ''
  for (let j = 0; j < m; j++) {
    result += '*'
  }
  return result
}
