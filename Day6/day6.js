const fs = require('fs-extra')
const path = require('path')

const findClosest = (arr, x, y) => {
  let closest = Math.abs(y - Number(arr[0].split(', ')[1])) + Math.abs(x - Number(arr[0].split(',')[0]))
  let closestPoint = ''
  for (let i = 1; i < arr.length; i++) {
    const distance = Math.abs(y - Number(arr[i].split(', ')[1])) + Math.abs(x - Number(arr[i].split(',')[0]))
    if (distance < closest) {
      closest = distance
      closestPoint = arr[i]
    } else if (distance === closest) {
      closest = null
      closestPoint = null
    }
  }
  return closestPoint
}

const handleCoords = (arr, top, bottom, left, right) => {
  let closestObj = {}
  for (let i = left; i <= right; i++) {
    for (let j = top; j <= bottom; j++) {
      let closestString = findClosest(arr, i, j)
      if (closestObj[closestString]) {
        closestObj[closestString] = closestObj[closestString] + 1
      } else {
        closestObj[closestString] = 1
      }
    }
  }
  console.log(closestObj)
}

const findEdges = arr => {
  let topMost = Number(arr[0].split(', ')[1])
  let bottomMost = Number(arr[0].split(', ')[1])
  let leftMost = Number(arr[0].split(',')[0])
  let rightMost = Number(arr[0].split(',')[0])
  for (let i = 1; i < arr.length; i++) {
    let currentX = Number(arr[i].split(',')[0])
    let currentY = Number(arr[i].split(', ')[1])
    if (currentX < leftMost) leftMost = currentX
    if (currentX > rightMost) rightMost = currentX
    if (currentY > bottomMost) bottomMost = currentY
    if (currentY < topMost) topMost = currentY
  }
  console.log('y between:', topMost, bottomMost, 'x between:', leftMost, rightMost)
  handleCoords(arr, topMost, bottomMost, leftMost, rightMost)
}

const getInput = async () => {
  let input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  input = input.split('\n')
  input.pop()
  findEdges(input)
}

getInput()
