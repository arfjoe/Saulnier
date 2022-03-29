<?php

namespace Drupal\cp22_saulnier_socials\Plugin\Block;

use Drupal\Core\Block\Annotation\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\cp22_saulnier_socials\Manager\SocialsManager;

/**
 * Provides a socials list block.
 *
 * @Block(
 *   id = "cp22_saulnier_socials_socialslist",
 *   admin_label = @Translation("SocialsList"),
 *   category = @Translation("Custom")
 * )
 */
class SocialsListBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs a new SocialsListBlock instance.
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
  public function __construct(array $configuration, $plugin_id, $plugin_definition, SocialsManager $socialsManager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->socialsManager = $socialsManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get(SocialsManager::class)
    );

  }
  /**
   * {@inheritdoc}
   */
  public function build() {
    $socials = $this->socialsManager->getBuiltTermsListByWeight();
    $build['content'] = [];
    $build['content'][] = [
        $socials,
      ];
    return $build;
  }
}
