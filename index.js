let images;

class Slider extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log("connected");
        this.innerHTML = "<div>Loading..</div>";
        fetch('https://picsum.photos/v2/list')
            .then(result => result.json())
            .then(callback => {
                images = callback;
                this.render();
            });
        window.addEventListener('load', () => {
            setInterval(() => {
                const root = document.querySelectorAll('.slide');
                const current = parseInt(root[0].getAttribute('custom-data'));
                if (images[current] !== undefined) {
                    root[0].setAttribute('custom-data', current + 1);
                }
            }, 3000)
        })
    }

    static get observedAttributes() {
        return ['custom-data'];
    }

    goPrev() {
        const currentIndex = this.getAttribute("custom-data")
        console.log(currentIndex);
    }

    goNext() {
        const currentIndex = this.getAttribute("custom-data")
        console.log(currentIndex);
    }

    render() {
        const data = this.getAttribute("custom-data");
        this.innerHTML = `<img height="200"  src="${images[data].download_url}"/>`;
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if (images !== undefined) {
            this.render();
        }
        console.log("attr changed");
    }

    disconnectedCallback(callback) {
        console.log("callback");
    }
}

class NextArrow extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = "<span class='next-arrow'><i class=\"fas fa-arrow-right\"></i></span>";
        this.addEventListener('click', () => {
            const root = document.querySelectorAll('.slide');
            const current = parseInt(root[0].getAttribute('custom-data'));
            if (images[current] !== undefined) {
                root[0].setAttribute('custom-data', current + 1);
            } else {
                root[0].setAttribute('custom-data', 0);
            }
        })
    }
}

class PrevArrow extends HTMLElement {
    constructor() {
        super();
    }

    render() {
        this.innerHTML = "<span class='prev-arrow'><i class=\"fas fa-arrow-left\"></i></span>";
        this.addEventListener('click', () => {
            const root = document.querySelectorAll('.slide');
            const current = parseInt(root[0].getAttribute('custom-data'));
            if (images[current] !== undefined) {
                root[0].setAttribute('custom-data', current - 1);
            } else {
                root[0].setAttribute('custom-data', 0);
            }
        })
    }

    connectedCallback() {
        this.render();
    }
}

window.customElements.define("slide-img", Slider);
window.customElements.define("prev-arrow", PrevArrow);
window.customElements.define("next-arrow", NextArrow);