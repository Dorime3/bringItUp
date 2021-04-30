import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    }

    showSlides(n) { // скрываем все слайды и показываем нужный
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slideIndex.length;
        }

        try {
            this.hanson.style.opacity = 0;
            if (n == 3) {
                this.hanson.classList.add('animated')
                setTimeout(() => {
                    this.hanson.style.opacity = 1;
                    this.hanson.classList.add('slideInUp')
                }, 3000)
            } else {
                this.hanson.classList.remove('slideInUp');
            }

        } catch(e) {};

        this.slides.forEach(slide => {
            slide.classList.add('animated');
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';

    }
    

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }


    render() {
        try {
            this.hanson = document.querySelector('.hanson');
        } catch(e) {}

        this.showSlides(this.slideIndex);

        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
                this.slides[this.slideIndex - 1].classList.add('fadeInDown');
            })
            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            })
        })
    }

}