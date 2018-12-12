const fs = require('fs-extra')
const path = require('path')

const opposites = (str1, str2) => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (lowercase.includes(str1) && uppercase.includes(str2) ||
      lowercase.includes(str2) && uppercase.includes(str1)) {
        if (str1.toUpperCase() === str2.toUpperCase()) {
          return true
        }
      }
  return false
}

const parseInput = arr => {
  let output = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    if (opposites(arr[i], output[output.length - 1])) {
      output.pop()
    } else {
      output.push(arr[i])
    }
  }
  console.log(output.length)
}

const getInput = async () => {
  let input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  input = input.split('')
  input.pop()
  parseInput(input, [])
}

getInput()
