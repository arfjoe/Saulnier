<?php

namespace Drupal\cp22_saulnier_news\Plugin\Block;

use Drupal\Core\Block\Annotation\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\cp22_saulnier_news\Manager\NewsManager;

/**
 * Provides a news list block.
 *
 * @Block(
 *   id = "cp22_saulnier_news_newslist",
 *   admin_label = @Translation("NewsList"),
 *   category = @Translation("Custom")
 * )
 */
class NewsListBlock extends BlockBase implements ContainerFactoryPluginInterface {

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
  public function __construct(array $configuration, $plugin_id, $plugin_definition, NewsManager $newsManager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->newManager = $newsManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get(NewsManager::class)
    );

  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $news = $this->newManager->getAllPublisedNews();
    $build['content'] = [
      '#markup' => $this->t('APEROS'),
    ];
    return $build;
  }

}
