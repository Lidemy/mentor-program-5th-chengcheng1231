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
  for (let i = 1; i < lines.length; i++) {
    console.log(primeCheck(lines[i]))
  }
}

function primeCheck(n) {
  if (n === '1') {
    return 'Composite'
  } else if (n === 2) {
    return 'Prime'
  }
  let factor = 0
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      factor += 1
    }
  }
  if (factor > 0) {
    return 'Composite'
  } else {
    return 'Prime'
  }
}
