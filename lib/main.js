const DOMNodeCollection = require('./dom_node_collection');


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
