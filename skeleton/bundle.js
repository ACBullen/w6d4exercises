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

const Router = __webpack_require__(1);
const Inbox = __webpack_require__(2);

const Routes = {
  inbox: new Inbox
};

document.addEventListener("DOMContentLoaded", () => {
  let node = document.querySelector(".content");
  let router = new Router(node, Routes);
  router.start();

  let li = document.querySelectorAll(".sidebar-nav li");
  console.log(li);
  li.forEach((item) => {
    item.addEventListener("click", (e) =>{
      let newLocation = e.currentTarget.innerText.toLowerCase();
      window.location.hash = newLocation;
    });
  });
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Router{
  constructor(node, routes){
    this.node = node;
    this.routes = routes;
  }

  start(){
    this.render();
    return window.addEventListener("hashchange", this.render.bind(this));

  }

  activeRoute(){
    let location = window.location.hash;
    location = location.slice(1);
    return this.routes[location];

  }

  render(){
    this.node.innerHTML = "";
    let component = this.activeRoute();
    if (component === undefined){
      return;
    }
    else{
      let newP = component.render();
      this.node.appendChild(newP);
    }
  }

}

module.exports = Router;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Inbox {

  constructor(){}
  
  render() {
    let ul = document.createElement('ul');
    ul.className = 'messages';
    ul.innerHTML = "An Inbox Message";

    return ul;
  }
}

module.exports = Inbox;


/***/ })
/******/ ]);