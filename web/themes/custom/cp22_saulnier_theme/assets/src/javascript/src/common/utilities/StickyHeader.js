/**
 * Add js-sticky CSS class on <body> while scrolling
 */
 class StickyHeader {

    /**
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.$Body = document.getElementsByTagName('body')[0];
        this.sticky = element.offsetTop + element.offsetHeight;
        this.onScroll = this.onScroll.bind(this);
        this.stickIt = this.stickIt.bind(this);
        window.addEventListener('scroll', this.onScroll);
        this.stickIt();
    }

    onScroll() {
        window.requestAnimationFrame(this.stickIt);
    }

    stickIt() {
        if(window.pageYOffset > this.sticky) {
            this.$Body.classList.add('js-sticky');
        } else {
            this.$Body.classList.remove('js-sticky');
        }
    }

}

export { StickyHeader };