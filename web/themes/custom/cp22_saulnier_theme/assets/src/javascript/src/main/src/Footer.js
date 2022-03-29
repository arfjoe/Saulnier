import {$, T} from "../../common/drupal/drupal";
import Swiper, { Navigation, Autoplay } from 'swiper';
Swiper.use([Navigation, Autoplay]);
/**
 * Class exemple de gestion du footer
 */
class Footer {

    /**
     * init
     */
    init(){
        console.log('hello footer');
      // template du slider partenaire :
      // web/modules/custom/cp22_saulnier_partners/templates/partners-slider.html.twig

      const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
          // when window width is >= 320px
          540: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          // when window width is >= 480px
          720: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          // when window width is >= 640px
          1080: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          1279: {
            slidesPerView: 5,
            spaceBetween: 50
          }
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
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

export let footer = new Footer();
