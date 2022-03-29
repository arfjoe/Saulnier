<?php
namespace Drupal\cp22_saulnier_news\Gateway;
use Drupal\node\NodeInterface;
interface NewsHomeListGatewayInterface {
  /**
   * @return NodeInterface[]
   */
  public function getHomePublishedNodes(): array;

}
