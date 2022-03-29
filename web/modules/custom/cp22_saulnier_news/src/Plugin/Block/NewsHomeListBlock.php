<?php

namespace Drupal\cp22_saulnier_news\Plugin\Block;

use Drupal\Core\Block\Annotation\Block;
use Drupal\Core\Block\BlockBase;
//use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\cp22_saulnier_news\Manager\NewsManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\cp22_saulnier_news\Manager\NewsHomeListManager;

/**
 * Provides a news list block.
 *
 * @Block(
 *   id = "cp22_saulnier_news_newshomelist",
 *   admin_label = @Translation("Actualités"),
 *   category = @Translation("Custom")
 * )
 */
class NewsHomeListBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs a new NewsListBlock instance.
   *
   * @param array $configuration
   *   The plugin configuration, i.e. an array with configuration values keyed
   *   by configuration option name. The special key 'context' may be used to
   *   initialize the defined contexts by setting it to an array of context
   *   values keyed by context names.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, NewsHomeListManager $newsHomeListManager, NewsManager $newsManager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->newsHomeListManager = $newsHomeListManager;
    $this->newsManager = $newsManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get(NewsHomeListManager::class),
      $container->get(NewsManager::class)
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {

    //Ajout d'une class pour le lien de la liste des actualités
    $options = [
      'attributes' => [
        'class' => [
          'btn--red',
        ],
      ],
    ];
    //On récupère la page NewsList
    $newsList = $this->newsManager->getNewsListNode();
    //On récupére L'url de la page de liste en lui ajoutant une class
    $listUrl = $newsList->toUrl('canonical',$options);
    //On créer un lien avec l'url fourni
    $link = Link::fromTextAndUrl('Toutes les actualités', $listUrl);

    //On récupére la liste de news promu en page d'accueil afficher en mode teaser_homepage du NewsHomeListManager
    $newsHomeList = $this->newsHomeListManager->getHomePublisedNews();
    $build['content'] = [
      //On envoi la liste des news sur le template twig de la page d'accueil
      $newsHomeList,
      //On utilise la méthode toRenderable pour pouvoir printer le lien dans le template twig
      $link->toRenderable()
    ];
    return $build;
  }

}
