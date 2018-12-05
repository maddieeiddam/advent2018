const fs = require('fs-extra')
const path = require('path')

const exactlyXDups = (str, dups) => {
  const contentObj = {}
  for (let i = 0; i < str.length; i++) {
    let letter = str[i]
    if (contentObj[letter]) {
      contentObj[letter] = contentObj[letter] + 1
    } else {
      contentObj[letter] = 1
    }
  }
  for (let key in contentObj) {
    if (contentObj.hasOwnProperty(key)) {
      if (contentObj[key] === dups) {
        return true
      }
    }
  }
  return false
}

const calculateCheckSum = str => {
  const strArray = str.split('\n')
  let twice = 0
  let thrice = 0
  strArray.forEach(id => {
    if (exactlyXDups(id, 2)) twice++
    if (exactlyXDups(id, 3)) thrice++
  })
  console.log('checksum is', twice * thrice)
}

const compareStrings = (str1, str2) => {
  let differences = 0
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      differences++
    }
  }
  if (differences === 1) {
    let output = []
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] === str2[i]) {
        output.push(str1[i])
      }
    }
    output = output.join('')
    console.log('common letters:', output)
  }
}

const findBoxes = str => {
  const sortedArray = str.split('\n').sort()
  for (let i = 0; i < sortedArray.length - 1; i++) {
    compareStrings(sortedArray[i], sortedArray[i + 1])
  }
}

const getInput = async () => {
  const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  findBoxes(input)
}

getInput()
