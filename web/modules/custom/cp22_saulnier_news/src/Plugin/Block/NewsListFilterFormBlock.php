<?php

namespace Drupal\cp22_saulnier_news\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormBuilderInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a filter block for the news list page.
 *
 * @Block(
 *   id = "cp22_saulnier_news_news_list_filter",
 *   admin_label = @Translation("News List Filter Block"),
 *   category = @Translation("Custom")
 * )
 */
class NewsListFilterFormBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The form builder.
   *
   * @var \Drupal\Core\Form\FormBuilderInterface
   */
  protected $formBuilder;


  public function __construct(array $configuration, $plugin_id, $plugin_definition, FormBuilderInterface $form_builder) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->formBuilder = $form_builder;
  }

  /**
   * {@inheritdoc}
   */
    public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
      return new static(
        $configuration,
        $plugin_id,
        $plugin_definition,
        $container->get('form_builder')
      );
    }

  /**
   * @inheritDoc
   */
  public function build() {

//    Drupal::formBuilder()->getForm('Drupal\cp22_saulnier_news\Form\NewsListForm');
//    $build['content'] = [
//      '#markup' => $this->t('Beer'),
//      $this->formBuilder->getForm('Drupal\cp22_saulnier_news\Form\NewsListForm')
//    ];
    return $this->formBuilder->getForm('Drupal\cp22_saulnier_news\Form\NewsListForm');
  }
}
