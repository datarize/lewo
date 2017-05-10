class App extends HTMLElement {
    constructor(){
      super();
      let shadow = this.attachShadow({mode: 'open'});
      const t = document.querySelector('#sl-app-template');
      const instance = t.content.cloneNode(true);
      shadow.appendChild(instance);
    }
}
customElements.define('sl-app', App);
