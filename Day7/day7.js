const fs = require('fs-extra')
const path = require('path')

class Node {
  constructor(value, next) {
    this.value = value
    this.next = [next]
  }

  addNext(value) {
    this.next.push(value)
  }

}

class instructionList {
  constructor() {
    this.list = []
  }

  addNode(value, next) {
    const newNode = new Node(value, next)
    this.list.push(newNode)
    return newNode
  }

  find(value) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].value === value) {
        return this.list[i]
      }
    }
  }
}


const parseInput = arr => {
  let orderedList = []
  let list = new instructionList()
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i].split('Step ')[1].split(' must')[0]
    const next = arr[i].split('step ')[1].split(' can')[0]
    if (list.find(value)) {
      let currentNode = list.find(value)
      currentNode.addNext(next)
    } else {
      list.addNode(value, next)
    }
  }
  for (let j = 0; j < list.list.length; j++) {
    let nextList = list.list[j].next
    if (nextList.length > 1) {
      let sortedList = nextList.sort()
      for (let k = 0; k < sortedList.length; k++) {
        orderedList.push(sortedList[k])
      }
    } else {
      orderedList.push(nextList[0])
    }
  }
  console.log(orderedList)
}

const getInput = async () => {
  let input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  input = input.split('\n')
  input.pop()
  parseInput(input)
}

getInput()
