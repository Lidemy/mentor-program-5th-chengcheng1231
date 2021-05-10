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
    const [a, b, k] = lines[i].split(' ')
    console.log(compareNumber(a, b, k))
  }
}

function compareNumber(a, b, k) {
  if (a === b) {
    return 'DRAW'
  }
  // 將比小的規則變成比大的規則須將數字調換
  if (k === '-1') {
    const temp = a
    a = b
    b = temp
  }
  // 比位數則可知道大小
  if (a.length > b.length) {
    return 'A'
  }
  if (a.length < b.length) {
    return 'B'
  }
  // 若位數相同則須從字串最左邊的數開始比較
  if (a.length === b.length) {
    for (let i = 0; i < a.length; i++) {
      // 若相等，就繼續
      if (a[i] === b[i]) {
        continue
      }
      // 若不相等，就回傳"A""B"
      if (a[i] > b[i]) {
        return 'A'
      } else {
        return 'B'
      }
    }
  }
}
