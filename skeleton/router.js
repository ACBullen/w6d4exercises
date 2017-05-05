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
