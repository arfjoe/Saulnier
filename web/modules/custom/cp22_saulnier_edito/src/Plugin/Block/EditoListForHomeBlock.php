<?php

namespace Drupal\cp22_saulnier_edito\Plugin\Block;

use Drupal\Core\Block\Annotation\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\cp22_saulnier_edito\Manager\EditoManager;

/**
 * Provides a filter block for the home list page.
 *
 * @Block(
 *   id = "cp22_saulnier_edito_list_home",
 *   admin_label = @Translation("Edito List For Home Block"),
 *   category = @Translation("Custom")
 * )
 */
class EditoListForHomeBlock extends BlockBase implements ContainerFactoryPluginInterface{

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

  public function __construct(array $configuration, $plugin_id, $plugin_definition, EditoManager $editoManager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  $this->editoManager = $editoManager;
  }

  /**
   * {@inheritdoc}
   */
    public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
      return new static(
        $configuration,
        $plugin_id,
        $plugin_definition,
        $container->get(EditoManager::class)
      );
    }

  /**
   * @inheritDoc
   */
  public function build() {

//        Drupal::formBuilder()->getForm('Drupal\cp22_saulnier_edito\Manager\EditoManager');
        $build['content'] = [
          $edito= $this->editoManager->getBuiltEditoNodeForHomePage()
        ];
        return $build;
  }
}
