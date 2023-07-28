class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let queue = [this.root];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      if (!currentNode.left) {
        currentNode.left = newNode;
        return;
      } else if (!currentNode.right) {
        currentNode.right = newNode;
        return;
      } else {
        queue.push(currentNode.left);
        queue.push(currentNode.right);
      }
    }
  }

  getHeight(node = this.root) {
    if (!node) return -1;

    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  preorderTraversal(node = this.root) {
    if (!node) return;
    console.log(node.value);
    this.preorderTraversal(node.left);
    this.preorderTraversal(node.right);
  }

  inorderTraversal(node = this.root) {
    if (!node) return;
    this.inorderTraversal(node.left);
    console.log(node.value);
    this.inorderTraversal(node.right);
  }

  postorderTraversal(node = this.root) {
    if (!node) return;
    this.postorderTraversal(node.left);
    this.postorderTraversal(node.right);
    console.log(node.value);
  }

  printLeaves(node = this.root) {
    if (!node) return;
    if (!node.left && !node.right) {
      console.log(node.value);
    }
    this.printLeaves(node.left);
    this.printLeaves(node.right);
  }

  bfs() {
    if (!this.root) return;
    let queue = [this.root];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      console.log(currentNode.value);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
  }

  dfs() {
    this._dfsHelper(this.root);
  }

  _dfsHelper(node) {
    if (!node) return;
    console.log(node.value);
    this._dfsHelper(node.left);
    this._dfsHelper(node.right);
  }

  sumLeftLeaves(node = this.root) {
    if (!node) return 0;
    let sum = 0;
    if (node.left && !node.left.left && !node.left.right) {
      sum += node.left.value;
    }
    sum += this.sumLeftLeaves(node.left);
    sum += this.sumLeftLeaves(node.right);
    return sum;
  }

  sumAllNodes(node = this.root) {
    if (!node) return 0;
    return node.value + this.sumAllNodes(node.left) + this.sumAllNodes(node.right);
  }

  countSubtreesWithSumX(node = this.root, targetSum) {
    if (!node) return 0;
    const leftSum = this.sumAllNodes(node.left);
    const rightSum = this.sumAllNodes(node.right);
    const totalSum = leftSum + rightSum + node.value;

    const countLeft = this.countSubtreesWithSumX(node.left, targetSum);
    const countRight = this.countSubtreesWithSumX(node.right, targetSum);
    let totalCount = countLeft + countRight;

    if (totalSum === targetSum) {
      totalCount++;
    }

    return totalCount;
  }

  maxLevelSum() {
    if (!this.root) return 0;

    let queue = [this.root];
    let maxSum = this.root.value;

    while (queue.length > 0) {
      const levelSize = queue.length;
      let levelSum = 0;

      for (let i = 0; i < levelSize; i++) {
        const currentNode = queue.shift();
        levelSum += currentNode.value;

        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
      }

      maxSum = Math.max(maxSum, levelSum);
    }

    return maxSum;
  }

  printOddLevelNodes(node = this.root, level = 1) {
    if (!node) return;
    if (level % 2 !== 0) {
      console.log(node.value);
    }
    this.printOddLevelNodes(node.left, level + 1);
    this.printOddLevelNodes(node.right, level + 1);
  }
}


const binaryTree = new BinaryTree();
binaryTree.insert(1);
binaryTree.insert(2);
binaryTree.insert(3);
binaryTree.insert(4);
binaryTree.insert(5);
binaryTree.insert(6);
binaryTree.insert(7);

console.log("Height of the tree:", binaryTree.getHeight());
console.log("Pre-order traversal:");
binaryTree.preorderTraversal();
console.log("In-order traversal:");
binaryTree.inorderTraversal();
console.log("Post-order traversal:");
binaryTree.postorderTraversal();
console.log("Leaves in the tree:");
binaryTree.printLeaves();
console.log("BFS traversal:");
binaryTree.bfs();
console.log("DFS traversal:");
binaryTree.dfs();
console.log("Sum of all left leaves:", binaryTree.sumLeftLeaves());
console.log("Sum of all nodes in the tree:", binaryTree.sumAllNodes());
console.log("Number of subtrees with sum 8:", binaryTree.countSubtreesWithSumX(8));
console.log("Maximum level sum:", binaryTree.maxLevelSum());
console.log("Nodes at odd levels:");
binaryTree.printOddLevelNodes();
