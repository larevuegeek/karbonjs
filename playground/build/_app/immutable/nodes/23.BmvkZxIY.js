import{A as e,D as t,G as n,J as r,K as i,L as a,O as o,T as s,V as c,ct as l,q as u,w as d}from"../chunks/B-3x_64Z.js";import"../chunks/xihTtKlq.js";import"../chunks/BQfviTfZ.js";import{_ as f,h as p}from"../chunks/Czp43ix-.js";import{t as m}from"../chunks/uEASi3Rw.js";var h=e(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!> <!></div>`),g=e(`<div class="grid grid-cols-2 md:grid-cols-3 gap-4"></div>`),_=e(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">25%</span> <!></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">50% (default)</span> <!></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">75%</span> <!></div></div>`),v=e(`<div class="max-w-md"><!></div>`),y=e(`<div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);"> </span> <!></div>`),b=e(`<div class="grid grid-cols-2 md:grid-cols-5 gap-3"></div>`),x=e(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans handle</span> <!></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans labels</span> <!></div></div>`),S=e(`<h1 class="text-3xl font-bold mb-2">ImageCompare</h1> <p class="text-[var(--karbon-text-3)] mb-10">Comparateur d'images avant/apres avec slider, touch support et keyboard nav.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> <!></div> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1);function C(e){let C=[`red`,`emerald`,`cyan`,`blue`,`violet`,`pink`];var w=S(),T=r(i(w),4),E=r(n(T),2);f(E,{code:`<script lang="ts">
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
/>`,language:`svelte`,title:`Example.svelte`,lineCopy:!0}),l(T);var D=r(T,2);m(D,{title:`Basic`,description:`Glissez le curseur pour comparer. Fonctionne aussi au touch et au clavier.`,code:`<ImageCompare
  before="/before.jpg"
  after="/after.jpg"
  rounded="xl"
/>`,children:e=>{p(e,{before:`https://picsum.photos/seed/compare-before/800/500`,after:`https://picsum.photos/seed/compare-after/800/500`,rounded:`xl`})},$$slots:{default:!0}});var O=r(D,2);m(O,{title:`Flou → Net`,description:`Meme image : version floue vs version nette. Ideal pour montrer un debruitage ou un upscale IA.`,code:`<ImageCompare
  before="/blur.jpg"
  after="/sharp.jpg"
  beforeLabel="Flou"
  afterLabel="Net"
  color="cyan"
  rounded="xl"
/>`,children:e=>{p(e,{before:`https://picsum.photos/seed/blur-demo/800/500?blur=10`,after:`https://picsum.photos/seed/blur-demo/800/500`,beforeLabel:`Flou`,afterLabel:`Net`,color:`cyan`,rounded:`xl`})},$$slots:{default:!0}});var k=r(O,2);m(k,{title:`Noir & blanc → Couleur`,description:`Comparez une version desaturee et la version couleur.`,code:`<ImageCompare
  before="/grayscale.jpg"
  after="/color.jpg"
  beforeLabel="N&B"
  afterLabel="Couleur"
  color="violet"
  rounded="xl"
/>`,children:e=>{p(e,{before:`https://picsum.photos/seed/bw-demo/800/500?grayscale`,after:`https://picsum.photos/seed/bw-demo/800/500`,beforeLabel:`N&B`,afterLabel:`Couleur`,color:`violet`,rounded:`xl`})},$$slots:{default:!0}});var A=r(k,2);m(A,{title:`Labels custom`,description:`Personnalisez les textes avant/apres.`,code:`<ImageCompare before="/day.jpg" after="/night.jpg" beforeLabel="Jour" afterLabel="Nuit" color="amber" />
<ImageCompare before="/old.jpg" after="/new.jpg" beforeLabel="Original" afterLabel="Retouche" color="violet" />`,children:e=>{var t=h(),i=n(t);p(i,{before:`https://picsum.photos/seed/day/600/400`,after:`https://picsum.photos/seed/night/600/400`,beforeLabel:`Jour`,afterLabel:`Nuit`,color:`amber`});var a=r(i,2);p(a,{before:`https://picsum.photos/seed/old/600/400`,after:`https://picsum.photos/seed/new/600/400`,beforeLabel:`Original`,afterLabel:`Retouche`,color:`violet`}),l(t),o(e,t)},$$slots:{default:!0}});var j=r(A,2);m(j,{title:`Couleurs`,description:`La ligne et le handle prennent la couleur choisie.`,code:`<ImageCompare before="/a.jpg" after="/b.jpg" color="red" showLabels={false} rounded="lg" />
<ImageCompare before="/a.jpg" after="/b.jpg" color="violet" showLabels={false} rounded="lg" />`,children:e=>{var t=g();d(t,5,()=>C,s,(e,t)=>{p(e,{get before(){return`https://picsum.photos/seed/cc-${a(t)??``}-a/400/300`},get after(){return`https://picsum.photos/seed/cc-${a(t)??``}-b/400/300`},get color(){return a(t)},beforeLabel:``,afterLabel:``,showLabels:!1,rounded:`lg`})}),l(t),o(e,t)},$$slots:{default:!0}});var M=r(j,2);m(M,{title:`Position initiale`,description:`Definissez ou le slider commence.`,code:`<ImageCompare before="/a.jpg" after="/b.jpg" initialPosition={25} color="blue" />
<ImageCompare before="/a.jpg" after="/b.jpg" initialPosition={50} color="emerald" />
<ImageCompare before="/a.jpg" after="/b.jpg" initialPosition={75} color="pink" />`,children:e=>{var t=_(),i=n(t),a=r(n(i),2);p(a,{before:`https://picsum.photos/seed/pos25a/400/300`,after:`https://picsum.photos/seed/pos25b/400/300`,initialPosition:25,color:`blue`}),l(i);var s=r(i,2),c=r(n(s),2);p(c,{before:`https://picsum.photos/seed/pos50a/400/300`,after:`https://picsum.photos/seed/pos50b/400/300`,initialPosition:50,color:`emerald`}),l(s);var u=r(s,2),d=r(n(u),2);p(d,{before:`https://picsum.photos/seed/pos75a/400/300`,after:`https://picsum.photos/seed/pos75b/400/300`,initialPosition:75,color:`pink`}),l(u),l(t),o(e,t)},$$slots:{default:!0}});var N=r(M,2);m(N,{title:`Vertical`,description:`Le slider se deplace de haut en bas.`,code:`<ImageCompare
  before="/a.jpg"
  after="/b.jpg"
  orientation="vertical"
  beforeLabel="Haut"
  afterLabel="Bas"
  color="cyan"
  rounded="xl"
/>`,children:e=>{var t=v(),r=n(t);p(r,{before:`https://picsum.photos/seed/vert-a/600/400`,after:`https://picsum.photos/seed/vert-b/600/400`,orientation:`vertical`,beforeLabel:`Haut`,afterLabel:`Bas`,color:`cyan`,rounded:`xl`}),l(t),o(e,t)},$$slots:{default:!0}});var P=r(N,2);m(P,{title:`Arrondis`,description:`5 niveaux d'arrondi.`,code:`<ImageCompare before="/a.jpg" after="/b.jpg" rounded="none" showLabels={false} color="violet" />
<ImageCompare before="/a.jpg" after="/b.jpg" rounded="xl" showLabels={false} color="violet" />`,children:e=>{var i=b();d(i,4,()=>[`none`,`sm`,`md`,`lg`,`xl`],s,(e,i)=>{var a=y(),s=n(a),d=u(s,!0),f=r(s,2);p(f,{get before(){return`https://picsum.photos/seed/round-${i??``}-a/200/200`},get after(){return`https://picsum.photos/seed/round-${i??``}-b/200/200`},get rounded(){return i},showLabels:!1,color:`violet`,height:`120px`}),l(a),c(()=>t(d,i)),o(e,a)}),l(i),o(e,i)},$$slots:{default:!0}});var F=r(P,2);m(F,{title:`Sans handle / Sans labels`,description:`Mode minimal avec juste la ligne.`,code:`<ImageCompare before="/a.jpg" after="/b.jpg" showHandle={false} color="emerald" />
<ImageCompare before="/a.jpg" after="/b.jpg" showLabels={false} color="pink" />`,children:e=>{var t=x(),i=n(t),a=r(n(i),2);p(a,{before:`https://picsum.photos/seed/no-handle-a/500/350`,after:`https://picsum.photos/seed/no-handle-b/500/350`,showHandle:!1,color:`emerald`}),l(i);var s=r(i,2),c=r(n(s),2);p(c,{before:`https://picsum.photos/seed/no-labels-a/500/350`,after:`https://picsum.photos/seed/no-labels-b/500/350`,showLabels:!1,color:`pink`}),l(s),l(t),o(e,t)},$$slots:{default:!0}}),o(e,w)}export{C as component};