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
