<?php

namespace Drupal\cp22_saulnier_themes\Controller;

use Drupal;
use Drupal\node\NodeInterface;
use Drupal\node\NodeStorage;
use Drupal\taxonomy\Entity\Term;
use Drupal\Core\Controller\ControllerBase;

/**
 * An example controller.
 */
class ThemeController extends ControllerBase {

  /**
   * Returns a render-able array for a test page.
   */

  public function getThemeContent(){

    $entityTypeManager = Drupal::entityTypeManager();
    $nodeStorage = $entityTypeManager->getStorage('node');


    $query = $nodeStorage->getQuery();

    $query->condition('status', NodeInterface::PUBLISHED);
    $query->condition('type', 'news');
//    $query->condition('field_theme', 'tid');
    $query->sort('changed', 'DESC');

    $nids = $query->execute();

    if (!empty($nids)) {

      $nodeObject = $nodeStorage->loadMultiple($nids);
      $nodeViewBuilder = $entityTypeManager->getViewBuilder('node');
      $viewMode = 'full';

      $nodes = [];

      foreach ($nodeObject as $node) {
        $nodes[] = $nodeViewBuilder->view($node, $viewMode);
      }

      $build = [
        'wrapper' => [
          '#type' => 'container',
          '#attributes' => [
            'class' => [
              'Theme-wrapper'
            ],
          ],
          'nodes' => [
            '#theme' => 'themesList',
            '#list_type' => 'ul',
            '#title' => 'Thématique',
            '#items' => $nodes,
            '#attributes' => ['class' => 'ThemeList'],
          ],
        ],
      ];
    }
    return $build;
  }
}
