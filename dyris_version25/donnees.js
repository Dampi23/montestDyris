// LES OPTIONS

mode_presentation("1");
mode_evaluation("1");
mode_sauvegarde("1");
code("test","test");
code("essai","essai");
titre("Electricité - Niveau 1");
introduction("Exercices destinés à tester ses fondamentaux sur les principes électriques.");
introduction("C'est un exercice pour tester ses conaissances sur le cours.");
introduction("Ci-dessous, entrez votre nom \" test\" comme identifiant et \"test\" comme mot de passe.");

nombre_questions("3","6","9","12");
fenetre_info("MODE D'EMPLOI","pages/mode_emploi.html");
url_quitter("http://dyris.free.fr/");

coef_rep_juste("2");
coef_rep_fausse("-1");
coef_rep_nulle("0");
note_sur("20");

appreciation("16","20","C'est très bien !||Parfait !||Excellent travail !");
appreciation("13","16","Bon travail !");
appreciation("10","13","Ensemble moyen.");
appreciation("6","10","Vous pourriez revoir votre cours, puis tenter à nouveau ces exercices.");
appreciation("0","6","Ne vous découragez pas !||Etudiez votre cours avant de retenter ces exercices.");
non_termine("Vous avez quitté l'exercice sans avoir répondu à toutes les questions !");

juste("Parfait !||Excellent !||Juste !||Correct !||Bravo !||Bonne réponse !||C'est très bien!");
faux("Non...||Faux...||Erreur...||Inexact...||Dommage!");
abandon("Tentez de répondre la prochaine fois !||Ne vous découragez-pas!");
chronometre("25","Vous êtes trop lent!||Soyez plus rapide!||Le temps imparti est écoulé!");


// LE QUESTIONNAIRE


theme("Electricité");

debut("Voici une question sur le thème du multimètre.");

quest("Quelle est l’unité de la résistance électrique ? ");
rep("[ ] Volt (V)");
rep("[ ] Ampère (A)");
rep("[x] Ohm (Ω)");
rep("[ ] Watt (W)");
aj("images/nom01.png");
debut("Pour répondre à cette question, il suffit de savoir compter.");
juste("C'est exact");
faux("Attention: Il faut être plus attentif!");
abandon("Dommage, cette question était facile.");

quest("Sur le dessin, combien sont dessinées de roses rouges?//a");
rep("[ ] 1 rose");
rep("[ ] 2 roses");
rep("[x] 3 roses");
rep("[ ] 4 roses");
aj("images/nom02.png");

quest("Quelle est la bonne écriture du nombre 58 ?");
rep("[ ] 20 + 10 + 10 + 8");
rep("[x] 10 + 10 + 10 + 10 + 10 + 8");
rep("[ ] 40 + 20 + 8");
rep("[ ] 30 + 10 + 4 + 4");

quest("Complétez avec le signe &lt;, &gt; ou =");
rep("3 [<] 7");
rep("6 [>] 2");
rep("4 [=] 1+3");
rep("12-7 [<] 6");
aide("pages/aide1.html");
caracteres_speciaux("<",">","=");

quest("Pour chaque nombre, écrivez celui qui vient juste avant et celui qui est juste après.//2");
rep("[34] &lt; 35 &lt; [36]");
rep("[55] &lt; 56 &lt; [57]");
aide("pages/aide1.html");

quest("Quelle est la valeur de <frac><num>12</num><den>4</den></frac> ?");
rep("( ) 2");
rep("(o) 3");
rep("( ) 4");
rep("( ) 5");
rep("( ) 6");


theme("Calculs");

debut("Voici une question sur le thème &quot;Calculs&quot;.");

quest("Quels sont les résultats des additions?//2");
rep("3 + 6 = [9]");
rep("5 + 7 = [12]");
rep("7 + 8 = [15]");

quest("Compléte les additions ://2");
rep("3 + [5] = 8");
rep("[8] + 6 = 14");
rep("8 + [9] = 17");

quest("Quels sont les résultats des soustractions?//2");
rep("7 - 2 = [5]");
rep("8 - 5 = [3]");
rep("9 - 3 = [6]");

quest("Complétez les soustractions ://2");
rep("8 - [5] = 3");
rep("[9] - 4 = 5");
rep("9 - [1] = 8");


theme("Géométrie");

debut("Voici une question sur le thème &quot;Géométrie&quot;.");

quest("La pomme est située ://a");
rep("( ) Au-dessus du trait horizontal et à droite du trait vertical");
rep("(o) Au-dessus du trait horizontal et à gauche du trait vertical");
rep("( ) Au-dessous du trait horizontal et à droite du trait vertical");
rep("( ) Au-dessous du trait horizontal et à gauche du trait vertical");
aj("images/geo01.png");

quest("La poire est située ://a");
rep("( ) Au-dessus du trait horizontal et à droite du trait vertical");
rep("( ) Au-dessus du trait horizontal et à gauche du trait vertical");
rep("(o) Au-dessous du trait horizontal et à droite du trait vertical");
rep("( ) Au-dessous du trait horizontal et à gauche du trait vertical");
aj("images/geo01.png");

quest("Combien y a-t-il d'étoiles à l'intérieur du rectangle?//a");
rep("( ) 1 étoile");
rep("( ) 2 étoiles");
rep("( ) 3 étoiles");
rep("(o) 4 étoiles");
rep("( ) 5 étoiles");
aj("images/geo02.png");

quest("Combien y a-t-il d'étoiles à l'extérieur du cercle?//a");
rep("( ) 1 étoile");
rep("( ) 2 étoiles");
rep("( ) 3 étoiles");
rep("(o) 4 étoiles");
rep("( ) 5 étoiles");
aj("images/geo02.png");

quest("Deux figures géométriques sont représentées ci-contre.");
rep("La figure A est un [cercle||*triangle*||carré||losange[v]");
rep("Pour la deuxième figure, plusieurs réponses sont possibles...");
rep("La figure B est un [cercle||rond||disque]");
aj("images/geo03.png");

quest("Le vecteur (la flèche) <vec><i>F</i> </vec> est parallèle ://a");
rep("[ ] à l'axe (<i>Ox</i>)");
rep("[x] à l'axe (<i>Oy</i>)");
rep("[ ] à l'axe (<i>Oz</i>)");
aj("images/geo04.png");

quest("Le vecteur (la flèche) <vec><i>F</i> </vec> est perpendiculaire ://a");
rep("[x] à l'axe (<i>Ox</i>)");
rep("[ ] à l'axe (<i>Oy</i>)");
rep("[x] à l'axe (<i>Oz</i>)");
aj("images/geo04.png");


theme("Mesures");

debut("Voici une question sur le thème &quot;Mesures&quot;.");

quest("Quelle est la somme représentée ci-contre :");
rep("Elle est de [77] centimes.");
aj("images/mes01.png");

quest("Quel jour suit le mardi?");
rep("Le [lundi||mardi||*mercredi*||jeudi||vendredi||samedi||dimanche[v]");

quest("Quel mois précède le mois de juillet?");
rep("Le mois de [juin]");
aide("RAPPEL","pages/aide2.html");

quest("A votre avis, quel est le poids d'une chaise?");
rep("[ ] 4 grammes");
rep("[ ] 40 grammes");
rep("[ ] 400 grammes");
rep("[x] 4 kilogramme");
rep("[ ] 40 kilogrammes");
rep("[ ] 400 kilogrammes");

quest("Quel est le trait le plus long?");
rep("[ ] A");
rep("[x] B");
rep("[ ] C");
rep("[ ] D");
aj("images/mes02.png");

quest("Une bouteille contient 2 litres d'eau. On verse le contenu de 3 bouteilles dans un seau. Combien y a-t-il d'eau dans le seau?//a");
rep("[ ] 1 litre");
rep("[ ] 2 litres");
rep("[ ] 4 litres");
rep("[x] 6 litres");
rep("[ ] 8 litres");

quest("Pour ce cylindre de diamètre 40 mm, que faut-il écrire au dessus de la ligne de cote?");
rep("Inscription (utilisez la barre de caractères spéciaux) : [Ø40||Ø 40]");
aj("images/mes03.png");
caracteres_speciaux("œ","€","Ø");


theme("Phonétique");

quest("A l'aide du lecteur audio ci-dessous, écoutez et comptez les lettres du mot épelé.");
rep("Nombre de lettres : [8]");
aj("sons/baguette.ogg");

quest("A l'aide du lecteur audio ci-dessous, écoutez et comptez les lettres du mot épelé.");
rep("Nombre de lettres : [6]");
aj("sons/cinema.ogg");

quest("A l'aide du lecteur audio ci-dessous, écoutez et comptez les lettres du mot épelé.");
rep("Nombre de lettres : [4]");
aj("sons/jupe.ogg");

quest("A l'aide du lecteur audio ci-dessous, écoutez et comptez les lettres du mot épelé.");
rep("Nombre de lettres : [6]");
aj("sons/quatre.ogg");

quest("A l'aide du lecteur audio ci-dessous, écoutez et comptez les lettres du mot épelé.");
rep("Nombre de lettres : [5]");
aj("sons/stylo.ogg");

