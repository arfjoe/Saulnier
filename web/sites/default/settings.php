<?php

// @codingStandardsIgnoreFile

use Symfony\Component\Dotenv\Dotenv;
$dotenv = new Dotenv();

if (file_exists($app_root . '/../.env')) {
  $dotenv->load($app_root . '/../.env');
}

/* Ce fichier est fait pour renseigner les settings communs à tout les environnements. */

$settings['hash_salt'] = trim(file_get_contents($app_root . '/../salt.txt'));
$settings['update_free_access'] = FALSE;

/* Private and Temporary files one directory above web root */
//$settings['file_private_path'] = $app_root . '/../private';
$settings['file_temp_path'] = $app_root . '/../tmp';

$settings['file_scan_ignore_directories'] = [
  'node_modules',
  'bower_components',
];
$settings['entity_update_batch_size'] = 50;

assert_options(ASSERT_ACTIVE, TRUE);
\Drupal\Component\Assertion\Handle::register();

/**
 * ON load systématiquement le service d'annulation de cache.
 */
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/production.services.yml';

/**
 * Enable CSS and JS aggregation.
 */
$config['system.performance']['css']['preprocess'] = TRUE;
$config['system.performance']['js']['preprocess'] = TRUE;


/**
 * On désactive systématiquement "Page Cache". On utilise plutot Dynamic Page Cache
 *
 * Note: you should test with Dynamic Page Cache enabled, to ensure the correct
 * cacheability metadata is present (and hence the expected behavior). However,
 * in the early stages of development, you may want to disable it.
 */
#@todo test on preprod first
#$settings['cache']['bins']['page'] = 'cache.backend.null';


$settings['config_sync_directory'] = $app_root . '/../config/sync';
$settings['config_exclude_modules'] = ['devel', 'devel_generate', 'dblog','stage_file_proxy','kint'];

$config['system.logging']['error_level'] = 'hide'; //hide, some, all, verbose

// Réautorisation de certaines fonctions twig utiles.
$settings['twig_sandbox_whitelisted_methods'] = [
  // Defaults:
  'id',
  'label',
  'bundle',
  'get',
  '__toString',
  'toString',
  // Additions:
  'url',
];

// @TODO à remplir dès que possible !
//$settings['trusted_host_patterns'] = [];

#https public files
#$settings['file_public_base_url'] = 'https://'.$_ENV['PROJECT_BASE_URL'].'/sites/default/files';

// Récupération de la variable qui défini l'environnement (development, staging ou production).
$env = !empty($_ENV['APP_ENV']) ? $_ENV['APP_ENV'] : 'production';

/**
 * Inclusion des settings development pour le dev local
 *
 * (prevent caches, error_level to verbose, prevent js/css aggregation)
 */
if($env == 'development' && file_exists( $app_root . '/sites/settings.development.php' )) {
  include $app_root . '/sites/settings.development.php';
}

/**
 * Inclusion des settings staging pour les instances de recette
 *
 * (error_level to "some", may prevent js/css aggregation)
 */
if($env == 'staging' && file_exists( $app_root . '/sites/settings.staging.php' )) {
  include $app_root . '/sites/settings.staging.php';
}


$databases['default']['default'] = array (
  'database' => $_ENV['DB_NAME'],
  'username' => $_ENV['DB_USER'],
  'password' => $_ENV['DB_PASSWORD'],
  'host' => $_ENV['DB_HOST'],
  'port' => $_ENV['DB_PORT'],
  'driver' => $_ENV['DB_DRIVER'],
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
);


if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
  include $app_root . '/' . $site_path . '/settings.local.php';
}

