<?php
namespace Drupal\cp22_saulnier_edito\Manager;

use Drupal\Core\Cache\Cache;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\cp22_saulnier_edito\Gateway\EditoGatewayInterface;
use Drupal\Core\Cache\CacheBackendInterface;

/**
 * EditoListService service.
 */
class EditoManager {

  const EDITO_LIST_BUNDLE = 'home';
  const NODE_ENTITY_TYPE_ID = 'node';
  const EDITO_LIST_PREPROCESS_KEY = 'editoProject';
  const EDITO_NODE_VIEWMODE_IN_LIST_PAGE = 'teaser';

  /**
   * @var \Drupal\cp22_saulnier_edito\Gateway\EditoGatewayInterface
   */
  protected $gateway;

  /*
   * @var EDrupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  protected $cacheBackend;


  public function __construct(EditoGatewayInterface $editoGateway, EntityTypeManagerInterface $entityTypeManager,CacheBackendInterface $cache_backend){
    $this->gateway = $editoGateway;
    $this->entityTypeManager = $entityTypeManager;
    $this->cacheBackend = $cache_backend;
  }

  /**
   * @return array
   */
  //$themeId = NULL dans param de la méthode
  public function getBuiltEditoNodeForHomePage() {
    $builtNodes = [];

    $cid = 'cp22_saulnier_edito.cache'. \Drupal::languageManager()
        ->getCurrentLanguage()
        ->getId();
    $cache = $this->cacheBackend->get($cid);
    if ($cache){
      $builtNodes = $cache->data;
    }
    else{
      //On récupère les query envoyé par la gateway
      $nodes = $this->gateway->getAllPublishedNodes();
      if($nodes) {
        $viewBuilder = $this->entityTypeManager->getViewBuilder(self::NODE_ENTITY_TYPE_ID);
        $builtNodes = $viewBuilder->viewMultiple($nodes,self::EDITO_NODE_VIEWMODE_IN_LIST_PAGE);
      }
      $this->cacheBackend->set($cid, $builtNodes,-1,['node_list:edito_project']);
    }
    return $builtNodes;
  }


}
