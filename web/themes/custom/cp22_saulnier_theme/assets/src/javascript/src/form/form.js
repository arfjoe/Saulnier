import {formNews} from "./src/FormNews";

(function (Drupal) { // closure
  'use strict';
  Drupal.behaviors.form = formNews;
}(Drupal));
