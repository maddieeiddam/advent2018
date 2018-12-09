const fs = require('fs-extra')
const path = require('path')

const parseDirections = arr => {
  let output = []
  arr.forEach(direction => {
    if (direction.length) {
      const id = direction.split(' @ ')[0]
      const xCoord = direction.split(' @ ')[1].split(': ')[0].split(',')[0]
      const yCoord = direction.split(' @ ')[1].split(': ')[0].split(',')[1]
      const width = direction.split(' @ ')[1].split(': ')[1].split('x')[0]
      const height = direction.split(' @ ')[1].split(': ')[1].split('x')[1]
      output.push({
        id,
        xCoord: Number(xCoord),
        yCoord: Number(yCoord),
        width: Number(width),
        height: Number(height),
        overlapped: false
      })
    }
  })
  return output
}

const maxHeight = arr => {
  let max = arr[0].yCoord + arr[0].height
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i].yCoord + arr[i].height > max) {
      max = arr[i].yCoord + arr[i].height
    }
  }
  return max
}

const findClaim = (gridObj, direction) => {
  let overlapped = true
  let filledRow = []
  for (let i = direction.xCoord; i < direction.xCoord + direction.width; i++) {
    filledRow.push(i)
  }
  for (let j = direction.yCoord; j < direction.yCoord + direction.height;j++) {
    filledRow.forEach(coord => {
      if (gridObj[j][coord] >= 2) {
        overlapped = false
      }
    })
  }
  if (overlapped) {
    console.log(direction)
  }
}

const populateGrid = arr => {
  const directions = parseDirections(arr)
  const gridHeight = maxHeight(directions)
  let doubleCount = 0

  //create initial object with all yCoords as keys
  let gridObj = {}
  for (let i = 0; i < gridHeight; i++) {
    gridObj[i] = []
  }

  //fill in 1s where necessary
  directions.forEach(direction => {
    let filledRow = []
    for (let i = direction.xCoord; i < direction.xCoord + direction.width; i++) {
      filledRow.push(i)
    }
    for (let j = direction.yCoord; j < direction.yCoord + direction.height; j++) {
      filledRow.forEach(coord => {
        if (gridObj[j][coord]) {
          if (gridObj[j][coord] === 1) {
            gridObj[j][coord] = 2
            doubleCount++
          }
        } else {
          gridObj[j][coord] = 1
        }
      })
    }
  })
  directions.forEach(direction => {
    return findClaim(gridObj, direction)
  })
  // console.log(doubleCount)
}

const getInput = async () => {
  let input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  input = input.split('\n')
  populateGrid(input)
}

getInput()
