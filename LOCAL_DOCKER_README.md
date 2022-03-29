#Local Docker Compose
## Dependency :
This Docker Compose stack needs Adimeo's local docker environnement. It can be found there : https://github.com/Core-Techs-Git/adimeo_docker_local
## Docker Compose global commands
### Start stack (in background with "-d")
    docker-compose up -d
### Stop stack
    docker-compose down
## Composer and Drush common commands
### Access PHP container shell
    docker exec -it cp22_saulnier_php sh
### dump sql db with drush
    drush sql:dump --structure-tables-list=cache,cache_*,sessions,watchdog --result-file=../dump.sql
### Restore sql dump with drush
    drush sql:drop
    drush sql:cli
    mysql> source /chemin_dump/dump.sql
    (si erreur "Failed to open file dump.sql', error: 2" => mettre chemin absolu de la DB)
    exit
    drush cr
### To dump DB
    docker exec cp22_saulnier_db sh -c 'exec mysqldump -uroot -proot cp22_saulnier' > $PWD/dump.sql
### To restore DB
    docker exec -i cp22_saulnier_db sh -c 'exec mysql -uroot -proot cp22_saulnier' < $PWD/dump.sql
### Launch Composer commands
    docker exec cp22_saulnier_php composer install
    docker exec cp22_saulnier_php composer require drupal/module_name
    ...
### Launch Drush commands
    docker exec cp22_saulnier_php drush cr
    docker exec cp22_saulnier_php drush updb
    ...
