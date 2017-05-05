/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);


const $l = function(selector){
  if (typeof selector === "string" ){
    let nodeList = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(nodeList));
  }
  else if (typeof selector === 'HTMLelement'){
    return new DOMNodeCollection([selector]);
  }
  else if (typeof selector === 'function'){
    let queue = [];
    if(document.readyState === "complete"){
      selector();
    }
    else{
      queue.push(selector);
      function wait(){
        if(document.readyState === "complete"){
          queue.forEach((func) =>{
            func();
          });
        }
        else{
          return setTimeout(wait, 500);
        }
      }
      return setTimeout(wait, 500);
    }
  }
  else{
    throw "WRONG!";
  }
};

$l.extend = function(a, ...others) {
  let solution = a;
  others.forEach( obj => {
    for(key in obj) {
      solution[key] = obj[key];
    }
  });

  return solution;
};

$l.ajax =function(options){
  const xhr = new XMLHttpRequest();

  let defaults = {
    method: 'GET',
    dataType: 'JSON',
    cache: true,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: true,
    error: (res) => (alert(res)),
    global: true,
    headers: {},
    ifModified: false,
    processData:true,
    statusCode: {},
    url: 'http://localhost:3000',
    success: (res) => console.log(res)
  };

  $l.extend(defaults, options);

  xhr.open(defaults.method, defaults.url);
  xhr.onload = function(res) {
    if (xhr.status > 299) {
      defaults.error(res);
    } else {
      defaults.success(res);
    }
  };

  xhr.send();
};



// $l( () => alert('the document is ready'));

window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);