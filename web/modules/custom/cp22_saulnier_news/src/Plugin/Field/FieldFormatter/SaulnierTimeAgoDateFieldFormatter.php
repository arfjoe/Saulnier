<?php

namespace Drupal\cp22_saulnier_news\Plugin\Field\FieldFormatter;

use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Field\Annotation\FieldFormatter;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;

/**
 * Saulnier integration of date ago
 *
 * @FieldFormatter(
 *   id = "saulnier_datetime_time_ago",
 *   label= @Translation("Saulnier Time ago"),
 *   field_types = {
      "datetime"
 *   }
 * )
 */

class SaulnierTimeAgoDateFieldFormatter extends FormatterBase
{
  public function viewElements(FieldItemListInterface $items, $langcode): array
  {
    $elements = [];
    $ago = '';
    foreach ($items as $delta => $item) {
      /** @var \Drupal\Core\Datetime\DrupalDateTime $date */
      $date = $item->date;
      $now = new \DateTime("now");
      $ago = $date->diff($now);
      //      dd($ago);
      //      $ago->d = 3; // Juste pour tester les valeurs
      // if date is today
      if ($ago->d == 0) {
        $output = [
          '#markup' => 'Il y a ' . $ago->format('%i') . ' minutes'
        ];
      }
      // if date is yesterday
      if ($ago->d == 1) {
        $output = [
          '#markup' => 'Publié hier'
        ];
      }
      // if date is older than yesterday
      if ($ago->d >= 2) {
        $output = [
          '#markup' => 'Il y a ' . $ago->format('%a') . ' jours',
        ];
      }
      $elements[$delta] = $output;
    }
    return $elements;
  }
}
