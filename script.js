class Node {
    constructor(data,left=null,right=null) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(treeArray) {
        this.unsortedArray = treeArray;
        this.sortedArray = this.mergeSort(this.unsortedArray);
        this.tree = this.buildTree(this.sortedArray);
    }

    buildTree(treeArray) {
        if (treeArray.length < 1) {
            return;
        }
        const midElement = Math.floor(treeArray.length / 2);

        const treeNode = new Node(treeArray[midElement]);

        treeNode.left = this.buildTree(treeArray.slice(0,midElement));

        treeNode.right = this.buildTree(treeArray.slice(midElement+1,treeArray.length));

        if (treeNode.left === undefined) {
            treeNode.left = null;
        }
        if (treeNode.right === undefined) {
            treeNode.right = null;
        }
        return treeNode;
    }
    reBalanceTree() {
        this.sortedArray = this.mergeSort(this.unsortedArray);
        this.tree = this.buildTree(this.sortedArray);
    }

    insert(value,pointer=this.tree,addToArray=true) {
        if (value === undefined) {
            return;
        }
        if (addToArray) {
            this.unsortedArray.push(value);
        }
        if (value > pointer.data) {
            if (pointer.right === null) {
                pointer.right = new Node(value);
                return;
            }
            return this.insert(value,pointer.right,false);
        }
        if (value < pointer.data) {
            if (pointer.left === null) {
                pointer.left = new Node(value);
                return;
            }
            return this.insert(value,pointer.left,false);
        }        
    }
    delete(value,pointer=this.tree,rmFromArray=true) {
        if (rmFromArray) {
            let valueFound = false;
            for (let i = 0; i < this.unsortedArray.length; i++) {
                if (this.unsortedArray[i] === value) {
                    this.unsortedArray.splice(i,1);
                    valueFound = true;
                }
            }
            if (!valueFound) {
                return false;
            }
            this.sortedArray = this.mergeSort(this.unsortedArray);
        }
        let foundNode = false;
        let onLeft = false;
        if (pointer.left !== null) {
            if (pointer.left.data === value) {
                foundNode = true;
                onLeft = true;                
            }
        }

        if (pointer.right !== null) {
            if (pointer.right.data === value) {
                foundNode = true;
                onLeft = false;
            }
        }
        if (foundNode) {
            if (onLeft) {
                if (pointer.left.left !== null) {
                    let tempPointer = pointer.left.left;
                    while (tempPointer.right !== null) {
                        tempPointer = tempPointer.right;
                    }
                    tempPointer.right = pointer.left.right;
                    pointer.left = pointer.left.left;
                    return;
                }
                else if (pointer.left.right !== null) {
                    let tempPointer = pointer.left.right;
                    while (tempPointer.left !== null) {
                        tempPointer = tempPointer.left;
                    }
                    tempPointer.left = pointer.left.left;
                    pointer.left = pointer.left.right;
                    return;
                }
                else {
                    pointer.left = null;
                    return;
                }
                
            }
            if (pointer.right.left !== null) {
                let tempPointer = pointer.right.left;
                while (tempPointer.right !== null) {
                    tempPointer = tempPointer.right;
                }
                tempPointer.right = pointer.right.right;
                pointer.right = pointer.right.left;
                return;
            }
            else if (pointer.right.right !== null) {
                let tempPointer = pointer.right.right;
                while (tempPointer.left !== null) {
                    tempPointer = tempPointer.left;
                }
                tempPointer.left = pointer.right.left;
                pointer.right = pointer.right.right;
                return;
            }
            else {
                pointer.right = null;
                return;
            }
            
        }

        if (pointer.left !== null) {
            this.delete(value,pointer.left,false);
        }
        
        if (pointer.right !== null) {
            this.delete(value,pointer.right,false);
        }
    }
    
    find(value,pointer=this.tree) {
        if (pointer === null) {
            return false;
        }
        if (pointer.data === value) {
            return pointer;
        }
        else if (value > pointer.data) {
            return this.find(value,pointer.right);
        }
        else {
            return this.find(value,pointer.left);
        }
    }

    levelOrder(callback,que=[this.tree]) {
        if (callback === undefined) {
            return this.sortedArray;
        }
        if (que.length < 1) {
            return;
        }
        let pointer = que.shift();
        if (pointer.right !== null) {
            que.push(pointer.right);
        }
        if (pointer.left !== null) {
            que.push(pointer.left);
        }
        pointer.data = callback(pointer);
        
        this.levelOrder(callback,que);
    }

    levelOrderIT(callback) {
        if (callback === undefined) {
            return this.sortedArray;
        }
        let que = [this.tree];
        while (que.length > 0) {
            let pointer = que.shift();
            if (pointer.right !== null) {
                que.push(pointer.right);
            }
            if (pointer.left !== null) {
                que.push(pointer.left);
            }
            pointer.data = callback(pointer);
        }
    }
    
    inOrder(callback,pointer=this.tree) {
        if (callback === undefined) {
            return this.sortedArray;
        }
        if (pointer === null) return;
        this.inOrder(callback,pointer.left);
        callback(pointer);
        this.inOrder(callback,pointer.right);
    }
    
    preOrder(callback,pointer=this.tree) {
        if (callback === undefined) {
            return this.sortedArray;
        }
        if (pointer === null) return;
        callback(pointer);
        this.preOrder(callback,pointer.left);
        this.preOrder(callback,pointer.right);
    }

    postOrder(callback,pointer=this.tree) {
        if (callback === undefined) {
            return this.sortedArray;
        }
        if (pointer === null) return;
        this.postOrder(callback,pointer.left);
        this.postOrder(callback,pointer.right);
        callback(pointer);
    }

    height(node) {
        let getNode = this.find(node);
        if (getNode === false) {
            return false;
        }
        function findHeight(getNode) {
            let leftCount = 1;
            let rightCount = 1;
            if (getNode.left !== null) {
                leftCount += findHeight(getNode.left);
            }
            if (getNode.right !== null) {
                rightCount += findHeight(getNode.right);
            }
            return leftCount > rightCount ? leftCount : rightCount;
        }
        return findHeight(getNode)-1;
    }
    
    depth(data) {
        let node = this.find(data);
        if (node === false) return false;
        let currentTree = this.tree;
        function getDepth(node,pointer=currentTree,depth=0) {
            if (pointer.data === node.data) {
                return depth;
            }
            else if (pointer.data > node.data) {
                depth++;
                return getDepth(node,pointer.left,depth);
            }
            else {
                depth++;
                return getDepth(node,pointer.right,depth);
            }
        }
        return getDepth(node);
    }

    isBalanced(pointer=this.tree) {
        if (pointer === null) {
            return true;
        }
        
        const leftSubTree = pointer.left === null ? 0 : this.height(pointer.left.data);

        const rightSubTree = pointer.right === null ? 0 : this.height(pointer.right.data);

        const difference = Math.abs(leftSubTree-rightSubTree);
        
        if (difference > 1) {
            return false;
        }
        else {
            return (this.isBalanced(pointer.left) && this.isBalanced(pointer.right));
        }
    }

    prettyPrint(node=this.tree, prefix = "", isLeft = true) {
        if (node === null || node === undefined) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    mergeSort(arr) {
        if (arr.length > 1) {
            let middleArrNum = Math.floor(arr.length/2);
            let left = this.mergeSort(arr.slice(0,middleArrNum));
            let right = this.mergeSort(arr.slice(middleArrNum,arr.length));
    
            let sorted = false;
            let leftIndex = 0;
            let rightIndex = 0;
            let  mergedArray = [];
            let mergedArrayIndex = 0;
    
            while (!sorted) {
                if (leftIndex >= left.length && rightIndex >= right.length) {
                    sorted = true;
                    break;
                }
                else if (rightIndex !== right.length && leftIndex === left.length) {
                    mergedArray[mergedArrayIndex] = right[rightIndex];
                    mergedArrayIndex++;
                    rightIndex++;
                    continue;
                }
                else if (leftIndex !== left.length && rightIndex === right.length) {
                    mergedArray[mergedArrayIndex] = left[leftIndex];
                    mergedArrayIndex++;
                    leftIndex++;
                    continue;
                }
                else if (left[leftIndex] < right[rightIndex]) {
                    mergedArray[mergedArrayIndex] = left[leftIndex];
                    mergedArrayIndex++;
                    leftIndex++;
                    continue;
                }
                else if (right[rightIndex] < left[leftIndex]) {
                    mergedArray[mergedArrayIndex] = right[rightIndex];
                    mergedArrayIndex++;
                    rightIndex++;
                    continue;
                }
                else if (right[rightIndex] === left[leftIndex]) {
                    mergedArray[mergedArrayIndex] = right[rightIndex];
                    rightIndex++;
                    leftIndex++;
                    mergedArrayIndex++;
                    continue;
                }
            }
            return mergedArray;
    
        }
        else if (arr.length === 1) {
            return arr;
        }
    }
}

export default Tree;