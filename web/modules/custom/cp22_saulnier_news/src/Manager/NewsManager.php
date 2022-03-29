<?php
namespace Drupal\cp22_saulnier_news\Manager;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\cp22_saulnier_news\Gateway\NewsGatewayInterface;
use Drupal\node\NodeInterface;

/**
 * NewsListService service.
 */
class NewsManager {

  const NEWS_LIST_BUNDLE = 'news_list';
  const NODE_ENTITY_TYPE_ID = 'node';
  const NEWS_LIST_PREPROCESS_KEY = 'newsList';
  const NEWS_NODE_VIEWMODE_IN_LIST_PAGE = 'teaser';

  /**
   * @var \Drupal\cp22_saulnier_news\Gateway\NewsGatewayInterface
   */
  protected $gateway;

  /*
   * @var EDrupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;


  public function __construct(NewsGatewayInterface $newsGateway, EntityTypeManagerInterface $entityTypeManager){
    $this->gateway = $newsGateway;
    $this->entityTypeManager = $entityTypeManager;
  }

  /**
   * @return array
   */
  //$themeId = NULL dans param de la méthode
  public function getBuiltNewsNodeForNewsListPage($dateSort = 'DESC') {
    $builtNodes = [];
    //    if ($themeId){
    //On récupère les query envoyé par la gateway
    $nodes = $this->gateway->getAllPublishedNodes($dateSort);
    //    }
    //    else{
    //      $nodes = $this->gateway->getAllPublishedNodesbyTheme();
    //    }


    if($nodes) {
      $viewBuilder = $this->entityTypeManager->getViewBuilder(self::NODE_ENTITY_TYPE_ID);
      $builtNodes = $viewBuilder->viewMultiple($nodes,self::NEWS_NODE_VIEWMODE_IN_LIST_PAGE);
      $builtNodes['#cache']['tags'] = ['node_list:news'];
    }
    return $builtNodes;
  }

  /**
   * @param $themeId
   */
  public function getBuiltNewsNodeForNewsListPageByThemeId($themeId, $dateSort = 'DESC'){
    $builtNodes = [];

    $nodes = $this->gateway->getAllPublishedNodesByThemeId($themeId, $dateSort);

    if($nodes) {
      $viewBuilder = $this->entityTypeManager->getViewBuilder(self::NODE_ENTITY_TYPE_ID);
      $builtNodes = $viewBuilder->viewMultiple($nodes,self::NEWS_NODE_VIEWMODE_IN_LIST_PAGE);
      $builtNodes['#cache']['tags'] = ['node_list:news'];
    }
    return $builtNodes;
  }

  /**
   * @param array $variables Variables from hook_preprocess_node
   *
   * @return array
   */
  public function addNewsListToNodePreprocessVariableIfNeeded(array $variables): array {
    if (!$this->isVariableCurrentNodeANewsList($variables)) {
      return $variables;
    }
    $variables[self::NEWS_LIST_PREPROCESS_KEY] = $this->gateway->getAllPublishedNodes();
    return $variables;
  }
  protected function isVariableCurrentNodeANewsList(array $variables): bool {
    /** @var NodeInterface $node */
    $node = $variables[self::NODE_ENTITY_TYPE_ID];
    return $this->isNodeANewsList($node);
  }
  protected function isNodeANewsList(NodeInterface $node): bool {
    return $node->bundle() === self::NEWS_LIST_BUNDLE;
  }

  public function getAllPublisedNews(){
    return $this->gateway->getAllPublishedNodes();
  }

  //Méthode pour le Breadcrumb
  public function getNewsListNode(){
   $nid = $this->gateway->fetchNewsListNode();
   return !empty($nid) ? $this->entityTypeManager->getStorage('node')->load(reset($nid)) : NULL;
  }
  public function getAllPublishedNodesByThemes(){
    $nid = $this->gateway->fetchNewsListNode();
    return !empty($nid) ? $this->entityTypeManager->getStorage('node')->load(reset($nid)) : NULL;
  }
}
