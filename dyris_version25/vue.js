// DYRIS version 25


function ecrire_page1() {
	var i, j, ch='<h1>'+opt.titre+'</h1><p>'+opt.introduction+'</p>';
	for (i=0;i<mod.th.length;i++) {
		mod.th[i].etat="libre";
		for (j=0;j<mod.th[i].quest.length;j++) mod.th[i].quest[j].etat="libre";
		if (mod.th[i].quest.length==0) mod.th[i].etat="fini";
	}
	if (mod.th.length>1 && opt.nb_questions.length>1) {
		ch+='<div style="float:left; width:55%;">'+afficher_themes()+'</div>';
		ch+='<div style="float:right; width:44%;">'+afficher_nb_questions()+'</div>';
		ch+='<div style="clear:both;"></div>';
	}
	if (mod.th.length<=1 && opt.nb_questions.length>1) {
		ch+='<div style="margin:auto; width:45%;">'+afficher_nb_questions()+'</div>';
	}
	if (mod.th.length>1 && opt.nb_questions.length<=1) {
		ch+='<div style="margin:auto; width:55%;">'+afficher_themes()+'</div>';
	}
	ch+='<nav id="menu">';
	ch+=txt.mot[2]+'<input type="text" value="'+cont.ident+'" id="ident">&nbsp;&nbsp;&nbsp;';
	var saisir_mdp="non";
	for (i=0; i<opt.code.length; i++) { if (opt.code[i].mdp!="") saisir_mdp="oui" }
	if (saisir_mdp=="oui") ch+=txt.mot[3]+'<input type="password" size="8" value="'+cont.mdp+'" id="mdp">';
	ch+='<hr><button type="button" onclick="p1_commencer();">'+txt.bouton[0]+'</button>';
	for (i=0;i<opt.fenetre_info.length;i++) ch+=bouton_fenetre(opt.fenetre_info[i]);
	for (i=0;i<opt.onglet_info.length;i++) ch+=bouton_onglet(opt.onglet_info[i]);
	if (opt.quitter!="") ch+='<button type="button" onclick="quitter_dyris();">'+txt.bouton[1]+'</button>';
	ch+='</nav>';
	$("page").innerHTML=ch;
}

function afficher_themes() {
	var i, ch='<section><h2>'+txt.titre[0]+'</h2>';
	if (opt.mode_presentation=="1") {
		for (i=0;i<mod.th.length;i++) {
			ch+='<label><input type="checkbox" id="th'+i+'" onclick="p1_choisir_themes();"';
			if (mod.th[i].choisi=="oui") ch+=' checked';
			ch+='>&nbsp;&nbsp;'+mod.th[i].titre+'</label><br>';
		}
		ch+='<label><input type="checkbox" id="tous" onclick="p1_choisir_themes();">&nbsp;&nbsp;'+txt.mot[0]+'</label>';
	}
	else {
		for (i=0;i<mod.th.length;i++) {
			ch+='<label><input type="radio" id="th'+i+'" name="ch_th"';
			if (i==0||mod.th[i].choisi=="oui") ch+=' checked';
			ch+='>&nbsp;&nbsp;'+mod.th[i].titre+'</label><br>';
		}
	}
	ch+='</section>';
	return ch;
}

function afficher_nb_questions() {
	var ch='<section><h2>'+txt.titre[1]+'</h2>';
	for (var i=0;i<opt.nb_questions.length;i++) {
		ch+='<label><input type="radio" id="nb'+i+'" name="ch_nb"';
		if (i==0||cont.nb_quest_choisi==opt.nb_questions[i]) ch+=' checked';
		ch+='>&nbsp;&nbsp;'+opt.nb_questions[i]+' '+txt.mot[1]+'</label><br>';
	}
	ch+='</section>';
	return ch;
}

function ecrire_page2() {
	var i, j, num=[], t=mod.th[cont.num_theme], q=t.quest[cont.num_question], n=q.rep.length;
	// Titre avec le numéro de la question, la note obtenue et le chronomètre
	ch='<section><h2 style="text-align:center;">';
	ch+='<span style="float:left;">'+txt.titre[2]+(cont.nb_quest_faites+1)+'/'+cont.nb_quest_choisi+'</span>';
	if (opt.mode_evaluation==1) {
		ch+='<span id="info_note" style="float:right;">'+txt.titre[3]+'&nbsp;&nbsp;/'+q.bareme+'</span>';
	}
	ch+='<span id="chrono"></span><div style="clear:both;"></div></h2>';
	// Ajout associé à la question
	var nom="", type="", larg="", haut="";
	if (mod.com.ajout.nom!="") {
		nom=mod.com.ajout.nom;
		type=mod.com.ajout.type;
		larg=mod.com.ajout.larg;
		haut=mod.com.ajout.haut;
	}
	if (t.com.ajout.nom!="") {
		nom=t.com.ajout.nom;
		type=t.com.ajout.type;
		larg=t.com.ajout.larg;
		haut=t.com.ajout.haut;
	}	
	if (q.com.ajout.nom!="") {
		nom=q.com.ajout.nom;
		type=q.com.ajout.type;
		larg=q.com.ajout.larg;
		haut=q.com.ajout.haut;
	}
	if (type=="image") {
		ch+='<img style="float:right; margin-left:5px; border-radius: 6px;" src="'+nom+'"';
		if (larg!="") ch+=' width="'+larg+'"';
		if (haut!="") ch+=' height="'+haut+'"';
		ch+='>';
	}
	if (type=="video") {
		ch+='<video controls style="float:right; margin-left:5px;" src="'+nom+'"';
		if (larg!="") ch+=' width="'+larg+'"';
		if (haut!="") ch+=' height="'+haut+'"';
		ch+='></video>';
	}
	if (type=="autre") {
		ch+='<iframe style="float:right; margin-left:5px;" src="'+nom+'"';
		if (larg!="") ch+=' width="'+larg+'"';
		if (haut!="") ch+=' height="'+haut+'"';
		ch+='></iframe>';
	}
	// Enoncé de la question
	if (q.enonce!="") ch+=q.enonce.hasard()+'<br><br>';
	// Réponses proposées
	if (q.mode=="ordre") for (i=0;i<n;i++) num[i]=i;
	else {
		var util=[], recom=1;
		num[0]=Math.floor(n*Math.random());
		util[0]=num[0];
		for (i=1;i<n;i++) {
			num[i]=Math.floor(n*Math.random());
			recom=1;
			while (recom==1) {
				recom=0;
				for (j=0;j<util.length;j++) {
					if (num[i]==util[j]) {
						recom=1;
						num[i]=Math.floor(n*Math.random());
					}
				}
			}
			util[i]=num[i];
		}
	}
	for (i=0;i<n;i++) { ch+=q.rep[num[i]].txt+"<br>"; }
	ch+='<div style="clear:both;"></div>';
	// Lecteur audio associé à la question
	if (type=="audio") {
		ch+='<audio controls style="display: block; margin: auto; margin-top: 15px;" src="'+nom+'"></audio>';
	}
	ch+='</section>';
	// Menu
	ch+='<nav id="menu">';
	// Commentaire accompagnant la question posée
	if (q.com.debut!="") ch+=q.com.debut.hasard()+'<hr>';
	else if (t.com.debut!="") ch+=t.com.debut.hasard()+'<hr>';
	else if (mod.com.debut!="") ch+=mod.com.debut.hasard()+'<hr>';
	// Barre de caractères spéciaux
	if (q.com.caractere.length!=0) {
		for (i=0;i<q.com.caractere.length;i++) {
			ch+='<button type="button" onclick="p2_inserer(\'';
			ch+=q.com.caractere[i]+'\')">'+q.com.caractere[i]+'</button>';
		}
		ch+='<hr>';
	}
	else if (t.com.caractere.length!=0) {
		for (i=0;i<t.com.caractere.length;i++) {
			ch+='<button type="button" onclick="p2_inserer(\'';
			ch+=t.com.caractere[i]+'\')">'+t.com.caractere[i]+'</button>';
		}
		ch+='<hr>';
	}
	else if (mod.com.caractere.length!=0) {
		for (i=0;i<mod.com.caractere.length;i++) {
			ch+='<button type="button" onclick="p2_inserer(\'';
			ch+=mod.com.caractere[i]+'\')">'+mod.com.caractere[i]+'</button>';
		}
		ch+='<hr>';
	}
	// Suite du menu
	ch+='<button type="button" onclick="p2_verifier();">'+txt.bouton[2]+'</button>';
	ch+='<button type="button" onclick="p2_ne_sais_pas();">'+txt.bouton[4]+'</button>';
	// Boutons affichant des fenêtres
	if (q.com.fenetre_aide.length!=0) {
		for (i=0;i<q.com.fenetre_aide.length;i++) ch+=bouton_fenetre(q.com.fenetre_aide[i]);
	}
	if (t.com.fenetre_aide.length!=0) {
		for (i=0;i<t.com.fenetre_aide.length;i++) ch+=bouton_fenetre(t.com.fenetre_aide[i]);
	}
	if (mod.com.fenetre_aide.length!=0) {
		for (i=0;i<mod.com.fenetre_aide.length;i++) ch+=bouton_fenetre(mod.com.fenetre_aide[i]);
	}
	// Boutons affichant des onglets
	if (q.com.onglet_aide.length!=0) {
		for (i=0;i<q.com.onglet_aide.length;i++) ch+=bouton_onglet(q.com.onglet_aide[i]);
	}
	if (t.com.onglet_aide.length!=0) {
		for (i=0;i<t.com.onglet_aide.length;i++) ch+=bouton_onglet(t.com.onglet_aide[i]);
	}
	if (mod.com.onglet_aide.length!=0) {
		for (i=0;i<mod.com.onglet_aide.length;i++) ch+=bouton_onglet(mod.com.onglet_aide[i]);
	}
	// Fin du menu
	if (opt.mode_evaluation=="1") ch+='<button type="button" onclick="p2_clore();">'+txt.bouton[5]+'</button>';
	ch+='</nav>';
	$("page").innerHTML=ch;
	mmjs.mod();
	// Mise en route du chronomètre
	chrono=-1;
	if (mod.com.chrono.delai!="-1") chrono=mod.com.chrono.delai;
	if (t.com.chrono.delai!="-1") chrono=t.com.chrono.delai;
	if (q.com.chrono.delai!="-1") chrono=q.com.chrono.delai;
	p2_rebours();
	// Mise en place du focus
	if (q.rep[0].type=="champ_ou_liste") $(q.rep[0].id[0]).focus();
}

function maj_page2(note_question,commentaire) {
	var ch='', a=cont.num_theme, b=cont.num_question, t=mod.th[a], q=t.quest[b];
	// Commentaire sur la réponse apportée
	if (commentaire!="") ch=commentaire+'<hr>';
	// Suite du menu
	if (cont.nb_quest_faites<cont.nb_quest_choisi) {
		ch+='<button type="button" onclick="p2_suivant();">'+txt.bouton[3]+'</button>';
	}
	// Boutons affichant des fenêtres
	if (q.com.fenetre_corrige.length!=0) {
		for (i=0;i<q.com.fenetre_corrige.length;i++) ch+=bouton_fenetre(q.com.fenetre_corrige[i]);
	}
	if (t.com.fenetre_corrige.length!=0) {
		for (i=0;i<t.com.fenetre_corrige.length;i++) ch+=bouton_fenetre(t.com.fenetre_corrige[i]);
	}
	if (mod.com.fenetre_corrige.length!=0) {
		for (i=0;i<mod.com.fenetre_corrige.length;i++) ch+=bouton_fenetre(mod.com.fenetre_corrige[i]);
	}
	// Boutons affichant des onglets
	if (q.com.onglet_corrige.length!=0) {
		for (i=0;i<q.com.onglet_corrige.length;i++) ch+=bouton_onglet(q.com.onglet_corrige[i]);
	}
	if (t.com.onglet_corrige.length!=0) {
		for (i=0;i<t.com.onglet_corrige.length;i++) ch+=bouton_onglet(t.com.onglet_corrige[i]);
	}
	if (mod.com.onglet_corrige.length!=0) {
		for (i=0;i<mod.com.onglet_corrige.length;i++) ch+=bouton_onglet(mod.com.onglet_corrige[i]);
	}
	// Fin du menu
	if (cont.nb_quest_faites<cont.nb_quest_choisi) {
		ch+='<button type="button" onclick="p2_finir();">'+txt.bouton[5]+'</button>';
	}
	else ch+='<button type="button" onclick="p2_suivant();">'+txt.bouton[7]+'</button>';
	$("menu").innerHTML=ch;
	$("info_note").innerHTML=txt.titre[3]+Math.round(note_question*100)/100+'/'+mod.th[a].quest[b].bareme;
}

function ecrire_page3() {
	var ch='';
	// Liste des thèmes choisis
	if (mod.th.length>1) ch+='<section><h2>'+txt.titre[4]+'</h2>'+cont.liste_th_ch()+'</section>';
	// Nombre de questions choisi
	ch+='<section><h2>'+txt.titre[5]+'</h2>'+cont.nb_quest_choisi+'</section>';
	// Note finale
	if (cont.nb_quest_faites==cont.nb_quest_choisi) ch+='<section><h2>'+txt.titre[6]+'</h2>'+cont.note_finale()+'</section>';
	// Temps mis pour répondre aux questions
	ch+='<section><h2>'+txt.titre[7]+'</h2>'+cont.temps()+'</section>';
	// Appréciation
	if (cont.com()!="") ch+='<section><h2>'+txt.titre[8]+'</h2>'+cont.com()+'</section>';
	ch+='<nav id="menu">';
	// Sauvegarde proposée dans le cas d'une évaluation formative
	if (opt.mode_evaluation==1) {
		if (opt.mode_sauvegarde==1) {
			// Proposer une sauvegarde si le navigateur accepte les cookies
			if (cont.test_cookies()=="ok") {
				ch+='<button type="button" onclick="p3_sauv_cookies();">';
				ch+=txt.bouton[8]+'</button>';
			}
		}
		if (opt.mode_sauvegarde==2) {
			ch+='<button type="button" onclick="p3_sauv_php();">';
			ch+=txt.bouton[8]+'</button>';
		}
	}
	ch+='<button type="button" onclick="ecrire_page1();">'+txt.bouton[6]+'</button>';
	if (opt.quitter!="") ch+='<button type="button" onclick="quitter_dyris();">'+txt.bouton[1]+'</button>';
	ch+='</nav>';
	$("page").innerHTML=ch;
}

function bouton_fenetre(obj) {
	var ch='<button type="button" onclick="ouvrir_fenetre(\'';
	ch+=obj.url+'\',\''+obj.larg+'\',\''+obj.haut+'\');">'+obj.nom+'</button>';
	return ch;
}

function bouton_onglet(obj) {
	var ch='<button type="button" onclick="window.open(\'';
	ch+=obj.url+'\',\'_blank\');">'+obj.nom+'</button>';
	return ch;
}

