<?php

namespace Drupal\cp22_saulnier_partners\Plugin\Block;

use Drupal\Core\Block\Annotation\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\cp22_saulnier_partners\Manager\PartnersManager;

/**
 * Provides a partners list block.
 *
 * @Block(
 *   id = "cp22_saulnier_partners_partnerslist",
 *   admin_label = @Translation("PartnersList"),
 *   category = @Translation("Custom")
 * )
 */
class PartnersListBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs a new PartnersListBlock instance.
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
  public function __construct(array $configuration, $plugin_id, $plugin_definition, PartnersManager $partnersManager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->partnersManager = $partnersManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get(PartnersManager::class)
    );

  }
  /**
   * {@inheritdoc}
   */
  public function build() {
    $terms = $this->partnersManager->getBuiltTermsListByWeight();
    $stop="";
    return [
      "#theme" => "partners_slider",
      "#partners" => $terms,
    ];
  }
}
