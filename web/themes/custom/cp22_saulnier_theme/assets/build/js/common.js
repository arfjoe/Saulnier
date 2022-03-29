(function (exports) {
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

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

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var KeyFigureHandler = /*#__PURE__*/function () {
    /**
     * 
     * @param {NodeList} elements 
     * @param {Object} options 
     */
    function KeyFigureHandler(elements, options) {
      _classCallCheck(this, KeyFigureHandler);

      this.elements = elements;
      this.options = this.parseOptions(options);
      this.onObserve = this.onObserve.bind(this);
      this.observer = new IntersectionObserver(this.onObserve, {});

      var _iterator = _createForOfIteratorHelper(elements),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var element = _step.value;
          this.observer.observe(element);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.animate = this.animate.bind(this);
    }
    /**
     * 
     * @param {Object} options 
     * @returns {Object}
     */


    _createClass(KeyFigureHandler, [{
      key: "parseOptions",
      value: function parseOptions(options) {
        var defaultOptions = {
          animate: true,
          detectPercentage: false,
          animationDuration: 2000,
          frameDuration: 500,
          detectBigNumbers: true
        };
        return _objectSpread2(_objectSpread2({}, defaultOptions), options);
      }
      /**
       * 
       * @param {IntersectionObserverEntry} entries 
       * @param {IntersectionObserver} observer 
       */

    }, {
      key: "onObserve",
      value: function onObserve(entries, observer) {
        var _this = this;

        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          if (_this.options.animate) _this.animate(entry.target);
          observer.unobserve(entry.target);
        });
      }
      /**
       * 
       * @param {Element} element 
       */

    }, {
      key: "animate",
      value: function animate(element) {
        var _this2 = this;

        // Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
        var frameDuration = this.options.frameDuration / 60; // Use that to calculate how many frames we need to complete the animation

        var totalFrames = Math.round(this.options.animationDuration / frameDuration); // An ease-out function that slows the count as it progresses

        var easeOutQuad = function easeOutQuad(t) {
          return t * (2 - t);
        };

        var frame = 0;
        var hasPercentage = false;
        var sanitizedElement = element.textContent.trim().replace(new RegExp(" ", "g"), "");
        if (this.options.detectPercentage && sanitizedElement.includes('%')) hasPercentage = true;
        var countTo = parseInt(sanitizedElement, 10); // Start the animation running 60 times per second

        if (!isNaN(countTo)) {
          var counter = setInterval(function () {
            frame++; // Calculate our progress as a value between 0 and 1
            // Pass that value to our easing function to get our
            // progress on a curve

            var progress = easeOutQuad(frame / totalFrames); // Use the progress value to calculate the current count

            var currentCount = Math.round(countTo * progress); // If the current count has changed, update the element

            if (parseInt(element.textContent, 10) !== currentCount) {
              element.textContent = "".concat(drupalSettings && _this2.options.detectBigNumbers ? currentCount.toLocaleString(drupalSettings.langCode) : currentCount, " ").concat(hasPercentage ? '%' : '');
            } // If we’ve reached our last frame, stop the animation


            if (frame === totalFrames) {
              clearInterval(counter);
            }
          }, frameDuration);
        }
      }
    }]);

    return KeyFigureHandler;
  }();

  /**
   * Add js-sticky CSS class on <body> while scrolling
   */
  var StickyHeader = /*#__PURE__*/function () {
    /**
     * @param {HTMLElement} element 
     */
    function StickyHeader(element) {
      _classCallCheck(this, StickyHeader);

      this.$Body = document.getElementsByTagName('body')[0];
      this.sticky = element.offsetTop + element.offsetHeight;
      this.onScroll = this.onScroll.bind(this);
      this.stickIt = this.stickIt.bind(this);
      window.addEventListener('scroll', this.onScroll);
      this.stickIt();
    }

    _createClass(StickyHeader, [{
      key: "onScroll",
      value: function onScroll() {
        window.requestAnimationFrame(this.stickIt);
      }
    }, {
      key: "stickIt",
      value: function stickIt() {
        if (window.pageYOffset > this.sticky) {
          this.$Body.classList.add('js-sticky');
        } else {
          this.$Body.classList.remove('js-sticky');
        }
      }
    }]);

    return StickyHeader;
  }();

  /**
   * Enables dropdown on a
   * <div class="dropdown">
   *  <div class="dropdown-menu"></div>
   * </div>
   * template
   */
  var Dropdown = /*#__PURE__*/function () {
    /**
     * @param {HTMLElement} element 
     */
    function Dropdown(element) {
      _classCallCheck(this, Dropdown);

      this.element = element;
      this.dropDownMenu = this.getDropDownMenu();
      this.ariaExpandedValue = this.element.getAttribute('aria-expanded') === 'true';
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.element.addEventListener('click', this.toggleDropdown);
      this.element.addEventListener('focusout', this.toggleDropdown);
    }

    _createClass(Dropdown, [{
      key: "getDropDownMenu",
      value: function getDropDownMenu() {
        return this.element.querySelectorAll('.dropdown-menu')[0];
      }
    }, {
      key: "toggleDropdown",
      value: function toggleDropdown(e) {
        this.element.setAttribute('aria-expanded', !this.ariaExpandedValue);
        this.ariaExpandedValue = !this.ariaExpandedValue;

        if (e.type === 'focusout' && !this.element.classList.contains('opened')) {
          return;
        }

        this.element.classList.toggle('opened');
      }
      /**
       * @returns {Dropdown[]}
       */

    }], [{
      key: "bind",
      value: function bind() {
        return Array.from(document.querySelectorAll('.dropdown')).map(function (element) {
          return new Dropdown(element);
        });
      }
    }]);

    return Dropdown;
  }();

  /**
   * Enable Accesible Tabs
   * HTML :
   * <div class="tabs">
          <div class="tablist" role="tablist" aria-label="{{ 'Teacher tabs'|t }}">
              <button role="tab" aria-selected="true" aria-controls="first-tab" id="firstTab">
                  {{ 'First Tab'|t }}
              </button>
              <button role="tab" aria-selected="false" aria-controls="second-tab" id="secondTab">
                  {{ 'Second Tab'|t }}
              </button>
          </div>
          <div class="tabs-progress"></div>
          <div tabindex="0" role="tabpanel" id="first-tab-" aria-labelledby="{{ 'First tab'|t }}">
                  {{ firstTab }}
          </div>
          <div tabindex="0" role="tabpanel" id="second-tab" aria-labelledby="{{ 'Second tab'|t }}" hidden="">
                  {{ secondTab }}
          </div>
      </div>
   */
  var Tabs = /*#__PURE__*/function () {
    function Tabs(element) {
      _classCallCheck(this, Tabs);

      this.tab = element;
      this.tablist = this.tab.querySelectorAll('[role="tablist"]')[0];
      this.tabProgress = this.tab.querySelectorAll('.tabs-progress')[0] || null;
      this.tabProgressBar;
      this.tabProgressIndicator;
      this.tabs;
      this.panels;
      this.keys = {
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        delete: 46
      };
      this.direction = {
        37: -1,
        38: -1,
        39: 1,
        40: 1
      };
      this.delay = this.determineDelay();
      this.generateArrays();
      this.determineFirstFocus();
      this.tabProgress && this.enableTabProgress();
      this.addListeners = this.addListeners.bind(this);
      this.activateTab = this.activateTab.bind(this);
      this.clickEventListener = this.clickEventListener.bind(this);
      this.keydownEventListener = this.keydownEventListener.bind(this);
      this.keyupEventListener = this.keyupEventListener.bind(this);
      this.determineOrientation = this.determineOrientation.bind(this);
      this.deactivateTabs = this.deactivateTabs.bind(this);
      this.determineDeletable = this.determineDeletable.bind(this);
      this.updateProgressTab = this.updateProgressTab.bind(this); // Bind listeners

      for (var i = 0; i < this.tabs.length; ++i) {
        this.addListeners(i);
      }
    }
    /**
       * @returns {Tabs[]}
       */


    _createClass(Tabs, [{
      key: "determineFirstFocus",
      value: function determineFirstFocus() {
        this.activateTab(this.tabs[0], false, true);
      }
    }, {
      key: "generateArrays",
      value: function generateArrays() {
        this.tabs = this.tab.querySelectorAll('[role="tab"]');
        this.panels = this.tab.querySelectorAll('[role="tabpanel"]');
      }
    }, {
      key: "enableTabProgress",
      value: function enableTabProgress() {
        //CREATION DE LA BARRE DE PROGRES
        var progressBar = document.createElement('span');
        progressBar.classList.add('tabs-progress-bar');
        progressBar.style.width = '0%';
        progressBar.style.transition = 'width 250ms cubic-bezier(.84,.01,.19,.99)'; //CREATION DE L'INDICATEUR DE PROGRES

        var progressIndicator = document.createElement('span');
        progressIndicator.classList.add('tabs-progress-indicator');
        progressIndicator.style.left = '0';
        progressIndicator.style.transition = 'left 250ms cubic-bezier(.84,.01,.19,.99)';
        this.tabProgress.appendChild(progressBar);
        this.tabProgress.appendChild(progressIndicator);
        this.tabProgressBar = progressBar;
        this.tabProgressIndicator = progressIndicator; //On cherche la tab list qui est focus

        var focusedTab = this.getFocusedTab();
        this.updateProgressTab(focusedTab);
      }
    }, {
      key: "getFocusedTab",
      value: function getFocusedTab() {
        return this.tab.querySelectorAll('[role="tab"][aria-selected="true"]')[0];
      }
    }, {
      key: "updateProgressTab",
      value: function updateProgressTab(focusedTab) {
        //On calcule la position de progrès
        var progressPercentage = (focusedTab.offsetWidth / 2 + focusedTab.getBoundingClientRect().left - this.tab.getBoundingClientRect().left) * 100 / this.tabProgress.offsetWidth;
        var progress = focusedTab.offsetWidth / 2 + focusedTab.getBoundingClientRect().left - this.tab.getBoundingClientRect().left;
        this.tabProgressBar.style.width = "".concat(progressPercentage, "%");
        this.tabProgressIndicator.style.left = "".concat(progress - this.tabProgressIndicator.offsetWidth / 2, "px");
      }
    }, {
      key: "addListeners",
      value: function addListeners(index) {
        this.tabs[index].addEventListener('click', this.clickEventListener);
        this.tabs[index].addEventListener('keydown', this.keydownEventListener);
        this.tabs[index].addEventListener('keyup', this.keyupEventListener); // Build an array with all tabs (<button>s) in it

        this.tabs[index].index = index;
      } // When a tab is clicked, activateTab is fired to activate it

    }, {
      key: "clickEventListener",
      value: function clickEventListener(event) {
        var tab = event.target;
        this.activateTab(tab, false);
      } // Handle keydown on tabs

    }, {
      key: "keydownEventListener",
      value: function keydownEventListener(event) {
        var key = event.keyCode;

        switch (key) {
          case this.keys.end:
            event.preventDefault(); // Activate last tab

            this.activateTab(this.tabs[this.tabs.length - 1]);
            break;

          case this.keys.home:
            event.preventDefault(); // Activate first tab

            this.activateTab(this.tabs[0]);
            break;
          // Up and down are in keydown
          // because we need to prevent page scroll >:)

          case this.keys.up:
          case this.keys.down:
            this.determineOrientation(event);
            break;
        }
      } // Handle keyup on tabs

    }, {
      key: "keyupEventListener",
      value: function keyupEventListener(event) {
        var key = event.keyCode;

        switch (key) {
          case this.keys.left:
          case this.keys.right:
            this.determineOrientation(event);
            break;

          case this.keys.delete:
            this.determineDeletable(event);
            break;
        }
      } // When a tablistâ€™s aria-orientation is set to vertical,
      // only up and down arrow should  .
      // In all other cases only left and right arrow  .

    }, {
      key: "determineOrientation",
      value: function determineOrientation(event) {
        var key = event.keyCode;
        var vertical = this.tablist.getAttribute('aria-orientation') == 'vertical';
        var proceed = false;

        if (vertical) {
          if (key === this.keys.up || key === this.keys.down) {
            event.preventDefault();
            proceed = true;
          }
        } else {
          if (key === this.keys.left || key === this.keys.right) {
            proceed = true;
          }
        }

        if (proceed) {
          this.switchTabOnArrowPress(event);
        }
      } // Either focus the next, previous, first, or last tab
      // depening on key pressed

    }, {
      key: "switchTabOnArrowPress",
      value: function switchTabOnArrowPress(event) {
        var pressed = event.keyCode;

        for (var x = 0; x < this.tabs.length; x++) {
          this.tabs[x].addEventListener('focus', this.focusEventHandler, {
            preventScroll: true
          });
        }

        if (this.direction[pressed]) {
          var _target = event.target;

          if (_target.index !== undefined) {
            if (this.tabs[_target.index + this.direction[pressed]]) {
              this.tabs[_target.index + this.direction[pressed]].focus();
            } else if (pressed === this.keys.left || pressed === this.keys.up) {
              this.focusLastTab();
            } else if (pressed === this.keys.right || pressed == this.keys.down) {
              this.focusFirstTab();
            }
          }
        }
      } // Activates any given tab panel

    }, {
      key: "activateTab",
      value: function activateTab(tab, setFocus, firstFocus) {
        setFocus = setFocus || true; // Deactivate all other tabs

        this.deactivateTabs(); // Remove tabindex attribute

        tab.removeAttribute('tabindex'); // Set the tab as selected

        tab.setAttribute('aria-selected', 'true'); // Get the value of aria-controls (which is an ID)

        var controls = tab.getAttribute('aria-controls'); // Remove hidden attribute from tab panel to make it visible

        document.getElementById(controls).removeAttribute('hidden');

        if (!firstFocus) {
          this.updateProgressTab(tab);
        } // Set focus when required


        if (setFocus) {
          tab.focus({
            preventScroll: true
          });
        }
      } // Deactivate all tabs and tab panels

    }, {
      key: "deactivateTabs",
      value: function deactivateTabs() {
        for (var t = 0; t < this.tabs.length; t++) {
          this.tabs[t].setAttribute('tabindex', '-1');
          this.tabs[t].setAttribute('aria-selected', 'false');
          this.tabs[t].removeEventListener('focus', this.focusEventHandler);
        }

        for (var p = 0; p < this.panels.length; p++) {
          this.panels[p].setAttribute('hidden', 'hidden');
        }
      } // Make a guess

    }, {
      key: "focusFirstTab",
      value: function focusFirstTab() {
        this.tabs[0].focus({
          preventScroll: true
        });
      } // Make a guess

    }, {
      key: "focusLastTab",
      value: function focusLastTab() {
        this.tabs[this.tabs.length - 1].focus({
          preventScroll: true
        });
      } // Detect if a tab is deletable

    }, {
      key: "determineDeletable",
      value: function determineDeletable(event) {
        target = event.target;

        if (target.getAttribute('data-deletable') !== null) {
          // Delete target tab
          this.deleteTab(event, target); // Update arrays related to tabs widget

          this.generateArrays(); // Activate the closest tab to the one that was just deleted

          if (target.index - 1 < 0) {
            this.activateTab(this.tabs[0]);
          } else {
            this.activateTab(this.tabs[target.index - 1]);
          }
        }
      } // Deletes a tab and its panel

    }, {
      key: "deleteTab",
      value: function deleteTab(event) {
        var target = event.target;
        var panel = document.getElementById(target.getAttribute('aria-controls'));
        target.parentElement.removeChild(target);
        panel.parentElement.removeChild(panel);
      } // Determine whether there should be a delay
      // when user navigates with the arrow keys

    }, {
      key: "determineDelay",
      value: function determineDelay() {
        var hasDelay = this.tablist.hasAttribute('data-delay');
        var delay = 0;

        if (hasDelay) {
          var delayValue = this.tablist.getAttribute('data-delay');

          if (delayValue) {
            delay = delayValue;
          } else {
            // If no value is specified, default to 300ms
            delay = 300;
          }
        }
        return delay;
      } //

    }, {
      key: "focusEventHandler",
      value: function focusEventHandler(event) {
        var target = event.target;
        setTimeout(this.checkTabFocus, this.delay, target);
      } // Only activate tab on focus if it still has focus after the delay

    }, {
      key: "checkTabFocus",
      value: function checkTabFocus(target) {
        focused = document.activeElement;

        if (target === focused) {
          this.activateTab(target, false);
        }
      }
    }], [{
      key: "bind",
      value: function bind() {
        return Array.from(document.querySelectorAll('.tabs')).map(function (element) {
          return new Tabs(element);
        });
      }
    }]);

    return Tabs;
  }();

  exports.Dropdown = Dropdown;
  exports.KeyFigureHandler = KeyFigureHandler;
  exports.StickyHeader = StickyHeader;
  exports.Tabs = Tabs;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
//# sourceMappingURL=common.js.map
