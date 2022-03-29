<?php

namespace Drupal\cp22_saulnier_partners\Controller;

use Drupal;
use Drupal\node\NodeStorage;
use Drupal\taxonomy\Entity\Term;
use Drupal\Core\Controller\ControllerBase;

/**
 * An example controller.
 */
class PartnersController extends ControllerBase{

  /**
   * Returns a render-able array for a test page.
   */
  public function getContent() {

    $entityTypeManager = Drupal::entityTypeManager();
    $nodeStorage = $entityTypeManager->getStorage('taxonomy_term');


    $query = $nodeStorage->getQuery();

    $query->condition('vid', 'partners')
      ->condition('status', TRUE)
      ->sort('changed', 'DESC');

    $nids = $query->execute();

    if (!empty($nids)) {

      $nodeObject = $nodeStorage->loadMultiple($nids);
      $nodeViewBuilder = $entityTypeManager->getViewBuilder('taxonomy_term');
      $viewMode = 'List';

      $nodes = [];

      foreach ($nodeObject as $node) {
        $nodes[] = $nodeViewBuilder->view($node, $viewMode);
      }

      $build = [
        'wrapper' => [
          '#type' => 'container',
          '#attributes' => [
            'class' => [
              'Partners-wrapper'
            ],
          ],
          'nodes' => [
            '#theme' => 'partnersList',
            '#list_type' => 'ul',
            '#title' => 'Partenaires',
            '#items' => $nodes,
            '#attributes' => ['class' => 'PartnersList'],
          ],
        ],
      ];
    }
    return $build;
  }
}
