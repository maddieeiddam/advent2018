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
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  for (let j = 0; j < letters.length; j++) {
    let cleanedArr = []
    for (let i = 0; i < arr.length; i++) {
      let letter = arr[i].toLowerCase()
      if (letter !== letters[j]) {
        cleanedArr.push(arr[i])
      }
    }
    let output = [cleanedArr[0]]
    for (let k = 1; k < cleanedArr.length; k++) {
      if (opposites(cleanedArr[k], output[output.length - 1])) {
        output.pop()
      } else {
        output.push(cleanedArr[k])
      }
    }
    console.log(letters[j], output.length)
  }
}

const getInput = async () => {
  let input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  input = input.split('')
  input.pop()
  parseInput(input, [])
}

getInput()
