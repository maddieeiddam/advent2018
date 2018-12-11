const fs = require('fs-extra')
const path = require('path')

class Guard {
  constructor(id) {
    this.id = id
    this.timeAwake = 0
    this.timeAsleep = 0
    this.asleepMins = []
    this.lastRecord = 0
  }
}

let currentGuard = {}
let guardObj = {}

const parseMinutes = timeStamp => {
  if (timeStamp.startsWith('00')) {
    return Number(timeStamp.split(':')[1])
  } else {
    return Number(timeStamp.split(':')[1]) - 60
  }
}

const mode = arr => {
  return arr.sort((a, b) =>
      arr.filter(v => v === a).length
    - arr.filter(v => v === b).length
  ).pop()
}

const counts = (arr, min) => {
  let count = 0
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i]
    if (num === min) {
      count++
    }
  }
  return count
}

const findSleepiest = obj => {
  let maxSleep = 0
  let sleepiest = 0
  for (let key in obj) {
    if (obj[key].timeAsleep > maxSleep) {
      maxSleep = obj[key].timeAsleep
      sleepiest = obj[key].id
    }
  }
  console.log('sleepiest guard is', sleepiest)
  console.log('sleepiest minute is', mode(obj[sleepiest].asleepMins))
}

const overallMode = obj => {
  for (let key in obj) {
    let sleepiestMin = mode(obj[key].asleepMins)
    let count = counts(obj[key].asleepMins, sleepiestMin)
    console.log('guard', key, 'sleeps', count, 'times in minute', sleepiestMin)
  }
}

const parseInput = arr => {
  arr.forEach(record => {
    if (record.length) {
      let timeStamp = parseMinutes(record.split(' ')[1].split(']')[0])
      let text = record.split('] ')[1]
      if (text === 'wakes up') {
        currentGuard.timeAsleep += (timeStamp - currentGuard.lastRecord)
        for (let i = currentGuard.lastRecord; i < timeStamp; i++) {
          currentGuard.asleepMins.push(i)
        }
      } else if (text === 'falls asleep') {
        currentGuard.timeAwake += (timeStamp - currentGuard.lastRecord)
      } else {
        let guardId = text.split('#')[1].split(' ')[0]
        if (guardObj[`${guardId}`]) {
          currentGuard = guardObj[`${guardId}`]
        } else {
          currentGuard = new Guard(guardId)
          guardObj[`${currentGuard.id}`] = currentGuard
        }
      }
      currentGuard.lastRecord = timeStamp
    }
  })
  findSleepiest(guardObj)
  overallMode(guardObj)
}

const getInput = async () => {
  let input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  input = input.split('\n')
  input = input.sort()
  parseInput(input)
}

getInput()
