import {$, T} from "../../common/drupal/drupal";
/**
 * Gestion de l'affichage du player Youtube
 */
class Video {
  $play;

  /**
   * init
   */
  init() {
    this.$play = $('picture');

    this.$play.on('click', event => {this.manageSeeVideoContainer()});
  }

  manageSeeVideoContainer (){

    let $video = $('iframe');
    let $play = $('picture');
    //Ajoute une class à différent élément
    $play.addClass('js-close');
    $video.addClass('js-open');
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

export let video = new Video();
