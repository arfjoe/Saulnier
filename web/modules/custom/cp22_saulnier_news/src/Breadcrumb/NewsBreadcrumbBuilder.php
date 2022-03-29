<?php

namespace Drupal\cp22_saulnier_news\Breadcrumb;

use Drupal\Core\Breadcrumb\Breadcrumb;
use Drupal\Core\Breadcrumb\BreadcrumbBuilderInterface;
use Drupal\Core\Controller\TitleResolver;
use Drupal\Core\Http\RequestStack;
use Drupal\Core\Link;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\cp22_saulnier_news\Manager\NewsManager;

class NewsBreadcrumbBuilder implements BreadcrumbBuilderInterface {

  protected $request;
  protected $titleResolver;
  protected $breadcrumb;
  protected $newsManager;

  public function __construct(
    TitleResolver $titleResolver,
    RequestStack $request,
    NewsManager $newsManager)
  {
    $this->titleResolver = $titleResolver;
    $this->request = $request;
    $this->newsManager = $newsManager;
    $this->breadcrumb = new Breadcrumb();
  }


  /**
   * @inheritDoc
   */
  public function applies(RouteMatchInterface $route_match) {

    $nodeEntity = $route_match->getParameter('node');
    if(!empty($nodeEntity) && $nodeEntity->bundle()=='news') {
      return TRUE;
    }
    return FALSE;
  }

  /**
   * @inheritDoc
   */
  public function build(RouteMatchInterface $route_match) {

    $breadcrumb = $this->breadcrumb;
    $breadcrumb->addCacheContexts(["url"]);

    //Affichage du lien de page d'accueil
    $breadcrumb->addLink(Link::createFromRoute(t('Home'), '<front>'));

    //Affichage de la page parent du node en cours
    $newsListNode = $this->newsManager->getNewsListNode();
    if (!empty($newsListNode)) {
      // Méthode avec l'url
      $listUrl = $newsListNode->toUrl();
      $link = Link::fromTextAndUrl($newsListNode->label(), $listUrl);
//      $this->breadcrumb->addLink($link);
      // Méthode avec la route.
      $link = Link::createFromRoute($newsListNode->label(), 'entity.node.canonical', ['node' => $newsListNode->id()]);
      $this->breadcrumb->addLink($link);
    }

    //Pour récuperer le titre de la page actuel
      //Méthode manuelle (langue du titre à gérer)
//    $nodeEntity =$route_match->getParameter('node');
//    $title = $nodeEntity->label();
//    $breadcrumb->addLink(Link::createFromRoute($title, '<none>'));
    //====//
      //Méthode automatique (à prioriser)
    $page_title = $this->titleResolver->getTitle($this->request->getCurrentRequest(), $route_match->getRouteObject());
    if (!empty($page_title)) {
      $breadcrumb->addLink(Link::createFromRoute($page_title, '<current>'));
    }

    return $breadcrumb;
  }

}
