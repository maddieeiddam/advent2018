const fs = require('fs-extra')
const path = require('path')

const calculateFrequency = str => {
  let frequency = 0
  const inputArr = str.split('\n')
  for (let i = 0; i < inputArr.length; i++) {
    let num = inputArr[i]
    if (num[0] === '+') {
      let toAdd = Number(num.substr(1))
      frequency = frequency + toAdd
    } else if (num[0] === '-') {
      let toSub = Number(num.substr(1))
      frequency = frequency - toSub
    }
  }
  console.log(frequency)
}

const getInput = async () => {
  const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  calculateFrequency(input)
}

getInput()
