(function ($, Drupal) { // closure
  Drupal.behaviors.admin_custom = {
    attach: function (context, settings) {
      // Ajout de Select2 aux select du BO.
      $('select', context).not('.select2-hidden-accessible').each(function () {
        let select = $(this),
          CkeditorParents = select.parents('#ckeditor-entity-link-dialog-form'),
          dialogParent = select.parents('#drupal-modal');
        if (CkeditorParents.length === 0 && select.hasClass('js-hide') === false) {
          console.log(dialogParent);
          if (dialogParent.length > 0) {
            select.select2({
              minimumResultsForSearch: 12,
              dropdownParent: dialogParent
            });
          } else {
            select.select2({minimumResultsForSearch: 12});
          }
        }
      });
      // Menu Contribuer : pour avoir le même comportement que celui fourni par le module Toolbar
      if ('drupalToolbarMenu' in $.fn) {
        $('.toolbar-menu').drupalToolbarMenu();
      }
    }
  };
}(jQuery, Drupal));
