<?php

namespace Drupal\cp22_saulnier_themes\Manager;

use Drupal\cp22_saulnier_global\Manager\BasicListOfTaxonomyTermsManager;


class ThemeTaxonomyManager extends BasicListOfTaxonomyTermsManager {

  const SERVICE_NAME = 'cp22_saulnier_themes.themes_manager';

  protected function getVocabularyId() {
    return 'theme';
  }
}

//use Drupal\Core\Entity\EntityTypeManagerInterface;
//use Drupal\cp22_saulnier_themes\Gateway\TaxonomyGatewayInterface;
//
//class ThemeTaxonomyManager{
//
//  /**
//   * @var \Drupal\cp22_saulnier_themes\Gateway\TaxonomyGatewayInterface
//   */
//  protected $themeTaxonomyGateway;
//
//  /*
//   * @var EDrupal\Core\Entity\EntityTypeManagerInterface
//   */
//  protected $entityTypeManager;
//
//  public function __construct(TaxonomyGatewayInterface $themeTaxonomyGateway, EntityTypeManagerInterface $entityTypeManager){
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
//    $tids= $this->themeTaxonomyGateway->fetchTerms();
//    $list = [];
//
//    if (empty($tids)){
//      return $list;
//    }
//
//    $terms = $this->entityTypeManager->getStorage('taxonomy_term')->loadMultiple($tids);
//
//    foreach ($terms as $term){
//      $list[$term->id()] = $term->label();
//    }
//
//    return $list;
//  }
//
//}
