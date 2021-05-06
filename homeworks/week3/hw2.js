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
  const tmp = lines[0].split(' ')
  narcissisticNumber(tmp[0], tmp[1])
}

function digitsAndarray(n) {
  let count = 1
  const arr = []
  while (true) {
    if (Math.floor(n / 10) === 0) {
      arr.push(n % 10)
      return [count, arr] // 回傳位數和數字拆解的陣列
    } else {
      arr.push(n % 10)
      n = Math.floor(n / 10)
      count += 1
    }
  }
}

function narcissisticNumber(a, b) {
  for (let i = Number(a); i <= Number(b); i++) {
    let result = 0
    for (let j = 0; j < digitsAndarray(i)[0]; j++) {
      result = result + (digitsAndarray(i)[1][j]) ** digitsAndarray(i)[0]
    }
    if (result === i) {
      console.log(i)
    }
  }
}
