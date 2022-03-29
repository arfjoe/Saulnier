import {footer} from "./src/Footer";
import {header} from "./src/Header";

(function (Drupal) { // closure
    'use strict';
    Drupal.behaviors.footer = footer;
    Drupal.behaviors.header = header;
}(Drupal));
