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

    class Tabs {
        constructor(element) {
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
            this.updateProgressTab = this.updateProgressTab.bind(this);
            // Bind listeners
            for (let i = 0; i < this.tabs.length; ++i) {
                this.addListeners(i);
            };
        }
    
    
        /**
           * @returns {Tabs[]}
           */
        static bind() {
            return Array.from(document.querySelectorAll('.tabs')).map((element) => {
                return new Tabs(element);
            });
        }
    
        determineFirstFocus() {
            this.activateTab(this.tabs[0], false, true)
        }
    
        generateArrays() {
            this.tabs = this.tab.querySelectorAll('[role="tab"]');
            this.panels = this.tab.querySelectorAll('[role="tabpanel"]');
        }
    
        enableTabProgress() {
            //CREATION DE LA BARRE DE PROGRES
            let progressBar = document.createElement('span');
            progressBar.classList.add('tabs-progress-bar');
            progressBar.style.width = '0%';
            progressBar.style.transition = 'width 250ms cubic-bezier(.84,.01,.19,.99)';
    
            //CREATION DE L'INDICATEUR DE PROGRES
            let progressIndicator = document.createElement('span');
            progressIndicator.classList.add('tabs-progress-indicator');
            progressIndicator.style.left = '0';
            progressIndicator.style.transition = 'left 250ms cubic-bezier(.84,.01,.19,.99)';
    
            this.tabProgress.appendChild(progressBar);
            this.tabProgress.appendChild(progressIndicator);
    
            this.tabProgressBar = progressBar;
            this.tabProgressIndicator = progressIndicator;
            //On cherche la tab list qui est focus
            let focusedTab = this.getFocusedTab();
            this.updateProgressTab(focusedTab);
        }
    
        getFocusedTab() {
            return this.tab.querySelectorAll('[role="tab"][aria-selected="true"]')[0];
        }
    
        updateProgressTab(focusedTab) {
            //On calcule la position de progrès
            let progressPercentage = (((focusedTab.offsetWidth / 2) + focusedTab.getBoundingClientRect().left - this.tab.getBoundingClientRect().left) * 100) / this.tabProgress.offsetWidth;
            let progress = (focusedTab.offsetWidth / 2) + focusedTab.getBoundingClientRect().left - this.tab.getBoundingClientRect().left;
          
            this.tabProgressBar.style.width = `${progressPercentage}%`;
            this.tabProgressIndicator.style.left = `${progress - this.tabProgressIndicator.offsetWidth / 2}px`;
        }
    
    
        addListeners(index) {
            this.tabs[index].addEventListener('click', this.clickEventListener);
            this.tabs[index].addEventListener('keydown', this.keydownEventListener);
            this.tabs[index].addEventListener('keyup', this.keyupEventListener);
    
            // Build an array with all tabs (<button>s) in it
            this.tabs[index].index = index;
        }
    
        // When a tab is clicked, activateTab is fired to activate it
        clickEventListener(event) {
            let tab = event.target;
            this.activateTab(tab, false);
        }
    
        // Handle keydown on tabs
        keydownEventListener(event) {
            let key = event.keyCode;
    
            switch (key) {
                case this.keys.end:
                    event.preventDefault();
                    // Activate last tab
                    this.activateTab(this.tabs[this.tabs.length - 1]);
                    break;
                case this.keys.home:
                    event.preventDefault();
                    // Activate first tab
                    this.activateTab(this.tabs[0]);
                    break;
    
                // Up and down are in keydown
                // because we need to prevent page scroll >:)
                case this.keys.up:
                case this.keys.down:
                    this.determineOrientation(event);
                    break;
            };
        }
    
        // Handle keyup on tabs
        keyupEventListener(event) {
            let key = event.keyCode;
            switch (key) {
                case this.keys.left:
                case this.keys.right:
                    this.determineOrientation(event);
                    break;
                case this.keys.delete:
                    this.determineDeletable(event);
                    break;
            };
        }
    
        // When a tablistâ€™s aria-orientation is set to vertical,
        // only up and down arrow should  .
        // In all other cases only left and right arrow  .
        determineOrientation(event) {
            let key = event.keyCode;
            let vertical = this.tablist.getAttribute('aria-orientation') == 'vertical';
            let proceed = false;
    
            if (vertical) {
                if (key === this.keys.up || key === this.keys.down) {
                    event.preventDefault();
                    proceed = true;
                };
            }
            else {
                if (key === this.keys.left || key === this.keys.right) {
                    proceed = true;
                };
            };
    
            if (proceed) {
                this.switchTabOnArrowPress(event);
            };
        }
    
        // Either focus the next, previous, first, or last tab
        // depening on key pressed
        switchTabOnArrowPress(event) {
            let pressed = event.keyCode;
    
            for (let x = 0; x < this.tabs.length; x++) {
                this.tabs[x].addEventListener('focus', this.focusEventHandler, {
                    preventScroll: true,
                });
            };
    
            if (this.direction[pressed]) {
                let target = event.target;
                if (target.index !== undefined) {
                    if (this.tabs[target.index + this.direction[pressed]]) {
                        this.tabs[target.index + this.direction[pressed]].focus();
                    }
                    else if (pressed === this.keys.left || pressed === this.keys.up) {
                        this.focusLastTab();
                    }
                    else if (pressed === this.keys.right || pressed == this.keys.down) {
                        this.focusFirstTab();
                    };
                };
            };
        }
    
        // Activates any given tab panel
        activateTab(tab, setFocus, firstFocus) {
            setFocus = setFocus || true;
            // Deactivate all other tabs
            this.deactivateTabs();
    
            // Remove tabindex attribute
            tab.removeAttribute('tabindex');
    
            // Set the tab as selected
            tab.setAttribute('aria-selected', 'true');
    
            // Get the value of aria-controls (which is an ID)
            let controls = tab.getAttribute('aria-controls');
    
            // Remove hidden attribute from tab panel to make it visible
            document.getElementById(controls).removeAttribute('hidden');
            if (!firstFocus) {
                this.updateProgressTab(tab);
            }
            // Set focus when required
            if (setFocus) {
                tab.focus({ preventScroll: true });
            };
        }
    
        // Deactivate all tabs and tab panels
        deactivateTabs() {
            for (let t = 0; t < this.tabs.length; t++) {
                this.tabs[t].setAttribute('tabindex', '-1');
                this.tabs[t].setAttribute('aria-selected', 'false');
                this.tabs[t].removeEventListener('focus', this.focusEventHandler);
            };
    
            for (let p = 0; p < this.panels.length; p++) {
                this.panels[p].setAttribute('hidden', 'hidden');
            };
        }
    
        // Make a guess
        focusFirstTab() {
            this.tabs[0].focus({preventScroll: true});
        }
    
        // Make a guess
        focusLastTab() {
            this.tabs[this.tabs.length - 1].focus({preventScroll: true});
        }
    
        // Detect if a tab is deletable
        determineDeletable(event) {
            target = event.target;
    
            if (target.getAttribute('data-deletable') !== null) {
                // Delete target tab
                this.deleteTab(event, target);
    
                // Update arrays related to tabs widget
                this.generateArrays();
    
                // Activate the closest tab to the one that was just deleted
                if (target.index - 1 < 0) {
                    this.activateTab(this.tabs[0]);
                }
                else {
                    this.activateTab(this.tabs[target.index - 1]);
                };
            };
        }
    
        // Deletes a tab and its panel
        deleteTab(event) {
            let target = event.target;
            let panel = document.getElementById(target.getAttribute('aria-controls'));
    
            target.parentElement.removeChild(target);
            panel.parentElement.removeChild(panel);
        }
    
        // Determine whether there should be a delay
        // when user navigates with the arrow keys
        determineDelay() {
            let hasDelay = this.tablist.hasAttribute('data-delay');
            let delay = 0;
    
            if (hasDelay) {
                let delayValue = this.tablist.getAttribute('data-delay');
                if (delayValue) {
                    delay = delayValue;
                }
                else {
                    // If no value is specified, default to 300ms
                    delay = 300;
                };
            };
    
            return delay;
        }
    
        //
        focusEventHandler(event) {
            let target = event.target;
    
            setTimeout(this.checkTabFocus, this.delay, target);
        }
    
        // Only activate tab on focus if it still has focus after the delay
        checkTabFocus(target) {
            focused = document.activeElement;
    
            if (target === focused) {
                this.activateTab(target, false);
            };
        }
    }
    
    export { Tabs };