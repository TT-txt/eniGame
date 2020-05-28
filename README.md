# eniGame
<p>Langages : Written in HTML, CSS, PHP, Js, C</p>
<p>Small labyrinth Web game, dungeon exploration, going through rooms which contains a puzzle</p>
<ul>
  <li> Random level generation (procedural)</li>
  <li> Level Editor</li>
  <li> Solution checker (seeds)</li>
  <li> Level solver in C (uses the seed of a level)</li>
</ul>
<p>The project is hosted on a website.</p>
<br/>
<p><strong>Tools : Github, Trello, Teams, Globoard, Gitkraken, Git</strong></p>
<br/>
<i>Pardon our French...</i>
<br/>
<p><strong>Redéployer le projet :</strong></p>
<br/>
<p>Pour redéployer le jeu il "suffit" d'avoir un serveur web (localhost est possible) compatible PHP7, MySQL/MariaDB. Il suffit d'importer "enigame.sql" dans votre base de données pour pouvoir charger les niveaux du jeu. Pour le jeu en lui même un navigateur suffit car il est codé entièrement en JavaScript (NB: IE <= 8 ne fonctionnera pas).</p>
<p>Pour la partie solveur, CGI est utilisé pour pouvoir executer des fichiers sur le serveur depuis une requete HTTP. Cette requete lance un script CGI qui contient une commande bash pour executer le programme avec GDB sur le serveur (linux ou WSL). Pour pouvoir utiliser ce script, il faut éditer le  fichier de configuration du serveur web pour ajouter un dossier executable CGI ("conf.httpd" pour Apache) et bien sûr avoir GDB installé sur le serveur.</p>
<p>Si le serveur est hébergé sur un domaine autre que localhost, les url des requêtes HTTP sont à modifier dans l'entièreté du projet (dans maps.js, home.php, saveMap.php, mapConstruction.js).</p>
