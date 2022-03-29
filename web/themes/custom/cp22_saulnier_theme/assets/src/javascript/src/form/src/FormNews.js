import {$, T} from "../../common/drupal/drupal";
/**
 * Gestion de la validation du formulaire de la liste d'actualité
 */
class FormNews {
  $selectTheme;
  $formNews;

  /**
   * init
   */
  init() {

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

export let formNews= new FormNews();
