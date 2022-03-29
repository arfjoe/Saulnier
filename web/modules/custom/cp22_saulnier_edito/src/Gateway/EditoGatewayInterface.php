<?php
namespace Drupal\cp22_saulnier_edito\Gateway;
use Drupal\node\NodeInterface;
interface EditoGatewayInterface {
  /**
   * @return NodeInterface[]
   */
  public function getAllPublishedNodes(): array;

}
