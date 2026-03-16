<?php
// Récupération et enregistrement du score dans le fichier "scores.csv"
$score=$_POST['enr'];
if (strlen($score)!=0) {
	$fichier=fopen("scores.csv","a+");
	$entree=$score."\n";
	fputs($fichier,$entree);
	fclose($fichier);
}
// Messsage de confirmation
echo "ok";
?>
