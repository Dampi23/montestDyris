<!DOCTYPE html>
<!-- Page affichée pour le mode évaluation 1 et le mode sauvegarde 2 -->
<html>

<head>
<meta charset="utf-8">
<title>Scores</title>
<link rel="stylesheet" href="style.css">
<script src="textes.js"></script>
<script>
// Valeur de la note
function valeur(n) {
	if (n.charAt(0)=="-") return -1;
	else return eval(n);
}
note=[];
<?php
// Lecture du fichier "scores.csv" et création du tableau à deux entrées $note[$i][$j]
$ligne=file("scores.csv");
$note=array();
$verif=array();
$ind=0;
for($i=0; $i<count($ligne); $i++) {
	$verif[$i]=explode("§", $ligne[$i]);
	if (count($verif[$i])==5) {
		$note[$ind]=explode("§", $ligne[$i]);
		$note[$ind][4]=rtrim($note[$ind][4]);
		$ind++;
	}
}
// Conversion du tableau PHP en tableau JS
for ($i=0; $i<count($note); $i++) {
	echo "note[".$i."]=[];\n";
	for ($j=0;$j<5;$j++) { echo "note[".$i."][".$j."]='".$note[$i][$j]."';\n"; }
}
?>
// Ordonnancement du tableau à deux entrées note[i][j] selon les notes obtenues
for (i=0; i<note.length; i++) {
	var sauv=[];
	var max=i;
	for (var j=i; j<note.length; j++) { if (valeur(note[j][4])>valeur(note[max][4])) max=j; }
	if (max!=i) {
		for (var k=0; k<5; k++) {
			sauv[k]=note[i][k];
			note[i][k]=note[max][k];
			note[max][k]=sauv[k];
		}
	}
}
onload=function() {
	var i,j, ch='<table><tr><th>';
	ch+=txt.score[0]+'</th><th>'+txt.score[1]+'</th><th>'+txt.score[2];
	ch+='</th><th>'+txt.score[3]+'</th><th>'+txt.score[4]+'</th></tr>';
	for (i=0; i<note.length; i++) {
		ch+='<tr>';
		for (j=0; j<5; j++) { ch+='<td>'+note[i][j]+'</td>'; }
		ch+='</tr>';
	}
	ch+='</table><nav id="menu"><button type="button" onclick="effacer();">'+txt.score[5];
	ch+='</button></nav>';
	document.body.innerHTML=ch;
};
</script>

</head>

<body></body>

</html>

