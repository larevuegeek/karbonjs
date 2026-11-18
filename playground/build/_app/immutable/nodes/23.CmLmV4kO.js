import{A as e,B as t,E as n,G as r,K as i,L as a,O as o,U as s,W as c,b as l,it as u,y as d}from"../chunks/cw37mxrC.js";import"../chunks/DnTe57Jg.js";import{_ as f,h as p}from"../chunks/DTAilj2v.js";import{t as m}from"../chunks/CILZRAmH.js";var h=e(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!> <!></div>`),g=e(`<div class="grid grid-cols-2 md:grid-cols-3 gap-4"></div>`),_=e(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">25%</span> <!></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">50% (default)</span> <!></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">75%</span> <!></div></div>`),v=e(`<div class="max-w-md"><!></div>`),y=e(`<div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);"> </span> <!></div>`),b=e(`<div class="grid grid-cols-2 md:grid-cols-5 gap-3"></div>`),x=e(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans handle</span> <!></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans labels</span> <!></div></div>`),S=e(`<h1 class="text-3xl font-bold mb-2">ImageCompare</h1> <p class="text-[var(--karbon-text-3)] mb-10">Comparateur d'images avant/apres avec slider, touch support et keyboard nav.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> <!></div> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1);function C(e){let C=[`red`,`emerald`,`cyan`,`blue`,`violet`,`pink`];var w=S(),T=i(c(w),4),E=i(s(T),2);f(E,{code:`<script lang="ts">
  import { ImageCompare } from '@karbonjs/ui-svelte'
<\/script>

<ImageCompare
  before="/before.jpg"
  after="/after.jpg"
  beforeLabel="Avant"
  afterLabel="Apres"
  color="violet"
  rounded="xl"
/>

<!-- Mode vertical -->
<ImageCompare
  before="/old.jpg"
  after="/new.jpg"
  orientation="vertical"
  initialPosition={25}
  color="cyan"
/>`,language:`svelte`,title:`Example.svelte`,lineCopy:!0}),u(T);var D=i(T,2);m(D,{title:`Basic`,description:`Glissez le curseur pour comparer. Fonctionne aussi au touch et au clavier.`,code:`<ImageCompare
  before="/before.jpg"
  after="/after.jpg"
  rounded="xl"
/>`,children:e=>{p(e,{before:`https://picsum.photos/seed/compare-before/800/500`,after:`https://picsum.photos/seed/compare-after/800/500`,rounded:`xl`})},$$slots:{default:!0}});var O=i(D,2);m(O,{title:`Flou → Net`,description:`Meme image : version floue vs version nette. Ideal pour montrer un debruitage ou un upscale IA.`,code:`<ImageCompare
  before="/blur.jpg"
  after="/sharp.jpg"
  beforeLabel="Flou"
  afterLabel="Net"
  color="cyan"
  rounded="xl"
/>`,children:e=>{p(e,{before:`https://picsum.photos/seed/blur-demo/800/500?blur=10`,after:`https://picsum.photos/seed/blur-demo/800/500`,beforeLabel:`Flou`,afterLabel:`Net`,color:`cyan`,rounded:`xl`})},$$slots:{default:!0}});var k=i(O,2);m(k,{title:`Noir & blanc → Couleur`,description:`Comparez une version desaturee et la version couleur.`,code:`<ImageCompare
  before="/grayscale.jpg"
  after="/color.jpg"
  beforeLabel="N&B"
  afterLabel="Couleur"
  color="violet"
  rounded="xl"
/>`,children:e=>{p(e,{before:`https://picsum.photos/seed/bw-demo/800/500?grayscale`,after:`https://picsum.photos/seed/bw-demo/800/500`,beforeLabel:`N&B`,afterLabel:`Couleur`,color:`violet`,rounded:`xl`})},$$slots:{default:!0}});var A=i(k,2);m(A,{title:`Labels custom`,description:`Personnalisez les textes avant/apres.`,code:`<ImageCompare before="/day.jpg" after="/night.jpg" beforeLabel="Jour" afterLabel="Nuit" color="amber" />
<ImageCompare before="/old.jpg" after="/new.jpg" beforeLabel="Original" afterLabel="Retouche" color="violet" />`,children:e=>{var t=h(),n=s(t);p(n,{before:`https://picsum.photos/seed/day/600/400`,after:`https://picsum.photos/seed/night/600/400`,beforeLabel:`Jour`,afterLabel:`Nuit`,color:`amber`});var r=i(n,2);p(r,{before:`https://picsum.photos/seed/old/600/400`,after:`https://picsum.photos/seed/new/600/400`,beforeLabel:`Original`,afterLabel:`Retouche`,color:`violet`}),u(t),o(e,t)},$$slots:{default:!0}});var j=i(A,2);m(j,{title:`Couleurs`,description:`La ligne et le handle prennent la couleur choisie.`,code:`<ImageCompare before="/a.jpg" after="/b.jpg" color="red" showLabels={false} rounded="lg" />
<ImageCompare before="/a.jpg" after="/b.jpg" color="violet" showLabels={false} rounded="lg" />`,children:e=>{var t=g();d(t,5,()=>C,l,(e,t)=>{p(e,{get before(){return`https://picsum.photos/seed/cc-${a(t)??``}-a/400/300`},get after(){return`https://picsum.photos/seed/cc-${a(t)??``}-b/400/300`},get color(){return a(t)},beforeLabel:``,afterLabel:``,showLabels:!1,rounded:`lg`})}),u(t),o(e,t)},$$slots:{default:!0}});var M=i(j,2);m(M,{title:`Position initiale`,description:`Definissez ou le slider commence.`,code:`<ImageCompare before="/a.jpg" after="/b.jpg" initialPosition={25} color="blue" />
<ImageCompare before="/a.jpg" after="/b.jpg" initialPosition={50} color="emerald" />
<ImageCompare before="/a.jpg" after="/b.jpg" initialPosition={75} color="pink" />`,children:e=>{var t=_(),n=s(t),r=i(s(n),2);p(r,{before:`https://picsum.photos/seed/pos25a/400/300`,after:`https://picsum.photos/seed/pos25b/400/300`,initialPosition:25,color:`blue`}),u(n);var a=i(n,2),c=i(s(a),2);p(c,{before:`https://picsum.photos/seed/pos50a/400/300`,after:`https://picsum.photos/seed/pos50b/400/300`,initialPosition:50,color:`emerald`}),u(a);var l=i(a,2),d=i(s(l),2);p(d,{before:`https://picsum.photos/seed/pos75a/400/300`,after:`https://picsum.photos/seed/pos75b/400/300`,initialPosition:75,color:`pink`}),u(l),u(t),o(e,t)},$$slots:{default:!0}});var N=i(M,2);m(N,{title:`Vertical`,description:`Le slider se deplace de haut en bas.`,code:`<ImageCompare
  before="/a.jpg"
  after="/b.jpg"
  orientation="vertical"
  beforeLabel="Haut"
  afterLabel="Bas"
  color="cyan"
  rounded="xl"
/>`,children:e=>{var t=v(),n=s(t);p(n,{before:`https://picsum.photos/seed/vert-a/600/400`,after:`https://picsum.photos/seed/vert-b/600/400`,orientation:`vertical`,beforeLabel:`Haut`,afterLabel:`Bas`,color:`cyan`,rounded:`xl`}),u(t),o(e,t)},$$slots:{default:!0}});var P=i(N,2);m(P,{title:`Arrondis`,description:`5 niveaux d'arrondi.`,code:`<ImageCompare before="/a.jpg" after="/b.jpg" rounded="none" showLabels={false} color="violet" />
<ImageCompare before="/a.jpg" after="/b.jpg" rounded="xl" showLabels={false} color="violet" />`,children:e=>{var a=b();d(a,4,()=>[`none`,`sm`,`md`,`lg`,`xl`],l,(e,a)=>{var c=y(),l=s(c),d=r(l,!0),f=i(l,2);p(f,{get before(){return`https://picsum.photos/seed/round-${a??``}-a/200/200`},get after(){return`https://picsum.photos/seed/round-${a??``}-b/200/200`},get rounded(){return a},showLabels:!1,color:`violet`,height:`120px`}),u(c),t(()=>n(d,a)),o(e,c)}),u(a),o(e,a)},$$slots:{default:!0}});var F=i(P,2);m(F,{title:`Sans handle / Sans labels`,description:`Mode minimal avec juste la ligne.`,code:`<ImageCompare before="/a.jpg" after="/b.jpg" showHandle={false} color="emerald" />
<ImageCompare before="/a.jpg" after="/b.jpg" showLabels={false} color="pink" />`,children:e=>{var t=x(),n=s(t),r=i(s(n),2);p(r,{before:`https://picsum.photos/seed/no-handle-a/500/350`,after:`https://picsum.photos/seed/no-handle-b/500/350`,showHandle:!1,color:`emerald`}),u(n);var a=i(n,2),c=i(s(a),2);p(c,{before:`https://picsum.photos/seed/no-labels-a/500/350`,after:`https://picsum.photos/seed/no-labels-b/500/350`,showLabels:!1,color:`pink`}),u(a),u(t),o(e,t)},$$slots:{default:!0}}),o(e,w)}export{C as component};