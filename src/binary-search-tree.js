const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(data) {
    this.tree = data ? {data, right: null, left: null} : null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    let newNode = {data, right: null, left: null, parent: null};
    let current = this.tree;
    
    while(1) {
      if (!current) {
        this.tree = newNode;
        return;
      } else {
        if (data === current.data) return;
        if (data > current.data) {
          if (current.right) {
            current = current.right;
          } else {
            current.right = newNode;
            newNode.parent = current;
            return;
          }
        }
        if (data < current.data) {
          if (current.left) {
            current = current.left;
          } else {
            current.left = newNode;
            newNode.parent = current;
            return;
          }
        }
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let current = this.tree;
    
    while(1) {
      if (data === current.data) return current;
      if (data > current.data) {
        if (current.right) {
          current = current.right;
        } else {
          return null;
        }
      }
      if (data < current.data) {
        if (current.left) {
          current = current.left;
        } else {
          return null;
        }
      }
    }
  }

  remove(data) { 
    let current = this.find(data);

    if (current) {
      if (!current.left && !current.right) {
        if (current.data > current.parent.data) {
          current.parent.right = null;
        } else {
          current.parent.left = null;
        }
        return;
      }

      if (!current.left) {
        if (current.data > current.parent.data) {
          current.parent.right = current.right;
          current.right.parent = current.parent;
        } else {
          current.parent.left = current.right;
          current.right.parent = current.parent;
        }
        return;
      }

      if (!current.right) {
        if (current.data > current.parent.data) {
          current.parent.right = current.left;
          current.left.parent = current.parent;
        } else {
          current.parent.left = current.left;
          current.left.parent = current.parent;
        }
        return;
      }

      if (current.right && current.left) {
        let max = current.left;
        
        while(1) {
          if (max.right) {
            max = max.right;
          } else {
            break;
          }
        }

        current.data = max.data;
    
        if (max.data > max.parent.data) {
          max.parent.right = null;
        } else {
          max.parent.left = null;
        }

      }    
    } 
}

  min() {
    let current = this.tree;

    if (!current) return null;
    
    while(1) {
      if (current.left) {
        current = current.left;
      } else {
        return current.data;
      }
    }
  }

  max() {
    let current = this.tree;

    if (!current) return null;
    
    while(1) {
      if (current.right) {
        current = current.right;
      } else {
        return current.data;
      }
    }
  }
}

module.exports = {
  BinarySearchTree
};