#Workflow gulp

###En préambule :

`NE JAMAIS ÉCRIRE QUOI QUE CE SOIT DANS LE DOSSIER BUILD`

Ca sera effacé par gulp. Tout doit se faire dans le dossier `/src` : images, fonts, svgs, js, css


## Installation et utilisation de base
Dans votre répertoire assets :
1. Installer les dépendances `npm install`
2. Créer un fichier de config.json sur l'example `'./config.example.json'`
3. Dans le terminal, lancer la tache gulp : `gulp` (équivalente à `gulp watch`)

Pour lancer un simple build des assets : `gulp build` (sans watch).


## JS BUNDLES
Gestion de l'ES6 et des bundles de javascripts simplifiés.

Il est possible de créer autant de fichiers de sortie que possible via la gestion de bundle en javascript.

Pour créer un bundle, il suffit de créer un repertoire dans `./src/javascript/src/.`
Ce répertoire sera `bundlisé` grâce au système d'import d'es6.

Il faut un fichier de point d'entrée du même nom que le répertoire.
Par exemple pour créer un bundle test, le fichier doit être :
`./javascript/src/test/test.js`

Il y a des exemples. Si vous avez des doutes n'hésitez pas à me solliciter

Merci de respecter l'utilisation des Drupal Behaviors :)
