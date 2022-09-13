class Xcard extends HTMLElement {

    static get observedAttributes() {
        return ['disabled', 'gif_id'];
        }

    constructor(){
        super();
        //
        const template = document.querySelector('#gif-card');
        const card = template.content.cloneNode(true);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(card);
    }

    async getGif(){
        const gif = await fetch(`https://api.giphy.com/v1/gifs/${this.getAttribute('gif_id')}?api_key=deN938U4Ef66YPDtShWaEralFVTOaOlc`)
        .then(response => response.json());

        this.fillCard(gif);
    }

    fillCard(gif) {
        const card = this.shadowRoot;
        card.querySelector('.image-container img').src = gif.data.images.fixed_height_small.url  
    }

    connectedCallback(){
      if (!this.hasAttribute('gif_id')){
           this.setAttribute('gif_id', 'xUjSOWCndCdECCyOEY') 
        } else{

        }
        
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        this.getGif();
        console.log(`El atributo ${attrName} ha sido modificado de ${oldVal} a ${newVal}.`);
    }

}

// Define the new element
customElements.define('giphy-card', Xcard);