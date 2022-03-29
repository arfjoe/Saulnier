READ ME

Lien vers le OneDrive pour la BDD et files :
https://adimeo-my.sharepoint.com/:f:/p/mjacquemin/EtiQ0SWiSD5IscexT5c-zJoB0BCmqhrqRlpTc6XRVjRDMw?e=8vdSvp


1- Création de la page d’accueil en BO

J’ai ajouté les différents champs demandé dans les spéc:
- Chapô (champ déjà utilisé dans d’autre contenu)
- Introduction
- Bouton
- Nos projets ( référence paragraphe «Voir aussi») affiché en mode teaser_homepage

J’ai également crée deux autres champs:
- Image du visuel (Pour permettre de changer l’image principale de la page d’accueil)
- Liste des Actualités→ qui récupère le block (NewsHomeListBlock) grâce à un module (block_field) qui me permet de placer le block en temps que champ dans un contenu.

J’ai en effet voulu tester ce module car il permet de placer un block plus facilement dans un template. Après laisser le champ visible dans l’affichage du formulaire est discutable. Je l’ai laissé pour facilités la gestion de l’affichage de la liste de news.


2-Partie développement

Block:

Je suis parti sur la création d’un block pour afficher la liste des news voulu en page d’accueil

j’ai donc crée:
- un block →  NewsHomeListBlock
- un manager → NewsHomeListManager
- une gateway → NewsHomeListGateway et son interface

J‘ai fait des commentaires directement dans le code.

Template

J’ai crée le template de la page d’accueil → node—home.html.twig
J’y vérifie si la liste de news existe pour savoir comment affiché les projets(«voir aussi»)

Dans le template du paragraph—see-too je vérifie si on se trouve en page d’accueil afin de n’afficher que deux projets («voir aussi»)

Dans le template node—news--teaser-homepage je met le teaser dans un lien a pour rediriger vers la news choisi.

Grâce à la condition de la query il n’y a que maximum 4 node—news--teaser-homepage  qui s’affiche dans le block en plus du lien vers toutes les news



3-Partie Intégration

Utilisation du fichier _nodeHome.scss pour la page d’accueil
J’ai crée plusieurs placeholder ainsi que plusieurs variables pour simplifier le code css
Affichage responsive et adapté si aucune news n’est promu

4-Bonus

Pour les 3 différents terme de taxonomy j’ai utilisé la class abstraite BasicListOfTaxonomyTermsManager pour simplifier le code et retirer les gateway.
J’ai également refait un nouveau module pour les thématiques
Ajout de networks et partners au menu contrib