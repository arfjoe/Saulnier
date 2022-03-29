/**
 * Enables dropdown on a
 * <div class="dropdown">
 *  <div class="dropdown-menu"></div>
 * </div>
 * template
 */
 class Dropdown {

    /**
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.element = element;
        this.dropDownMenu = this.getDropDownMenu();
        this.ariaExpandedValue = this.element.getAttribute('aria-expanded') === 'true';
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.element.addEventListener('click', this.toggleDropdown);
        this.element.addEventListener('focusout', this.toggleDropdown);
    }

    getDropDownMenu() {
        return this.element.querySelectorAll('.dropdown-menu')[0];
    }

    toggleDropdown(e) {
        this.element.setAttribute('aria-expanded', !this.ariaExpandedValue);
        this.ariaExpandedValue = !this.ariaExpandedValue;
        if(e.type === 'focusout' && !this.element.classList.contains('opened')) {
            return;
        }
        this.element.classList.toggle('opened');
    }

    /**
     * @returns {Dropdown[]}
     */
    static bind() {
        return Array.from(document.querySelectorAll('.dropdown')).map((element) => {
            return new Dropdown(element);
        });
    }
}

export { Dropdown }