// DYRIS version 25


// VARIABLES GLOBALES

var zt_focus, clignot, tempo, chrono;


// CONSTRUCTEURS

function C_appreciation(a,b,c) {
	this.note_min=a*1;
	this.note_max=b*1;
	if (b*1<a*1) {
		this.note_min=b*1;
		this.note_max=a*1;
	}
	this.enonce=c;
}
function C_code() {
	this.ident=arguments[0].trim();
	this.mdp="";
	if (arguments.length==2) this.mdp=arguments[1].trim();
}
function C_fenetre() {
	this.larg="auto";
	this.haut="auto";
	if (arguments.length==1) {
		this.nom=txt.bouton[9];
		this.url=arguments[0];
	}
	if (arguments.length==2) {
		this.nom=arguments[0];
		this.url=arguments[1];
	}
	if (arguments.length==3) {
		this.nom=txt.bouton[9];
		this.url=arguments[0];
		this.larg=arguments[1];
		this.haut=arguments[2];
	}
	if (arguments.length==4) {
		this.nom=arguments[0];
		this.url=arguments[1];
		this.larg=arguments[2];
		this.haut=arguments[3];
	}
}
function C_onglet() {
	if (arguments.length==1) {
		this.nom=txt.bouton[9];
		this.url=arguments[0];
	}
	if (arguments.length==2) {
		this.nom=arguments[0];
		this.url=arguments[1];
	}
}
function C_complement() {
	this.ajout={ nom:"", type:"", larg:"", haut:"" };
	this.debut="";
	this.juste="";
	this.faux="";
	this.abandon="";
	this.chrono={ delai:"-1", fini:"" };
	this.caractere=[];
	this.fenetre_aide=[];
	this.onglet_aide=[];
	this.fenetre_corrige=[];
	this.onglet_corrige=[];
	this.aj_fen_aide=function() { this.fenetre_aide[this.fenetre_aide.length]=new C_fenetre(...arguments); };
	this.aj_ong_aide=function() { this.onglet_aide[this.onglet_aide.length]=new C_onglet(...arguments); };
	this.aj_fen_corrige=function() { this.fenetre_corrige[this.fenetre_corrige.length]=new C_fenetre(...arguments); };
	this.aj_ong_corrige=function() { this.onglet_corrige[this.onglet_corrige.length]=new C_onglet(...arguments); };
}
function C_reponse(a) {
	var i, ch=a.substring(0,3), pos=a.indexOf("]");
	var nt=mod.th.length-1, nq=mod.th[nt].quest.length-1, nr=mod.th[nt].quest[nq].rep.length, id=nt+"_"+nq+"_"+nr;
	if (ch=="[x]"||ch=="[o]"||ch=="[*]"||ch=="[ ]") {
		this.type="case";
		this.id=id;
		if (ch=="[ ]") this.sol="decoche"; else this.sol="coche";
		this.repondu="";
		this.txt='<label><input type="checkbox" id="'+id+'">&nbsp;&nbsp;'+a.substring(3)+'</label>';
	}
	else if (ch=="(x)"||ch=="(o)"||ch=="(*)"||ch=="( )") {
		this.type="bouton";
		this.id=id;
		if (ch=="( )") this.sol="decoche"; else this.sol="coche";
		this.repondu="";
		this.txt='<label><input type="radio" id="'+id+'" name="ch_rep">&nbsp;&nbsp;'+a.substring(3)+'</label>';
	}
	else if (a.indexOf("]")==-1) {
		this.type="texte";
		this.txt=a;
	}
	else {
		this.type="champ_ou_liste";
		this.id=[];
		this.sol=[];
		this.repondu=[];
		this.txt="";
		while (pos!=-1) {
			this.id[this.id.length]=id+"_"+this.id.length;
			this.repondu[this.repondu.length]="";
			ch=a.substring(0,pos+1);
			a=a.substring(pos+1);
			pos=ch.indexOf("[");
			this.txt+=ch.substring(0,pos);
			ch=ch.substring(pos+1,ch.length-1);
			if (ch.substring(ch.length-2)=="[v") {
				ch=ch.substring(0,ch.length-2);
				this.txt+='<select id="'+this.id[this.id.length-1]+'"><option></option>'
				var opt=ch.split("||");
				for (i=0; i<opt.length; i++) {
					if (opt[i].substring(0,1)=="*"&&opt[i].substring(opt[i].length-1)=="*") {
						opt[i]=opt[i].substring(1,opt[i].length-1);
						this.sol[this.sol.length]=opt[i];
					}
					this.txt+='<option>'+opt[i]+'</option>';
				}
				this.txt+='</select>';
			}
			else {
				this.sol[this.sol.length]=ch;
				this.txt+='<input type="text" id="'+this.id[this.id.length-1];
				this.txt+='" size="'+ch.split("||")[0].length;
				this.txt+='" onFocus="zt_focus=\''+this.id[this.id.length-1]+'\';">';
			}
			pos=a.indexOf("]");
		}
		this.txt+=a.substring(pos+1);
	}
}
function C_question(a) {
	var fin, pos=a.lastIndexOf("//");
	this.bareme=1;
	this.mode="ordre";
	if ((pos==-1)||(a.length-pos>6)) { this.enonce=a; }
	else {
		this.enonce=a.substring(0,pos);
		fin=a.substring(pos+2,a.length);
		pos=fin.indexOf("a");
		if (pos==-1) { if (1*fin>0) this.bareme=1*fin; }
		else {
			fin=fin.substring(0,pos)+fin.substring(pos+1,fin.length);
			if (1*fin>0) this.bareme=1*fin;
			this.mode="aleatoire";
		}
	}
	this.etat="libre";
	this.com=new C_complement();
	this.rep=[];
	this.aj_reponse=function(b) { this.rep[this.rep.length]=new C_reponse(b); };
}
function C_theme(a) {
	this.com=new C_complement();
	this.etat="libre";
	this.titre=a;
	this.choisi="non";
	this.quest=[];
	this.aj_question=function(b) { this.quest[this.quest.length]=new C_question(b); };
}


// OBJETS

var opt={
	mode_presentation:"1",
	mode_evaluation:"1",
	mode_sauvegarde:"1",
	code:[],
	titre:"",
	introduction:"",
	nb_questions:[],
	fenetre_info:[],
	onglet_info:[],
	quitter:"",
	coef_rep_juste:1,
	coef_rep_nulle:0,
	coef_rep_fausse:-0.5,
	note_sur:"",
	appr:[],
	non_fini:"",
	aj_fen_info:function() { this.fenetre_info[this.fenetre_info.length]=new C_fenetre(...arguments); },
	aj_ong_info:function() { this.onglet_info[this.onglet_info.length]=new C_onglet(...arguments); },
	aj_appr:function(a,b,c) { this.appr[this.appr.length]=new C_appreciation(a,b,c); },
	aj_code:function() { this.code[this.code.length]=new C_code(...arguments); }
};

var mod={
	com:new C_complement(),
	th:[],
	aj_theme:function(a) { mod.th[mod.th.length]=new C_theme(a); }
};


// FONCTIONS APPELEES PAR LA PARTIE "OPTIONS" DU FICHIER "donnees.js"

function mode_presentation(a) { if (a=="1"||a=="2") opt.mode_presentation=a; }
function mode_evaluation(a) { if (a=="1"||a=="2") opt.mode_evaluation=a; }
function mode_sauvegarde(a) { if (a=="1"||a=="2") opt.mode_sauvegarde=a; }
function code() { opt.aj_code(...arguments); }
function titre(a) { opt.titre+=" "+a; }
function introduction(a) { opt.introduction+=" "+a; }
function nombre_questions() { for (var i=0;i<arguments.length;i++) opt.nb_questions[i]=arguments[i]; }
function fenetre_info() { opt.aj_fen_info(...arguments); }
function onglet_info() { opt.aj_ong_info(...arguments); }
function url_quitter(a) { opt.quitter=a; }
function coef_rep_juste(a) { opt.coef_rep_juste=a; }
function coef_rep_fausse(a) { opt.coef_rep_fausse=a; }
function coef_rep_nulle(a) { opt.coef_rep_nulle=a; }
function note_sur(a) { opt.note_sur=a; }
function appreciation(a,b,c) { opt.aj_appr(a,b,c); }
function non_termine(a) { opt.non_fini=a; }


// FONCTIONS APPELEES PAR LA PARTIE "QUESTIONNAIRE" DU FICHIER "donnees.js"

function theme(a) { mod.aj_theme(a); }
function question(a) {
	if (mod.th.length==0) mod.aj_theme("Theme_non_defini");
	mod.th[mod.th.length-1].aj_question(a);
}
function reponse(a) {
	var num_th=mod.th.length-1, num_quest=mod.th[num_th].quest.length-1;
	mod.th[num_th].quest[num_quest].aj_reponse(a);
}
function ajout() {
	var nom=arguments[0], type="autre", larg="", haut="", ext=nom.split(".").pop().toLowerCase();
	if (arguments.length>1) larg=arguments[1];
	if (arguments.length==3) haut=arguments[2];
	if (ext=="jpg" || ext=="jpeg" || ext=="png" || ext=="gif"|| ext=="webp") type="image";
	else if (ext=="mp4" || ext=="wav" || ext=="webm") type="video";
	else if (ext=="mp3" || ext=="avi" || ext=="mkv" || ext=="ogg") type="audio";
	if (mod.th.length==0) { 
		mod.com.ajout.nom=nom;
		mod.com.ajout.type=type;
		mod.com.ajout.larg=larg;
		mod.com.ajout.haut=haut;
	}
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_th=mod.th.length-1;
		mod.th[num_th].com.ajout.nom=nom;
		mod.th[num_th].com.ajout.type=type;
		mod.th[num_th].com.ajout.larg=larg;
		mod.th[num_th].com.ajout.haut=haut;
	}
	else {
		var num_th=mod.th.length-1, num_quest=mod.th[num_th].quest.length-1;
		mod.th[num_th].quest[num_quest].com.ajout.nom=nom;
		mod.th[num_th].quest[num_quest].com.ajout.type=type;
		mod.th[num_th].quest[num_quest].com.ajout.larg=larg;
		mod.th[num_th].quest[num_quest].com.ajout.haut=haut;
	}	
}
function debut(a) {
	if (mod.th.length==0) mod.com.debut=a;
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_th=mod.th.length-1;
		mod.th[num_th].com.debut=a;
	}
	else {
		var num_th=mod.th.length-1, num_quest=mod.th[num_th].quest.length-1;
		mod.th[num_th].quest[num_quest].com.debut=a;
	}
}
function juste(a) {
	if (mod.th.length==0) mod.com.juste=a;
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_th=mod.th.length-1;
		mod.th[num_th].com.juste=a;
	}
	else {
		var num_th=mod.th.length-1, num_quest=mod.th[num_th].quest.length-1;
		mod.th[num_th].quest[num_quest].com.juste=a;
	}
}
function faux(a) {
	if (mod.th.length==0) mod.com.faux=a;
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_th=mod.th.length-1;
		mod.th[num_th].com.faux=a;
	}
	else {
		var num_th=mod.th.length-1, num_quest=mod.th[num_th].quest.length-1;
		mod.th[num_th].quest[num_quest].com.faux=a;
	}
}
function abandon(a) {
	if (mod.th.length==0) mod.com.abandon=a;
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_th=mod.th.length-1;
		mod.th[num_th].com.abandon=a;
	}
	else {
		var num_th=mod.th.length-1, num_quest=mod.th[num_th].quest.length-1;
		mod.th[num_th].quest[num_quest].com.abandon=a;
	}
}
function chronometre() {
	var delai="20", fini="";
	if (arguments.length>0) delai=arguments[0];
	if (arguments.length>1) fini=arguments[1];
	if (mod.th.length==0) {
		mod.com.chrono.delai=delai;
		mod.com.chrono.fini=fini;
	}
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_th=mod.th.length-1;
		mod.th[num_th].com.chrono.delai=delai;
		mod.th[num_th].com.chrono.fini=fini;
	}
	else {
		var num_th=mod.th.length-1, num_quest=mod.th[num_th].quest.length-1;
		mod.th[num_th].quest[num_quest].com.chrono.delai=delai;
		mod.th[num_th].quest[num_quest].com.chrono.fini=fini;
	}
}
function caracteres_speciaux() {
	var i;
	if (mod.th.length==0) {
		for (i=0;i<arguments.length;i++) mod.com.caractere[i]=arguments[i];
	}
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_th=mod.th.length-1;
		for (i=0;i<arguments.length;i++) mod.th[num_th].com.caractere[i]=arguments[i];
	}
	else {
		var num_th=mod.th.length-1, num_quest=mod.th[num_th].quest.length-1;
		for (i=0;i<arguments.length;i++) {
			mod.th[num_th].quest[num_quest].com.caractere[i]=arguments[i];
		}
	}
}
function fenetre_aide() {
	if (mod.th.length==0) mod.com.aj_fen_aide(...arguments);
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_th=mod.th.length-1;
		mod.th[num_th].com.aj_fen_aide(...arguments);
	}
	else {
		var num_th=mod.th.length-1, num_quest=mod.th[num_th].quest.length-1;
		mod.th[num_th].quest[num_quest].com.aj_fen_aide(...arguments);
	}
}
function onglet_aide() {
	if (mod.th.length==0) mod.com.aj_ong_aide(...arguments);
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_th=mod.th.length-1;
		mod.th[num_th].com.aj_ong_aide(...arguments);
	}
	else {
		var num_th=mod.th.length-1, num_quest=mod.th[num_th].quest.length-1;
		mod.th[num_th].quest[num_quest].com.aj_ong_aide(...arguments);
	}
}
function fenetre_corrige() {
	if (mod.th.length==0) mod.com.aj_fen_corrige(...arguments);
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_th=mod.th.length-1;
		mod.th[num_th].com.aj_fen_corrige(...arguments);
	}
	else {
		var num_th=mod.th.length-1, num_quest=mod.th[num_th].quest.length-1;
		mod.th[num_th].quest[num_quest].com.aj_fen_corrige(...arguments);
	}
}
function onglet_corrige() {
	if (mod.th.length==0) mod.com.aj_ong_corrige(...arguments);
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_th=mod.th.length-1;
		mod.th[num_th].com.aj_ong_corrige(...arguments);
	}
	else {
		var num_th=mod.th.length-1, num_quest=mod.th[num_th].quest.length-1;
		mod.th[num_th].quest[num_quest].com.aj_ong_corrige(...arguments);
	}
}


// RACCOURCIS

var quest=question, rep=reponse, aj=ajout, aide=fenetre_aide, bouton_sup=fenetre_info;

