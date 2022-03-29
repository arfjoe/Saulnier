<?php
namespace Drupal\cp22_saulnier_news\Manager;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\cp22_saulnier_news\Gateway\NewsHomeListGatewayInterface;
use Drupal\node\NodeInterface;

/**
 * NewsListService service.
 */
class NewsHomeListManager {

  const NODE_ENTITY_TYPE_ID = 'node';

  const NEWS_NODE_VIEWMODE_IN_LIST_PAGE = 'teaser_homepage';

  /**
   * @var \Drupal\cp22_saulnier_news\Gateway\NewsGatewayInterface
   */
  protected $gateway;

  /*
   * @var EDrupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;


  public function __construct(NewsHomeListGatewayInterface $newsGateway, EntityTypeManagerInterface $entityTypeManager) {
    $this->gateway = $newsGateway;
    $this->entityTypeManager = $entityTypeManager;
  }

  public function getHomePublisedNews(){
    //On récupére l'array des news de la gateway
    $nodes = $this->gateway->getHomePublishedNodes();
    if($nodes) {
      //On crée un viewbuilder
      $viewBuilder = $this->entityTypeManager->getViewBuilder(self::NODE_ENTITY_TYPE_ID);
      //Affiché en teaser_homepage
      $builtNodes = $viewBuilder->viewMultiple($nodes,self::NEWS_NODE_VIEWMODE_IN_LIST_PAGE);

      $builtNodes['#cache']['tags'] = ['node_list:news'];
    }
    return $builtNodes;
  }
}
