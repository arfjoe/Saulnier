<?php

/* Ce fichier est fait pour renseigner les settings des instances de test (afin de ne pas surcharger le settings.local.php */


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

$settings['trusted_host_patterns'] = ['.*'];

/* On affiche les erreurs et les warnings */
$config['system.logging']['error_level'] = 'some'; //hide, some, all, verbose

/* A voir car l'aggregation des assets peut être parfois à l'origine d'erreurs... */
//$config['system.performance']['css']['preprocess'] = FALSE;
//$config['system.performance']['js']['preprocess'] = FALSE;
