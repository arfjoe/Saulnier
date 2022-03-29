<?php
namespace Drupal\cp22_saulnier_global\Gateway;

use Drupal\Core\Entity\EntityTypeManager;
use Drupal\taxonomy\Entity\Term;

class BasicListOfTaxonomyTermsGateway implements BasicListOfTaxonomyTermsGatewayInterface{

  /**
   * @var EntityTypeManager
   */
  protected $entityTypeManager;

  /**
   * BasicTaxonomyGateway constructor.
   *
   * @param EntityTypeManager $entityTypeManager
   *
   */
  public function __construct(EntityTypeManager $entityTypeManager) {
    $this->entityTypeManager = $entityTypeManager;
  }

  public function fetchTermsByWeight($vid): array {
    return $this->entityTypeManager->getStorage('taxonomy_term')
      ->getQuery()
      ->condition('vid', $vid)
      ->condition('status',1)
      ->sort('weight', 'ASC')
      ->execute();
  }

  public function fetchTerms($vid): array {
    // TODO: Implement fetchTerms() method.
    $termsEntities = $this->entityTypeManager->getStorage('taxonomy_term')
      ->getQuery()
      ->condition('vid',$vid)
      ->execute();

    return $termsEntities;
  }
}
