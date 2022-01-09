# Projet d'approfondissement React - MI2 Front-End
## Logiciel requis

Pour procéder à l'installation du projet, assurez-vous qu'une version de npm et de PHP sont installés sur votre machine.


## Lancement du projet

Pour lancer le projet, il faut tout d'abord installer les librairies Javascript requises à l'aide de la commande suivante (la liste des ses librairies est consultable depuis le fichier `./package.json`) :

`npm install`

Il est nécessaire d'avoir une partie serveur avec laquelle la page React puisse communiquer notamment pour le traitement des données et de la connexion.
Une fois l'installation des librairies effectuer, lancez les deux commandes suivantes, toujours depuis la racine du projet, et vous serez fin prêt.

- `npm start`

- `php -S localhost:5000` 

## Choses à savoir

Les différent logins pour utiliser le site sont:

- admin:admin (vue administrateur)
- user:user (vue classique mais connecté)

Les réponses des requeêtes peuvent prendre un certain temps à arriver, la mise à jour n'est pas instantanée.


La suppression d'un musicien à son groupe est fonctionnelle, mais pour des raisons qui m'échappent, la liste des musiciens du groupe est réellement mise à jour uniquement après un rafraîchissement de la page des groupes.