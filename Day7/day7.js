const fs = require('fs-extra')
const path = require('path')

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }

  addToHead(value) {
    const newNode = new Node(value, this.head, null)
    if (this.head) this.head.prev = newNode
    else this.tail = newNode
    this.head = newNode
  }

  addToTail(value) {
    const newNode = new Node(value, null, this.tail)
    if (this.tail) this.tail.next = newNode
    else this.head = newNode
    this.tail = newNode
  }

  find(value) {
    let thisNode = this.head
    while (thisNode) {
      if (thisNode.value === value) {
        return thisNode
      }

      thisNode = thisNode.next
    }
    return thisNode
  }
}

function Node(value, next, prev) {
  this.value = value
  this.next = next
  this.prev = prev
}

const getInput = async () => {
  let input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')
  input = input.split('\n')
  input.pop()
  findEdges(input)
}

getInput()
