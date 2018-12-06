const fs = require('fs-extra')
const path = require('path')

const parseDirections = arr => {
  let output = []
  arr.forEach(direction => {
    if (direction.length) {
      const xCoord = direction.split(' @ ')[1].split(': ')[0].split(',')[0]
      const yCoord = direction.split(' @ ')[1].split(': ')[0].split(',')[1]
      const width = direction.split(' @ ')[1].split(': ')[1].split('x')[0]
      const length = direction.split(' @ ')[1].split(': ')[1].split('x')[1]
      output.push({
        xCoord: Number(xCoord),
        yCoord: Number(yCoord),
        width: Number(width),
        length: Number(length)
      })
    }
  })
  return output
}

const populateGrid = arr => {
  const directions = parseDirections(arr)
  let gridObj = {}
  directions.forEach(direction => {
    //populate new rows
    if (!gridObj[direction.yCoord]) {
      gridObj[direction.yCoord] = Array(direction.xCoord + direction.xCoord)
      for (let i = direction.xCoord; i <= direction.width; i++) {
        gridObj[direction.yCoord][i] = 1
      }
    }
  })
  console.log(gridObj)
}

const getInput = async () => {
  let input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  input = input.split('\n')
  populateGrid(input)
}

getInput()
