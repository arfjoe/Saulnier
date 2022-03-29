<?php
namespace Drupal\cp22_saulnier_news\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\Annotation\FieldFormatter;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Form\FormStateInterface;
/**
 * Plugin implementation of the 'Display Character Count' formatter for 'string_long' fields.
 *
 * @FieldFormatter(
 *   id = "saulnier_display_character_count",
 *   label = @Translation("Display Character Count"),
 *   field_types = {
 *     "string_long",
 *     "string"
 *   }
 * )
 */
class DisplayCharacterCountStringLongFieldFormatter extends FormatterBase {
  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $form = parent::settingsForm($form, $form_state);
    $form['format'] = [
      '#type' => 'select',
      '#title' => $this->t('Count Characters or Words ?'),
      '#default_value' => $this->getSetting('format'),
      '#options' => [
        'characters' => $this->t('Characters'),
        'words' => $this->t('Words')
      ],
    ];
    return $form;
  }
  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    $settings = [];
    // Fall back to field settings by default.
    $settings['format'] = 'characters';
    return $settings;
  }
  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $setting = $this->getSetting('format');
    return [$this->t('Count: @format', [
      '@format' => $setting,
    ])];
  }
  /**
   * @inheritDoc
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];
    foreach ($items as $delta => $item) {
      $text = $item->value;
      $count = '';
      $label = '';
      if ($this->getSetting('format') == 'characters') {
        $label = $this->t('Nombres de caractères');
        $count = strlen($text);
      }
      if ($this->getSetting('format') == 'words') {
        $label = $this->t('Nombres de mots');
        $count = str_word_count($text);
      }
      $elements[$delta] = [
        '#type' => 'inline_template',
        '#template' => '{{ value|nl2br }} <br> {{ label }} : {{ count }}',
        '#context' => ['value' => $text, 'count' => $count, 'label' => $label],
      ];
    }
    return $elements;
  }
}

