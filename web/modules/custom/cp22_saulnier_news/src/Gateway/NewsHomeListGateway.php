<?php
namespace Drupal\cp22_saulnier_news\Gateway;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\node\NodeInterface;
/**
 * NewsListService service.
 */
class NewsHomeListGateway implements NewsHomeListGatewayInterface {

  const NODE_TYPE = 'node';
  const NODE_PARAM_IN_PREPROCESS_VARIABLES = 'node';
  const NEWS_BUNDLE = 'news';
  /**
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  private $nodeStorage;

  /**
   * Constructs a NewsListService object.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager) {
    $this->nodeStorage = $entity_type_manager->getStorage(self::NODE_TYPE);
  }

  /**
   * @return NodeInterface[]
   */
  public function getHomePublishedNodes($dateSort = 'DESC'): array {
    //On retourne un array de toutes les news récupéré par la méthode getHomePublishedNodesNid
    return $this->nodeStorage->loadMultiple($this->getHomePublishedNodesNid($dateSort));
  }

  /**
   * @return int[]
   */
  //On fait une query afin de récupérer toutes les news voulu
  protected function getHomePublishedNodesNid($dateSort = 'DESC'): array {
    $dateSort = empty($dateSort) ? 'DESC' : $dateSort;
    $query = $this->nodeStorage->getQuery();
    //Status publié
    $query->condition('status', NodeInterface::PUBLISHED);
    //Promu en page d'accueil
    $query->condition('promote',true);
    //De type news
    $query->condition('type', self::NEWS_BUNDLE);
    //Pas plus de 4 affiché
    $query->pager(4);
    //Trier par date de publication/modification en ordre décroissant
    $query->sort('changed', $dateSort);
    return $query->execute();
  }
}
