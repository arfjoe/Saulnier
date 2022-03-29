<?php
namespace Drupal\cp22_saulnier_edito\Gateway;
use Drupal\adimeo_tools\Service\LanguageService;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\node\NodeInterface;
/**
 * NewsListService service.
 */
class EditoGateway implements EditoGatewayInterface {

  const NODE_TYPE = 'node';
  const NODE_PARAM_IN_PREPROCESS_VARIABLES = 'node';
  const EDITO_BUNDLE = 'edito_project';
  /**
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  private $nodeStorage;

  /**
   * @var LanguageService
   */
  protected $languageService;

  /**
   * Constructs a NewsListService object.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager,LanguageService $languageService) {
    $this->nodeStorage = $entity_type_manager->getStorage(self::NODE_TYPE);
    $this->languageService = $languageService;
  }

  /**
   * @return NodeInterface[]
   */
  public function getAllPublishedNodes(): array {
    return $this->nodeStorage->loadMultiple($this->getAllPublishedNodesNid());
  }

  /**
   * @return int[]
   */
  protected function getAllPublishedNodesNid(): array {
    $query = $this->nodeStorage->getQuery();
    $query->condition($this->languageService->translate());
    $query->condition('status', NodeInterface::PUBLISHED);
    $query->condition('type', self::EDITO_BUNDLE);
    $query->range(0, 4);
    $query->sort('changed','DESC');
    return $query->execute();
  }
}
