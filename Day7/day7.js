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

const traverseList = list => {
  let completed = [list.list[0].value]
  let nextOptions = list.list[0].next
  while (nextOptions.length > 0) {
    if (nextOptions.length === 1) {
      let nextNode = nextOptions.shift()
      completed.push(nextNode)
    } else {
      for (let i = 0; i < nextOptions.length; i++) {
        if (!nextOptions.includes(nextOptions[i])) {
          nextOptions.push(nextOptions[i])
        }
        let sorted = nextOptions.sort()
        let nextVal = sorted.shift()
        let nextNode = list.find(nextVal)
        if (nextNode) {
          if (nextNode.next.length > 1) {
            for (let j = 0; j < nextNode.next.length; j++) {
              nextOptions.push(nextNode.next[j])
            }
          } else if (nextNode.next.length === 1) {
            nextOptions.push(nextNode.next[0])
          }
          completed.push(nextNode.value)
        }
      }
    }
  }
  console.log('OPTIONS', nextOptions)
  console.log('COMPLETED', completed)
}


const parseInput = arr => {
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
  traverseList(list)
}

const getInput = async () => {
  let input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  input = input.split('\n')
  input.pop()
  parseInput(input)
}

getInput()
