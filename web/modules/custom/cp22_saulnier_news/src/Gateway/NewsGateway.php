<?php
namespace Drupal\cp22_saulnier_news\Gateway;
use Drupal\adimeo_tools\Service\LanguageService;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\node\NodeInterface;
/**
 * NewsListService service.
 */
class NewsGateway implements NewsGatewayInterface {

  const NODE_TYPE = 'node';
  const NODE_PARAM_IN_PREPROCESS_VARIABLES = 'node';
  const NEWS_BUNDLE = 'news';
  const NEWS_LIST_BUNDLE = 'news_list';
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
    $this->languageService = $languageService->getCurrentLanguageId();
  }

  /**
   * @return NodeInterface[]
   */
  public function getAllPublishedNodes($dateSort = 'DESC'): array {
    return $this->nodeStorage->loadMultiple($this->getAllPublishedNodesNid($dateSort));
  }

  /**
   * @return int[]
   */
  protected function getAllPublishedNodesNid($dateSort = 'DESC'): array {
    $dateSort = empty($dateSort) ? 'DESC' : $dateSort;
    $query = $this->nodeStorage->getQuery();
    $query->condition('langcode', $this->languageService);
    $query->condition('status', NodeInterface::PUBLISHED);
    $query->condition('type', self::NEWS_BUNDLE);
    $query->pager(2);
    $query->sort('changed', $dateSort);
    return $query->execute();
  }

  /**
   * @return NodeInterface[]
   */
  protected function getAllPublishedNodesByTheme($themeId, $dateSort = 'DESC'): array {
    $dateSort = empty($dateSort) ? 'DESC' : $dateSort;
    $query = $this->nodeStorage->getQuery();
    $query->condition('status', NodeInterface::PUBLISHED);
    $query->condition('type', self::NEWS_BUNDLE);
    $query->condition('field_theme',$themeId);
    $query->sort('changed', $dateSort);
    return $query->execute();
  }

  public function getAllPublishedNodesByThemeId($themeId,$dateSort = 'DESC'){
    return $this->nodeStorage->loadMultiple($this->getAllPublishedNodesByTheme($themeId, $dateSort));
  }

  //Query pour le breacrumb
  public function fetchNewsListNode(){
    $query = $this->nodeStorage->getQuery();
    $query->condition('status', NodeInterface::PUBLISHED);
    $query->condition('type', self::NEWS_LIST_BUNDLE);
    $query->sort('changed', 'DESC');
    $query->range(0,1);
    return $query->execute();
  }
}
