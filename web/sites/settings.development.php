<?php

/* Ce fichier est fait pour renseigner les settings de development */

/**
 * On active la gestion des suggestions de template et la désactivation de cache twig.
 */
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/custom.development.services.yml';

/**
 * Disable the render cache (this includes the page cache).
 *
 * Note: you should test with the render cache enabled, to ensure the correct
 * cacheability metadata is present. However, in the early stages of
 * development, you may want to disable it.
 *
 * This setting disables the render cache by using the Null cache back-end
 * defined by the development.services.yml file above.
 *
 * Do not use this setting until after the site is installed.
 */
$settings['cache']['bins']['render'] = 'cache.backend.null';

$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';


/**
 * Allow test modules and themes to be installed.
 *
 * Drupal ignores test modules and themes by default for performance reasons.
 * During development it can be useful to install test extensions for debugging
 * purposes.
 */
$settings['extension_discovery_scan_tests'] = TRUE;

/**
 * Enable access to rebuild.php.
 *
 * This setting can be enabled to allow Drupal's php and database cached
 * storage to be cleared via the rebuild.php page. Access to this page can also
 * be gained by generating a query string from rebuild_token_calculator.sh and
 * using these parameters in a request to rebuild.php.
 */
$settings['rebuild_access'] = TRUE;

/**
 * Skip file system permissions hardening.
 *
 * The system module will periodically check the permissions of your site's
 * site directory to ensure that it is not writable by the website user. For
 * sites that are managed with a version control system, this can cause problems
 * when files in that directory such as settings.php are updated, because the
 * user pulling in the changes won't have permissions to modify files in the
 * directory.
 */
$settings['skip_permissions_hardening'] = TRUE;

/**
 * Gestion de stage_file_proxy
 */
//$config['stage_file_proxy.settings']['origin'] = 'https://url.prod/';
//$config['stage_file_proxy.settings']['use_imagecache_root'] = TRUE;

$settings['trusted_host_patterns'] = ['.*'];

$config['system.logging']['error_level'] = 'verbose'; //hide, some, all, verbose
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);

$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
// Disable AdvAgg.
$config['advagg.settings']['enabled'] = FALSE;
