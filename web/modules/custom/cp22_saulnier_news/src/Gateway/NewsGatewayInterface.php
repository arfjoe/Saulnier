<?php
namespace Drupal\cp22_saulnier_news\Gateway;
use Drupal\node\NodeInterface;
interface NewsGatewayInterface {
  /**
   * @return NodeInterface[]
   */
  public function getAllPublishedNodes(): array;

  public function getAllPublishedNodesbyThemeId($themeId,$dateSort);

}
