import Tree from "./script.js";

let treeArray = [];

for (let i = 0; i < 24;i++) {
    treeArray.push(Math.floor(Math.random() * 100));
}

function printNodeData(node) {
    console.log(node.data);
    return node.data;
}

const tree = new Tree(treeArray);

console.log(`Is Tree Balanced: ${tree.isBalanced()}`);

tree.prettyPrint();

console.log("------------Level Order Print------------")
tree.levelOrder(printNodeData);

console.log("------------Pre Order Print------------")
tree.preOrder(printNodeData);

console.log("------------Post Order Print------------")
tree.postOrder(printNodeData);

console.log("------------In Order Print------------")
tree.inOrder(printNodeData);

for (let i = 0; i < 24;i++) {
    tree.insert(Math.floor(Math.random() * 100)+100);
}

console.log("Added Lots of Numbers Over 100");

console.log(`Is Tree Balanced: ${tree.isBalanced()}`);

tree.prettyPrint();

console.log("Rebalanced Tree")

tree.reBalanceTree();

console.log(`Is Tree Balanced: ${tree.isBalanced()}`);

tree.prettyPrint();

console.log("------------Level Order Print------------")
tree.levelOrder(printNodeData);

console.log("------------Pre Order Print------------")
tree.preOrder(printNodeData);

console.log("------------Post Order Print------------")
tree.postOrder(printNodeData);

console.log("------------In Order Print------------")
tree.inOrder(printNodeData);




