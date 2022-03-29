<?php

namespace Drupal\cp22_saulnier_news\Plugin\QueueWorker;

use Drupal\Core\Annotation\QueueWorker;
use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\taxonomy\Entity\Term;

/**
 * Defines 'cp22_saulnier_news_insertnewsworker' queue worker.
 *
 * @QueueWorker(
 *   id = "cp22_saulnier_news_insertnewsworker",
 *   title = @Translation("InsertNewsWorker"),
 *   cron = {"time" = 60}
 * )
 */
class InsertNewQueueWorker extends QueueWorkerBase {

  /**
   * {@inheritdoc}
   */
  public function processItem($data) {
    // @todo Process data here.
    $term = Term::create([
      'name' =>(string) $data,
      'vid' => 'theme'
    ]);
    $term->save();
  }
}
