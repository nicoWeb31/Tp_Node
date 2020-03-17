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

GET /users : La réponse retourne une page HTML générée à partir d'un template ejs, contenant la liste de tous les utilisateurs de l'application, et affiche pour chacun d'eux: l'id, le nom, le mot de passe, la date de création.
Il est possible de spécifier un paramètre d'url "search" qui permettra de ne retourner que les utilisateurs dont le nom contient la chaîne de caractères spécifiée.
Exemple d'url: /users?search=jea : filtre la réponse pour n'afficher que les utilisateurs dont le nom contient la string "jea".
Indice: dans une requête MySQL, utiliser l'opérateur LIKE pour faire une recherche sur un champ texte.

GET /user/:userId : La réponse retourne une page HTML générée à partir d'un template ejs, affichant les attributs (id, nom, mot de passe, date de création) de l'utilisateur d'id ":userId".
Exemple d'url: /user/2

DELETE /user/:userId : Supprime l'utilisateur d'id ":userId" de la base de donnée. La réponse affiche un texte pour dire que l'opération s'est bien passée.
Exemple d'url: /user/1

PUT /user : Insère un nouvel utilisateur dans la base de données. Le nom et le mot de passe sont spécifiés avec un objet JSON placé dans le body de la requête HTTP. La réponse affiche un texte pour dire que l'opération s'est bien passée.
Exemple de body JSON: { "name": "Nicolas", "password": "AdRaR" }

POST /user/:userId : Modifie l'utilisateur d'id ":userId". Le nom, le mot de passe actuel et le nouveau mot de passe sont spécifiés dans un objet JSON placé dans le body de la requête HTTP. Le mot de passe actuel doit être renseigné. La réponse affiche un texte pour dire si l'opération s'est bien passée. Si le mot de passe actuel ne correspond pas à celui stocké dans la base de données, le code HTTP 403 doit être renvoyé à la place du code 200, et l'opération ne doit pas être effectuée.
Exemple d'url: /user/2
Exemple de body JSON: { "name": "Stephane2", "password": "azerty2020", "newpassword": "qwerty2021" }

GET /user/:userId/messages : La réponse retourne une page HTML générée à partir d'un template ejs, contenant la liste des messages REÇUS et ENVOYÉS de l'utilisateur d'id ":userId", et affiche pour chacun d'eux: l'id, le titre, le contenu, la date de création. Les messages reçus et envoyés doivent pouvoir être distingués (exemple: afficher une première liste des messages reçus, puis une seconde liste des messages envoyés, ou afficher pour chaque message un label indiquant si il a été envoyé ou reçu).
Il est possible de spécifier un paramètre d'url "search" qui permettra de ne retourner que les messages dont le titre ou le contenu contiennent la chaîne de caractères spécifiée.
Exemple d'url: /user/2/messages?search=abc : filtre la réponse pour n'afficher que les messages dont le titre OU le contenu contiennent la string "abc".
Indice: dans une requête MySQL, utiliser l'opérateur LIKE pour faire une recherche sur un champ texte.

PUT /user/:userId/message : Envoie un nouveau message de la part de l'utilisateur d'id ":userId". L'id du récepteur, le mot de passe de l'émetteur, le titre et le contenu du message sont spécifiés dans un objet JSON placé dans le body de la requête HTTP. Ces quatre attributs doivent être renseignés. La réponse affiche un texte pour dire si l'opération s'est bien passée. Si le mot de passe de l'émetteur ne correspond pas à celui stocké dans la base de données, le code HTTP 403 doit être renvoyé à la place du code 200, et l'opération ne doit pas être effectuée.
Exemple d'url: /user/1/message
Exemple de body JSON: {
"receiver": 2, "password": "abcd", "title": "Salut !", "content": "Viens faire du JS avec moi, on est bien" }

Vous veillerez à bien structurer votre code. Les contrôleurs, les templates et les fonctions d'accès à la base de donnée doivent avoir leurs dossiers dédiés.

Pour le rendu, vous déposerez simplement un .zip de votre répertoire de travail.