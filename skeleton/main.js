const Router = require("./router.js");
const Inbox = require("./inbox.js");

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
