// MinMathJS - Licence GPLv3 - Version d'avril 2023

mmjs={};

mmjs.mod=function() {
// Remplacement des balises
var txt=document.body.innerHTML;
var ch=["ang", "vec", "alg", "mat", "abs", "mod", "par", "cro", "acc", "rac", "coo", "frac", "num", "den", "int", "som", "ini", "fin", "gb", "db", "gh", "dh", "vert"];
for (var i=0; i<ch.length; i++) {
  txt=txt.replaceAll('<'+ch[i]+'>','<span class="'+ch[i]+'">');
  txt=txt.replaceAll('</'+ch[i]+'>','</span>');
}
document.body.innerHTML=txt;
// Alignement vertical des fractions
var den=document.querySelectorAll('.den');
for (var i=0; i<den.length; i++) {
  var frac_ds_den=den[i].querySelectorAll('.frac');
  if (frac_ds_den.length==0) den[i].parentNode.style["vertical-align"]="-"+(den[i].clientHeight-8)+"px";
  else den[i].parentNode.style["vertical-align"]="-"+(den[i].clientHeight-21)+"px";
}
};

mmjs.css=function() {
// Ajout de la feuille de style
var stylemath=document.createElement("style");
stylemath.type="text/css";
stylemath.innerHTML=mmjs.styles;
document.head.appendChild(stylemath);
};

mmjs.url=function(largeur, hauteur, chemin) {
// Dessin au format SVG placé en arrière plan 
var ch=`url("data:image/svg+xml;utf8,<svg width='`+largeur+`' height='`+hauteur;
ch+=`' xmlns='http://www.w3.org/2000/svg'><path d='`+chemin+`'/></svg>")`;
return ch;
};

mmjs.styles=`
.ang {
padding: 7px 2px 0px 2px;
background-position: 50% 0;
background-size: 80% 6px;
background-image: `+mmjs.url(14, 6, 'M 0 5 L 7 0 L 14 5 L 14 6 L 7 2 L 0 6')+`;
}

.vec {
padding: 7px 3px 0px 2px;
background-position: 100% 0;
background-image: `+mmjs.url(300, 6, 'M 0 2.4 H 296.5 L 295 0 L 300 3 L 295 6 L 296.5 3.6 H 0')+`;
}

.alg {
padding: 4px 2px 0px 2px;
background-image: `+mmjs.url(300, 2, 'M 0 0.4 H 300 V 1.6 H 0')+`;
}

.mat {
padding: 7px 2px 0px 2px;
background-image: `+mmjs.url(300, 6, 'M 0 0.4 H 300 V 1.6 H 0 M 0 4.4 H 300 V 5.6 H 0')+`;
}

.abs {
padding: 3px 6px 2px 6px;
background-position: 0 0, 100% 0;
background-image: `+mmjs.url(2, 300, 'M 0.4 0 V 300 H 1.6 V 0')+`,
                  `+mmjs.url(2, 300, 'M 0.4 0 V 300 H 1.6 V 0')+`;
}

.mod {
padding: 1px 9px 2px 9px;
background-position: 0 0, 100% 0;
background-image: `+mmjs.url(6, 300, 'M 0.4 0 V 300 H 1.6 V 0 M 4.4 0 V 300 H 5.6 V 0')+`,
                  `+mmjs.url(6, 300, 'M 0.4 0 V 300 H 1.6 V 0 M 4.4 0 V 300 H 5.6 V 0')+`;
}

.par {
padding: 2px 11px 2px 11px;
background-position: 0 0, 100% 0;
background-size: 10px 100%;
background-image: `+mmjs.url(10, 30, 'M 10 2 C -1.7 2 -1.7 28 10 28 C 1 26 1 4 10 2')+`,
                  `+mmjs.url(10, 30, 'M 0 2 C 11.7 2 11.7 28 0 28 C 9 26 9 4 0 2')+`;
}

.cro {
padding: 2px 8px 2px 8px;
background-position: 0 0, 0 0, 0 100%, 100% 0, 100% 0, 100% 100%;
background-size: 3px 100%, 6px 1px, 6px 1px, 3px 100%, 6px 1px, 6px 1px;
background-image: `+mmjs.url(3, 20, 'M 1.5 0 V 20 H 3 V 0')+`,
                  `+mmjs.url(6, 1, 'M 2 0 V 1 H 6 V 0')+`,
                  `+mmjs.url(6, 1, 'M 2 0 V 1 H 6 V 0')+`,
                  `+mmjs.url(3, 20, 'M 0 0 V 20 H 1.5 V 0')+`,
                  `+mmjs.url(6, 1, 'M 0 0 V 1 H 4 V 0')+`,
                  `+mmjs.url(6, 1, 'M 0 0 V 1 H 4 V 0')+`;
}

.acc {
padding: 2px 10px 2px 10px;
background-position: 0 0, 100% 0;
background-size: 9px 100%;
background-image: `+mmjs.url(9, 40, 'M 9 0 C -1 0 9 18 0 20 C 9 22 -1 40 9 40 C 2 38 10 20 2 20 C 10 20 2 2 9 0')+`,
                  `+mmjs.url(9, 40, 'M 0 0 C 10 0 0 18 9 20 C 0 22 10 40 0 40 C 7 38 -1 20 7 20 C -1 20 7 2 0 0')+`;
}

.rac {
padding: 4px 3px 0px 17px;
background-position: 0 0, 0 0, 0 50%;
background-size: 17px 100%, 900px 2px, 5px 6px;
background-image: `+mmjs.url(17, 30, 'M 3.3 16.2 L 8 30 L 17 0 H 15.8 L 8.2 24.6 L 5 15')+`,
                  `+mmjs.url(900, 2, 'M 16.5 0 H 900 V 1.2 H 16.5')+`,
                  `+mmjs.url(5, 6, 'M 0 6 L 5 3 V 5')+`;
}
.rac .gh {
top: -5px;
left: -1px;
}

.coo {
padding: 2px 2px 2px 8px;
vertical-align: middle;
background-image: `+mmjs.url(2, 300, 'M 0.4 0 V 300 H 1.6 V 0')+`;
}

.frac { padding: 0px; }
.frac .num {
display: block;
margin: 0px;
padding: 0px 5px 4px 5px;
background-repeat: no-repeat;
background-position: 0 100%;
background-image: `+mmjs.url(900, 2, 'M 0 0.4 H 900 V 1.6 H 0')+`;
font-size: 0.95em;
}
.frac .den {
display: block;
margin: 0px;
padding: 2px 5px 0px 5px;
font-size: 0.95em;
}

.int {
padding: 0px;
vertical-align: middle;
background-size: 12px 100%;
background-image: `+mmjs.url(12, 30, 'M 10 2 C 8 4 12 4 11 2 C 4 -6 6 32 2 28 C 4 26 0 26 1 28 C 8 36 6 -2 10 2')+`;
min-width: 12px;
min-height: 30px;
}
.int .fin {
display: block;
margin: 0px;
padding: 0px 2px 0px 15px;
font-size: 0.8em;
min-height: 1em;
}
.int .ini {
display: block;
margin: 0px;
padding: 14px 2px 0px 8px;
font-size: 0.8em;
min-height: 1em;
}

.som {
padding: 0px;
text-align: center;
vertical-align: middle;
background-position: 50% 50%;
background-image: `+mmjs.url(16, 16, 'M 0 0 H 15 L 16 1 H 3.1 L 9 7.6 L 2.9 14.5 H 16 L 15 16 H 0 L 7 8')+`;
min-width: 18px;
min-height: 18px;
}
.som .fin {
display: block;
margin: 0px;
padding: 0px 4px 0px 4px;
font-size: 0.8em;
min-height: 1em;
}
.som .ini {
display: block;
margin: 0px;
padding: 22px 4px 0px 4px;
font-size: 0.8em;
min-height: 1em;
}

/* Petits textes aux quatre angles */
.db, .gb, .dh, .gh {
position: absolute;
font-size: 0.8em;
padding: 0px 1px 0px 1px;
} 
.db {
bottom: -9px;
left: 100%;
} 
.gb {
bottom: -9px;
right: 100%;
} 
.dh {
top: -8px;
left: 100%;
} 
.gh {
top: -8px;
right: 100%;
}

/* Alignement vertical */
.vert {
display: inline-block;
vertical-align: middle;
text-align: center;
margin: 0px;
padding: 4px 2px 4px 2px;
}

/* Propriétés communes */
.ang, .vec, .alg, .mat, .abs, .mod, .par, .cro, .acc, .rac, .coo, .frac, .int, .som {
display: inline-block;
text-align: center;
margin: 0px;
position: relative;
background-repeat: no-repeat;
width: auto;
}
.num, .den, .ini, .fin, .db, .gb, .dh, .gh, .vert { width: auto; }
`;

mmjs.css();

