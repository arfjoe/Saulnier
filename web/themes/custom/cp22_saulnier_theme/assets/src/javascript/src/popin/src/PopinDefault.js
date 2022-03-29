import {$, T} from "../../common/drupal/drupal";

class PopinDefault {

    /**
     * Initialize event listeners
     */
    init () {
        this.$body = $('body');
        this.$popins = $('.Popin');
        this.$popinWrappers = $('.Popin-wrapper');
        this.$triggers = $('.Popin-trigger');

        //Hamburger element to close touch menu on popin opening :
        this.$hamburger = $('#hamburger');

        // add closing icon to all popins, @TODO change classes according to graphics
        this.$popinWrappers.prepend('<span class="Popin-close icon-cross fal fa-times"></span>');

        this.$triggers.on('click', ev => {this.triggerClick(ev);});
        this.$popins.on('click','.Popin-close', ev => {this.closePopins();});
        this.$popins.on('click', ev => {this.closePopins();});
        this.$popins.on('click', '.Popin-wrapper', function (e) {e.stopPropagation()});
    }
    /**
     * Open modal when click on trigger
     */
    triggerClick (ev) {
        if (this.$hamburger.hasClass('open')) {
            this.$hamburger.trigger('click');
        }
        this.closePopins();
        let target = $(ev.currentTarget).data("popin-target");
        let popin = $(target);

        popin.addClass('open');

        // freeze body to prevent scroll
        this.$body.addClass('no-scroll');
    }

    /**
     * Close all popins
     */
    closePopins () {
        this.$popins.removeClass('open');

        //REMOVE FROZEN STATE OF BODY
        this.$body.removeClass('no-scroll');
    }

    attach(context) {
        if(T.contextIsRoot(context)) {
            this.init(context);
        }
    }
}

export let popinDefault = new PopinDefault();
