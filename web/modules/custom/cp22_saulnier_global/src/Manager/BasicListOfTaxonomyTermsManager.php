<?php
namespace Drupal\cp22_saulnier_global\Manager;



use Drupal\Core\Entity\EntityTypeManager;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\cp22_saulnier_global\Gateway\BasicListOfTaxonomyTermsGatewayInterface;

abstract class BasicListOfTaxonomyTermsManager {

  protected $entityTypeManager;

  protected $gateway;
  /**
   * @var string $vocabulary
   */
  protected $vocabularyId;
  /**
   * NewspaperRepository constructor.
   *
   * @param EntityTypeManager $entityTypeManager
   *   Instance of EntityTypeManager.
   * @param BasicListOfTaxonomyTermsGatewayInterface $gateway
   */
  public function __construct(EntityTypeManagerInterface $entityTypeManager, BasicListOfTaxonomyTermsGatewayInterface $gateway) {
    $this->entityTypeManager = $entityTypeManager;
    $this->gateway = $gateway;
    $this->vocabularyId = $this->getVocabularyId();
  }

  abstract protected function getVocabularyId();

  public function getBuiltTermsListByWeight (): array {
    $build = [];
    $tids = $this->gateway->fetchTermsByWeight($this->vocabularyId);
    if (!empty($tids)) {
      $view_builder = $this->entityTypeManager
        ->getViewBuilder('taxonomy_term');


      $terms = $this->entityTypeManager
        ->getStorage('taxonomy_term')
        ->loadMultiple($tids);

      foreach ($terms as $term) {
        $build[] = $view_builder->view($term);
      }
    }
    return $build;
  }

  /**
   * @return array
   */
  public function getList() {

    //On récupère les query envoyé par la gateway
    $tids= $this->gateway->fetchTerms($this->vocabularyId);
    $list = [];

    if (empty($tids)){
      return $list;
    }

    $terms = $this->entityTypeManager->getStorage('taxonomy_term')->loadMultiple($tids);

    foreach ($terms as $term){
      $list[$term->id()] = $term->label();
    }
    return $list;
  }
}
