
class GUIBuilder extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        const t = document.querySelector('#sl-guibuilder-template');
        const instance = t.content.cloneNode(true);
        this.shadow.appendChild(instance);

        this.core = document.querySelector('#tw-datacontainer');
        this.core.addEventListener('update', this.update);
    }

    update(opt){
        
    }

    connectedCallback(){
      let ui = this.shadow.querySelector('#ui');
      ui.ondrop=this.drop;
      ui.ondragover=this.allowDrop;

      let list = this.shadow.querySelector('#ui-list');
      list.ondragstart=this.drag;
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id || ev.target.tagName); 
    }

    drop(ev) {
    ev.preventDefault();
    console.log(ev,this.parentNode);

    let data = ev.dataTransfer.getData("text");
    console.log(this,data);
    let ele = this.parentNode.getElementById(data);
    
    if (ele) {
        ele.style.left = ev.clientX - ele.offsetWidth / 2;
        ele.style.top = ev.clientY - ele.offsetHeight / 2;
    } else {
        let list = this.parentNode.querySelector('#ui-list');
        let orig = list.querySelector(data);
        let clone = orig.cloneNode(true);
        clone.id = ++this.parentNode.parentNode.id;

        clone.addEventListener('contextmenu', event => {
            // prevent the normal context menu from popping up
            event.preventDefault();

            let c = document.querySelector('#context');
            console.log(c, clone);
            c.style.left = clone.style.left;
            c.style.top = clone.style.top;
            c.style.width = '200px';
            c.style.height = '200px';

            c.style.visibility = 'visible';
        });

        clone.style.position = 'absolute';
        clone.style.left = ev.clientX - orig.offsetWidth / 2;
        clone.style.top = ev.clientY - orig.offsetHeight / 2;

        ev.target.appendChild(clone);

    }
}

}
customElements.define('sl-guibuilder', GUIBuilder);
