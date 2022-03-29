<?php
//namespace Drupal\cp22_saulnier_partners\Manager;
//
//use Drupal\Core\Entity\EntityTypeManagerInterface;
//use Drupal\cp22_saulnier_partners\Gateway\PartnersGatewayInterface;
//
//class PartnersManager {
//
//  const NODE_ENTITY_TYPE_ID = 'taxonomy_term';
//
//  const VIEWMODE = 'full';
//
//  /**
//   * @var \Drupal\cp22_saulnier_partners\Gateway\PartnersGatewayInterface
//   */
//  protected $partnersGateway;
//
//  /*
//   * @var EDrupal\Core\Entity\EntityTypeManagerInterface
//   */
//  protected $entityTypeManager;
//
//  public function __construct(PartnersGatewayInterface $partnersGateway, EntityTypeManagerInterface $entityTypeManager) {
//    $this->partnersGateway = $partnersGateway;
//    $this->entityTypeManager = $entityTypeManager;
//  }
//
//  /**
//   * @return array
//   */
//  public function getList() {
//
//    //On récupère les query envoyé par la gateway
//    $tids = $this->partnersGateway->getAllPublishedPartnersTerm();
//    if (!empty($tids)) {
//
//      $view_builder = $this->entityTypeManager
//        ->getViewBuilder('taxonomy_term');
//      $terms = $this->entityTypeManager->getStorage('taxonomy_term')
//        ->loadMultiple($tids);
//      foreach ($terms as $term) {
//        $build[] = $view_builder->view($term);
//      }
//    }
//    return $build;
//  }
//}


namespace Drupal\cp22_saulnier_partners\Manager;

use Drupal\cp22_saulnier_global\Manager\BasicListOfTaxonomyTermsManager;

class PartnersManager extends BasicListOfTaxonomyTermsManager {

  const SERVICE_NAME = 'cp22_saulnier_partners.partners_manager';

  protected function getVocabularyId() {
    return 'partners';
  }
}
