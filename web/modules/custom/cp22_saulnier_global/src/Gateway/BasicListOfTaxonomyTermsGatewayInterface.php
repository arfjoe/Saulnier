<?php

namespace Drupal\cp22_saulnier_global\Gateway;

/**
 * Interface TaxonomyGatewayInterface
 *
 * @package Drupal\cp22_saulnier_global\Gateway
 */
interface BasicListOfTaxonomyTermsGatewayInterface {

  /**
   * @param $vid
   *
   * @return array
   */
  public function fetchTermsByWeight($vid) : array;

}
