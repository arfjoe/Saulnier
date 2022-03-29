<?php

//namespace Drupal\cp22_saulnier_socials\Manager;
//
//use Drupal\Core\Entity\EntityTypeManagerInterface;
//use Drupal\cp22_saulnier_socials\Gateway\SocialsGatewayInterface;
//
//class SocialsManager {
//
//  const NODE_ENTITY_TYPE_ID = 'taxonomy_term';
//  const VIEWMODE = 'full';
//
//  /**
//   * @var \Drupal\cp22_saulnier_news\Gateway\TaxonomyGatewayInterface
//   */
//  protected $themeTaxonomyGateway;
//
//  /*
//   * @var EDrupal\Core\Entity\EntityTypeManagerInterface
//   */
//  protected $entityTypeManager;
//
//  public function __construct(SocialsGatewayInterface $themeTaxonomyGateway, EntityTypeManagerInterface $entityTypeManager){
//    $this->themeTaxonomyGateway = $themeTaxonomyGateway;
//    $this->entityTypeManager = $entityTypeManager;
//  }
//
//  /**
//   * @return array
//   */
//  public function getList() {
//
//    //On récupère les query envoyé par la gateway
//    $tids= $this->themeTaxonomyGateway->getAllPublishedSocialsTerm();
//    $terms = $this->entityTypeManager->getStorage('taxonomy_term')->loadMultiple($tids);
//    $builtNodes = [];
//    if (empty($tids)){
//      return  $builtNodes;
//    }
//      $viewBuilder = $this->entityTypeManager->getViewBuilder(self::NODE_ENTITY_TYPE_ID);
//      $builtNodes = $viewBuilder->viewMultiple($terms);
//    return $builtNodes;
//  }
//}

namespace Drupal\cp22_saulnier_socials\Manager;

use Drupal\cp22_saulnier_global\Manager\BasicListOfTaxonomyTermsManager;

class SocialsManager extends BasicListOfTaxonomyTermsManager {

  const SERVICE_NAME = 'cp22_saulnier_socials.socials_manager';

  protected function getVocabularyId() {
    return 'network';
  }
}

