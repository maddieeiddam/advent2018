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

const parseIds = str => {
  const strArray = str.split('\n')
  let twice = 0
  let thrice = 0
  strArray.forEach(id => {
    if (exactlyXDups(id, 2)) twice++
    if (exactlyXDups(id, 3)) thrice++
  })
  console.log(twice)
  console.log(thrice)
}

const getInput = async () => {
  const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  parseIds(input)
}

getInput()
