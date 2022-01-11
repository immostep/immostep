# Installation de la version de dev

Voici la marche à suivre pour voir l'avancement de la maquette avant la prochaine release

## Pré-requis

- Avoir accès au dépôt [Github](https://github.com/immostep/immostep)
- Avoir [Git](https://git-scm.com/downloads) installé et configuré sur son poste
- Avoir Node.js (>= v14) installé (via [nodejs.org](https://nodejs.org/en/download/) ou via [nvm](https://github.com/nvm-sh/nvm#install--update-script))
- Choisir un dossier pour le projet (`~/projects` pour l'exemple)

## Clonage du dépot

Si vous ne possédez pas encore le projet il faut le cloner.

- via SSH :

```
$ cd ~/projects
$ git clone git@github.com:immostep/immostep.git
```

- via HTTPS :

```
$ cd ~/projects
$ git clone https://github.com/immostep/immostep.git
```

Git va créer un clone du projet dans `~/projects/immostep`

## Récupération des dernière modifications

Si vous avez déjà cloné le dépot, vous pouvez mettre à jour votre copie en récupérant les dernières modifications.

```
$ cd ~/projects/immostep
$ git pull
```

## Installation des dépendances

Cette opération est à effectuer après chaque `git pull` ou `git clone`

```
$ cd ~/projects/immostep
$ npm install
```

## Démarrage de l'application

```
$ cd ~/projects/immostep
$ npm start
```

La commande va ouvrir directement le navigateur sur [http://localhost:3000](http://localhost:3000)

Appuyez sur <kbd>Ctrl</kbd> + <kbd>c</kbd> dans le terminal pour arrêter l'application

# Releases

- [version 0.1.0](https://github.com/immostep/immostep/releases/tag/0.1.0)
  - page d'accueil
  - page de recherche de biens
  - page d'administation du propriétaire
