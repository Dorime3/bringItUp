export default class Accordion {
    constructor (btns) {
        this.btns = document.querySelectorAll(btns);
    }

    showText() {
        this.btns.forEach(btn => {
            btn.closest('.module__info-show').nextElementSibling.classList.add('animated', 'fadeIn');
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (btn.closest('.module__info-show').nextElementSibling.style.display == 'block') {
                    btn.closest('.module__info-show').nextElementSibling.style.display = 'none';
                    return;    
                }
                btn.closest('.module__info-show').nextElementSibling.style.display = 'block';
            })
        })
    }

    init () {
        this.showText();
    }
}