#Travail à effectuer sur les 18 & 19 mars.

#[Prérequis: un serveur et un client MySQL sur votre machine]

#Pour la base de donnée, lancez le script SQL joint dans votre client MySQL. La structure est simple et permet de représenter l'envoi et la réception de messages entre utilisateurs: https://adel.adrar-formation.eu/pluginfile.php/27906/mod_assign/intro/exercice_node_js.sql

#Créez un nouveau projet Node.js avec les dépendances suivantes:

#express (nécessaire pour le serveur HTTP) Documentation
#mysql (pour se connecter à une base de données MySQL) Documentation
#ejs (template engine pour générer du HTML) Documentation
#body-parser (pour pouvoir parser le body JSON des requêtes HTTP)
#esm (pour pouvoir utiliser la syntaxe d'import)

#Vous devrez également avoir installé nodemon en dépendance globale pour pouvoir utiliser le rafraichissement dynamique du code. Déjà fait si vous avez suivi Node.js 2-3. Documentation


#Vous devez créer une application web qui répond aux requêtes HTTP suivantes:

#GET /users : La réponse retourne une page HTML générée à partir d'un template ejs, contenant la liste de tous les utilisateurs de l'application, et affiche pour chacun d'eux: l'id, le nom, le mot de passe, la date de création.
Il est possible de spécifier un paramètre d'url "search" qui permettra de ne retourner que les utilisateurs dont le nom contient la chaîne de caractères spécifiée.
Exemple d'url: /users?search=jea : filtre la réponse pour n'afficher que les utilisateurs dont le nom contient la string "jea".
Indice: dans une requête MySQL, utiliser l'opérateur LIKE pour faire une recherche sur un champ texte.

#GET /user/:userId : La réponse retourne une page HTML générée à partir d'un template ejs, affichant les attributs (id, nom, mot de passe, date de création) de l'utilisateur d'id ":userId".
Exemple d'url: /user/2

#DELETE /user/:userId : Supprime l'utilisateur d'id ":userId" de la base de donnée. La réponse affiche un texte pour dire que l'opération s'est bien passée.
Exemple d'url: /user/1

#PUT /user : Insère un nouvel utilisateur dans la base de données. Le nom et le mot de passe sont spécifiés avec un objet JSON placé dans le body de la requête HTTP. La réponse affiche un texte pour dire que l'opération s'est bien passée.
Exemple de body JSON: { "name": "Nicolas", "password": "AdRaR" }

#POST /user/:userId : Modifie l'utilisateur d'id ":userId". Le nom, le mot de passe actuel et le nouveau mot de passe sont spécifiés
dans un objet JSON placé dans le body de la requête HTTP. Le mot de passe actuel doit être renseigné.
La réponse affiche un texte pour dire si l'opération s'est bien passée. 
Si le mot de passe actuel ne correspond pas à celui stocké dans la base de données,
le code HTTP 403 doit être renvoyé à la place du code 200, et l'opération ne doit pas être effectuée.
Exemple d'url: /user/2
Exemple de body JSON: { "name": "Stephane2", "password": "azerty2020", "newpassword": "qwerty2021" }

#GET /user/:userId/messages : La réponse retourne une page HTML générée à partir d'un template ejs, contenant la liste des messages 
REÇUS et ENVOYÉS de l'utilisateur d'id ":userId", et affiche pour chacun d'eux: l'id, le titre,
 le contenu, la date de création. Les messages reçus et envoyés doivent pouvoir être distingués 
 (exemple: afficher une première liste des messages reçus, puis une seconde liste des messages envoyés,
  ou afficher pour chaque message un label indiquant si il a été envoyé ou reçu).
Il est possible de spécifier un paramètre d'url "search" qui permettra de ne retourner que les messages dont le titre
 ou le contenu contiennent la chaîne de caractères spécifiée.
Exemple d'url: /user/2/messages?search=abc : filtre la réponse pour n'afficher que les messages dont le titre 
OU le contenu contiennent la string "abc".
Indice: dans une requête MySQL, utiliser l'opérateur LIKE pour faire une recherche sur un champ texte.

#PUT /user/:userId/message : Envoie un nouveau message de la part de l'utilisateur d'id ":userId". 
L'id du récepteur, le mot de passe de l'émetteur, le titre et le contenu du message sont spécifiés dans un objet JSON 
placé dans le body de la requête HTTP. Ces quatre attributs doivent être renseignés. 
La réponse affiche un texte pour dire si l'opération s'est bien passée. Si le mot de passe de l'émetteur ne 
correspond pas à celui stocké dans la base de données, le code HTTP 403 doit être renvoyé à la place du code 200,
 et l'opération ne doit pas être effectuée.
Exemple d'url: /user/1/message
Exemple de body JSON: {"receiver": 2, "password": "abcd", "title": "Salut !", "content": "Viens faire du JS avec moi, on est bien" }

Vous veillerez à bien structurer votre code. Les contrôleurs, les templates et les fonctions d'accès à la base de donnée doivent avoir leurs dossiers dédiés.

Pour le rendu, vous déposerez simplement un .zip de votre répertoire de travail.

Projet Node.js : saisie du mot de passe
d’administration sur l’interface (1)
1. Modifiez la page HTML retournée par la requête GET /users :
1.1. Ajoutez un champ de mot de passe avec un label "mot de passe administrateur: " en bas de page
1.2. Utilisez la valeur de ce champ pour le paramètre adminPassword de la requête AJAX qui est
envoyée quand on clique sur le bouton pour éditer un utilisateur (celui avec le label "Editer !")
1.3. Pré-remplissez le champ avec la bonne valeur pour ne pas avoir à la retaper à chaque fois
1.4. Modifiez la requête AJAX pour rafraichir automatiquement la page à la réception du résultat de la
requête, en utilisant location.reload();
2. Côté serveur, modifiez le traitement de la requête POST /user/:userId : Simplifiez le mot de passe
d’administration qui est attendu par le serveur pour qu’il soit plus simple à taper dans l’interface ( c’est dans
la fonction postUser du userController )
3. Vérifiez que la modification d’un utilisateur fonctionne encore et que la page se rafraîchit automatiquement
pour montrer immédiatement les modifications

Projet Node.js : suppression d’un utilisateur
via l’interface (2)
1. Modifiez la page HTML retournée par la requête GET /users :
1.1. Ajoutez un bouton à côté de chaque utilisateur de la liste, permettant de supprimer l’utilisateur
1.2. Quand on clique sur le bouton, une requête AJAX est envoyée au serveur sur la route DELETE
/user/:userId
1.3. Le corps de la requête contiendra le paramètre adminPassword avec la valeur issue du champ dédié
1.4. Affichez une confirmation comme quoi l’opération s’est bien passée ou pas
1.5. Rafraîchissez automatiquement la page à la réception du résultat de la requête
2. Côté serveur, modifiez le traitement de la requête DELETE /user/:userId (qui permet de supprimer un
utilisateur):
2.1. On veut que seul les utilisateurs fournissant le mot de passe d’administrateur puissent supprimer un
utilisateur: si le corps de la requête contient un attribut adminPassword et que cet attribut vaut la
valeur attendue, on supprime l’utilisateur. Sinon, on retourne une erreur 403.
3. Testez la suppression d’un utilisateur. La page doit se rafraîchir automatiquement.

Projet Node.js : création d’un utilisateur via
l’interface (3)
1. Modifiez la page HTML retournée par la requête GET /users :
1.1. Ajoutez un formulaire en bas de page avec un titre et deux champs texte pour le nom et le mot de
passe du nouvel utilisateur, et un bouton avec le label "Créer"
1.2. Quand on clique sur le bouton, une requête AJAX est envoyée au serveur sur la route PUT /user
avec dans le corps de requête les paramètres nécessaires pour créer un nouvel utilisateur
1.3. Affichez une confirmation comme quoi l’opération s’est bien passée ou pas
1.4. Rafraîchissez automatiquement la page à la réception du résultat de la requête
2. Côté serveur, modifiez le traitement de la requête PUT /user (qui permet de créer un nouvel utilisateur):
2.1. On veut que seul les utilisateurs fournissant le mot de passe d’administrateur puissent créer un
utilisateur: si le corps de la requête contient un attribut adminPassword et que cet attribut vaut la
valeur attendue, on supprime l’utilisateur. Sinon, on retourne une erreur 403.
3. Testez la création d’un nouvel utilisateur. La page doit se rafraîchir automatiquement.

Projet Node.js : envoi d’un message via
l’interface (4)
1. Modifiez la page HTML retournée par la requête GET /user/:userId/messages :
1.1. Ajoutez en bas de page un formulaire d’envoi de nouveau message qui doit permettre de:
1.1.1. Saisir l’identifiant du récepteur
1.1.2. Saisir le mot de passe de l’émetteur (qui est l’utilisateur avec l’identifiant :userId dans l’url)
1.1.3. Saisir le titre du message
1.1.4. Saisir le contenu du message
1.1.5. Cliquer sur un bouton d’envoi
1.2. Quand on clique sur le bouton d’envoi, une requête AJAX est envoyée au serveur sur la route PUT
/user/:userId/message , avec dans le corps de requête les paramètres nécessaires pour créer un
nouveau message
1.3. Affichez une confirmation comme quoi l’opération s’est bien passée ou pas
1.4. Rafraîchissez automatiquement la page à la réception du résultat de la requête
2. Testez l’envoi d’un nouveau message. La page doit se rafraîchir automatiquement.

Projet Node.js : suppression d’un message
via l’interface (5)
1. Modifiez la page HTML retournée par la requête GET /user/:userId/messages :
1.1. Ajoutez un bouton à côté de chaque message de la liste, permettant de supprimer le message
1.2. Quand on clique sur le bouton, une requête AJAX est envoyée au serveur sur la route DELETE
/message/:messageId
2. Côté serveur, créez la route DELETE /message/:messageId , qui doit supprimer le message spécifié de la
base de données.
3. Testez la suppression d’un message. La page doit se rafraîchir automatiquement.


Projet Node.js : modification d’un message
via l’interface (6)
● C’est un exercice bonus, à faire si vous êtes en avance:
○ Faites en sorte qu’on puisse modifier un message via l’interface

Projet Node.js
● À ce stade, vous devez avoir un serveur qui permet de:
○ Gérer les utilisateurs (création, modification, suppression)
○ Gérer les messages entre utilisateurs (envoi, suppression)
● Vous n’avez plus besoin de l’intermédiaire de postman pour ces requêtes, tout peut être fait
via l’interface web. Vous avez en quelque sorte une application web "complète