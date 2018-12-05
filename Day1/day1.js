const fs = require('fs-extra')
const path = require('path')

let frequencyObj = {}
let repeat = false
let frequency = 0

const updateFrequency = num => {
  if (num[0] === '+') {
    let toAdd = Number(num.substr(1))
    frequency = frequency + toAdd
    if (frequencyObj[frequency]) {
      console.log('first repeat is', frequency)
      repeat = true
    } else {
      frequencyObj[frequency] = 1
    }
    return frequency
  } else if (num[0] === '-') {
    let toSub = Number(num.substr(1))
    frequency = frequency - toSub
    if (frequencyObj[frequency]) {
      console.log('first repeat is', frequency)
      repeat = true
    } else {
      frequencyObj[frequency] = 1
    }
    return frequency
  }
}

const calculateFrequency = str => {
  const inputArr = str.split('\n')
  for (let i = 0; i < inputArr.length - 1; i++) {
    let num = inputArr[i]
    frequency = updateFrequency(num)
  }
  return frequency
}

const findRepeat = str => {
  while (repeat === false) {
    calculateFrequency(str)
  }
  return repeat
}

const logOutputs = str => {
  const endingFrequency = calculateFrequency(str)
  console.log('ending frequency is', endingFrequency)
  const repeatedNum = findRepeat(str)
}

const getInput = async () => {
  const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  logOutputs(input)
}

getInput()
