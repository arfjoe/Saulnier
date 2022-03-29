import {$, T} from "../../common/drupal/drupal";
/**
 * Class de gestion du header mobile
 */
class Header {
  $header;
  $MainMenuFirstLevelLinks;
  $body;
  $hamburger

    /**
     * init
     */
    init(){//AVEC JQUERY
      //Récupère toutes les li du premier niveau de menu
      this.$MainMenuFirstLevelLinks = $('.Header-menuMain-firstLevel > .Header-menuMain-itemList');
      this.$hamburger = $('.Header-hamburger');

      //Récupére l'élément body en entier
      this.$body = $('body');
      this.$header = $('header');

      //Eventlistener sur l'élément du menu
      this.$MainMenuFirstLevelLinks.on('click', event => {this.manageClickOnFirstLevelMainMenuLinks(event)});
      this.$hamburger.on('click', event => {this.manageClickOnHamburger(event)});

      //Eventlistener sur le body
      this.$body.on('click',event=>{this.manageClickOnBody(event)});

      var resizeTimeout;
      $(window).resize(function(){
        if(!!resizeTimeout){ clearTimeout(resizeTimeout); }
        resizeTimeout = setTimeout(function(){
          let windowSize = T.viewport();
          if (windowSize.width > 1279) {
            $('.Header').removeClass('js-mobile-menu-open');
          }
        },200);
      });

    }

    manageClickOnFirstLevelMainMenuLinks (event){
      let $currentTarget = $(event.currentTarget);
      //On vérifie si l'élément a la class voulu
      if($currentTarget.hasClass('js-open')){
        $currentTarget.removeClass('js-open');
      }
      else{
        // On retire la class aux autres éléments (dans le doute)
        this.$MainMenuFirstLevelLinks.removeClass('js-open');
        //Ajoute une class à l'élément cliquer
        $currentTarget.addClass('js-open');
      }
      event.stopPropagation();
    }

    manageClickOnBody(event){
      this.$MainMenuFirstLevelLinks.removeClass('js-open');
    }

    manageClickOnHamburger(event){
      this.$header.toggleClass('js-mobile-menu-open');
    }



    /**
     * Attach.
     * @param context
     */
    attach(context) {
        if (T.contextIsRoot(context)) {
            this.init();
        }
    }
}

export let header = new Header();
