import {popinDefault} from "./src/PopinDefault";

(function (Drupal) { // closure
    'use strict';

    // Popin
    Drupal.behaviors.popinDefault = popinDefault;
}(Drupal));