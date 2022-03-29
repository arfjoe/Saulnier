(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var $ = jQuery;
  var T = {
    /**
     * Renvoie vrai si le context est root (document)
     * @param context
     */
    contextIsRoot: function contextIsRoot(context) {
      return 'HTML' === $($(context).children()[0]).prop("tagName");
    },

    /**
     * Retourne vrai si la variable est définie.
     * @param variable
     * @returns {boolean}
     */
    isDefined: function isDefined(variable) {
      return 'undefined' !== typeof variable;
    },

    /**
     * Retourne la taille de la fenêtre dans un objet avec .width et .height
     * @returns object
     */
    viewport: function viewport() {
      var e = window,
          a = 'inner';

      if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
      }

      return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
      };
    }
  };

  /**
   * Gestion de l'affichage du player Youtube
   */

  var Video = /*#__PURE__*/function () {
    function Video() {
      _classCallCheck(this, Video);

      _defineProperty(this, "$play", void 0);
    }

    _createClass(Video, [{
      key: "init",
      value:
      /**
       * init
       */
      function init() {
        var _this = this;

        this.$play = $('picture');
        this.$play.on('click', function (event) {
          _this.manageSeeVideoContainer();
        });
      }
    }, {
      key: "manageSeeVideoContainer",
      value: function manageSeeVideoContainer() {
        var $video = $('iframe');
        var $play = $('picture'); //Ajoute une class à différent élément

        $play.addClass('js-close');
        $video.addClass('js-open');
      }
      /**
       * Attach.
       * @param context
       */

    }, {
      key: "attach",
      value: function attach(context) {
        if (T.contextIsRoot(context)) {
          this.init();
        }
      }
    }]);

    return Video;
  }();

  var video = new Video();

  (function (Drupal) {

    Drupal.behaviors.video = video;
  })(Drupal);

})();
//# sourceMappingURL=video.js.map
