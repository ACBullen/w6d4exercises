class DOMNodeCollection{
  constructor(array){
    this.nodes = array;
  }

}

DOMNodeCollection.prototype.html = function(string){
  if(string){
    this.nodes.forEach((node) =>{
      node.innerHTML = string;
    });
  }
  else{
    return this.nodes[0].innerHTML;
  }
};

DOMNodeCollection.prototype.empty = function () {
  this.nodes.forEach((node)=>{
     node.innerHTML = '';
   });
};

DOMNodeCollection.prototype.append = function (argument) {
  if (argument instanceof DOMNodeCollection) {
    this.nodes.forEach( node1 => {
      argument.nodes.forEach(node2 => {
        node1.innerHTML += node2.outerHTML;
      });
    });
  } else {
    this.nodes.forEach( node => {
      node.innerHTML += argument;
    });
  }
};

DOMNodeCollection.prototype.attr = function (attr, value) {
  if (value === undefined) {
    let match;
    this.nodes.forEach((node)=> {
      let result = node.attributes.getNamedItem(attr);
      if (result) {
        match = result;
        return;
      }
    });
    return (match.value);
  } else {
    this.nodes.forEach( (node) => {
      node.setAttribute(attr, value);
    });
  }
};

DOMNodeCollection.prototype.addClass = function(className){
  this.nodes.forEach((node)=> {
    let result = node.attributes.getNamedItem("class").value;
    if(result === null){
      node.setAttribute("class", className);
    }
    else{
      result += ` ${className}`;
      node.setAttribute("class", result);
    }
  });

};

DOMNodeCollection.prototype.removeClass = function(className){
  if (className){
    let classes = className.split(" ");
    this.nodes.forEach( (node) =>{
      let nodeClasses = node.className.split(" ");
      let newNodeClasses = nodeClasses.filter((c)=>{
        return (className.includes(c) === false);
      });

      node.className = newNodeClasses.join(' ');
    });
  }
  else{
    this.nodes.forEach( node =>{
      node.className = '';
    });
  }
};

DOMNodeCollection.prototype.children = function () {
  let childNodes = [];

  this.nodes.forEach( node => {
    childNodes = childNodes.concat(Array.from(node.children));
  });

  let i = 0;
  while (i < childNodes.length) {
    if (Array.from(childNodes[i].children).length > 0){
      childNodes = childNodes.concat(Array.from(childNodes[i].children));
    }
    i++;
  }

  return new DOMNodeCollection(childNodes);
};

DOMNodeCollection.prototype.parents = function () {
  let parentNodes = [];

  this.nodes.forEach( node => {

    parentNodes.push(node.parentNode);
  });

  let i = 0;
  while (i < parentNodes.length) {
    if (parentNodes[i].parentNode){
      parentNodes.push(parentNodes[i].parentNode);
    }
    i++;
  }

  return new DOMNodeCollection(parentNodes);
};

DOMNodeCollection.prototype.find = function (selector) {
  let potentialTargets = Array.from(document.querySelectorAll(selector));
  console.log(potentialTargets);
  console.log(this.children().nodes);
  console.log(this);
  let targets = potentialTargets.filter((c) => {
    return this.children().nodes.includes(c);
  });
  return new DOMNodeCollection(targets);
};

DOMNodeCollection.prototype.remove = function () {
  this.nodes.forEach( (node) => {
    node.outerHTML = '';
  });
  this.nodes = [];
};

DOMNodeCollection.prototype.clicker = function(){
  alert("clicked!");
};

DOMNodeCollection.prototype.on = function (userAction, cb) {
  this.nodes.forEach( node => {
    node.addEventListener(userAction, cb);
  });
};

DOMNodeCollection.prototype.off = function (userAction, cb) {
  this.nodes.forEach( node => {
    node.removeEventListener(userAction, cb);
  });
};

module.exports = DOMNodeCollection;
