export default class Difference {
    constructor (oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.items = items;
    }

    hideItems() {
        this.oldOfficer.querySelector(this.items).forEach((item, i, arr) => { //1-перебираемые элемент, 2-номер по порядку, 3-массив который мы сейчас перебираем
            if (i !== arr.length - 1) {
                item.style.display = 'none';
            }
        });

        this.newOfficer.querySelector(this.items).forEach((item, i, arr) => { //1-перебираемые элемент, 2-номер по порядку, 3-массив который мы сейчас перебираем
            if (i !== arr.length - 1) {
                item.style.display = 'none';
            }
        });

    }

    init() {
        this.hideItems();
    }
}