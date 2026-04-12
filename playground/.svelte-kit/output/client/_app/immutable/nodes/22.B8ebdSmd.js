import{D as e,G as t,P as n,R as r,S as i,T as a,U as o,W as s,st as c,w as l,x as u}from"../chunks/B6-asBX0.js";import"../chunks/BpAyAfhb.js";import"../chunks/C7DS_qHm.js";import{_ as d,h as f}from"../chunks/CW4ffV1m.js";import{t as p}from"../chunks/j70LMsjr.js";var m=e(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!> <!></div>`),h=e(`<div class="grid grid-cols-2 md:grid-cols-3 gap-4"></div>`),g=e(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">25%</span> <!></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">50% (default)</span> <!></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">75%</span> <!></div></div>`),_=e(`<div class="max-w-md"><!></div>`),v=e(`<div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);"> </span> <!></div>`),y=e(`<div class="grid grid-cols-2 md:grid-cols-5 gap-3"></div>`),b=e(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans handle</span> <!></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans labels</span> <!></div></div>`),x=e(`<h1 class="text-3xl font-bold mb-2">ImageCompare</h1> <p class="text-[var(--karbon-text-3)] mb-10">Comparateur d'images avant/apres avec slider, touch support et keyboard nav.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> <!></div> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1);function S(e){let S=[`red`,`emerald`,`cyan`,`blue`,`violet`,`pink`];var C=x(),w=t(s(C),4);d(t(o(w),2),{code:`<script lang="ts">
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
/>`,language:`svelte`,title:`Example.svelte`,lineCopy:!0}),c(w);var T=t(w,2);p(T,{title:`Basic`,description:`Glissez le curseur pour comparer. Fonctionne aussi au touch et au clavier.`,code:`<ImageCompare
  before="/before.jpg"
  after="/after.jpg"
  rounded="xl"
/>`,children:e=>{f(e,{before:`https://picsum.photos/seed/compare-before/800/500`,after:`https://picsum.photos/seed/compare-after/800/500`,rounded:`xl`})},$$slots:{default:!0}});var E=t(T,2);p(E,{title:`Flou → Net`,description:`Meme image : version floue vs version nette. Ideal pour montrer un debruitage ou un upscale IA.`,code:`<ImageCompare
  before="/blur.jpg"
  after="/sharp.jpg"
  beforeLabel="Flou"
  afterLabel="Net"
  color="cyan"
  rounded="xl"
/>`,children:e=>{f(e,{before:`https://picsum.photos/seed/blur-demo/800/500?blur=10`,after:`https://picsum.photos/seed/blur-demo/800/500`,beforeLabel:`Flou`,afterLabel:`Net`,color:`cyan`,rounded:`xl`})},$$slots:{default:!0}});var D=t(E,2);p(D,{title:`Noir & blanc → Couleur`,description:`Comparez une version desaturee et la version couleur.`,code:`<ImageCompare
  before="/grayscale.jpg"
  after="/color.jpg"
  beforeLabel="N&B"
  afterLabel="Couleur"
  color="violet"
  rounded="xl"
/>`,children:e=>{f(e,{before:`https://picsum.photos/seed/bw-demo/800/500?grayscale`,after:`https://picsum.photos/seed/bw-demo/800/500`,beforeLabel:`N&B`,afterLabel:`Couleur`,color:`violet`,rounded:`xl`})},$$slots:{default:!0}});var O=t(D,2);p(O,{title:`Labels custom`,description:`Personnalisez les textes avant/apres.`,code:`<ImageCompare before="/day.jpg" after="/night.jpg" beforeLabel="Jour" afterLabel="Nuit" color="amber" />
<ImageCompare before="/old.jpg" after="/new.jpg" beforeLabel="Original" afterLabel="Retouche" color="violet" />`,children:e=>{var n=m(),r=o(n);f(r,{before:`https://picsum.photos/seed/day/600/400`,after:`https://picsum.photos/seed/night/600/400`,beforeLabel:`Jour`,afterLabel:`Nuit`,color:`amber`}),f(t(r,2),{before:`https://picsum.photos/seed/old/600/400`,after:`https://picsum.photos/seed/new/600/400`,beforeLabel:`Original`,afterLabel:`Retouche`,color:`violet`}),c(n),a(e,n)},$$slots:{default:!0}});var k=t(O,2);p(k,{title:`Couleurs`,description:`La ligne et le handle prennent la couleur choisie.`,code:`<ImageCompare before="/a.jpg" after="/b.jpg" color="red" showLabels={false} rounded="lg" />
<ImageCompare before="/a.jpg" after="/b.jpg" color="violet" showLabels={false} rounded="lg" />`,children:e=>{var t=h();u(t,5,()=>S,i,(e,t)=>{f(e,{get before(){return`https://picsum.photos/seed/cc-${n(t)??``}-a/400/300`},get after(){return`https://picsum.photos/seed/cc-${n(t)??``}-b/400/300`},get color(){return n(t)},beforeLabel:``,afterLabel:``,showLabels:!1,rounded:`lg`})}),c(t),a(e,t)},$$slots:{default:!0}});var A=t(k,2);p(A,{title:`Position initiale`,description:`Definissez ou le slider commence.`,code:`<ImageCompare before="/a.jpg" after="/b.jpg" initialPosition={25} color="blue" />
<ImageCompare before="/a.jpg" after="/b.jpg" initialPosition={50} color="emerald" />
<ImageCompare before="/a.jpg" after="/b.jpg" initialPosition={75} color="pink" />`,children:e=>{var n=g(),r=o(n);f(t(o(r),2),{before:`https://picsum.photos/seed/pos25a/400/300`,after:`https://picsum.photos/seed/pos25b/400/300`,initialPosition:25,color:`blue`}),c(r);var i=t(r,2);f(t(o(i),2),{before:`https://picsum.photos/seed/pos50a/400/300`,after:`https://picsum.photos/seed/pos50b/400/300`,initialPosition:50,color:`emerald`}),c(i);var s=t(i,2);f(t(o(s),2),{before:`https://picsum.photos/seed/pos75a/400/300`,after:`https://picsum.photos/seed/pos75b/400/300`,initialPosition:75,color:`pink`}),c(s),c(n),a(e,n)},$$slots:{default:!0}});var j=t(A,2);p(j,{title:`Vertical`,description:`Le slider se deplace de haut en bas.`,code:`<ImageCompare
  before="/a.jpg"
  after="/b.jpg"
  orientation="vertical"
  beforeLabel="Haut"
  afterLabel="Bas"
  color="cyan"
  rounded="xl"
/>`,children:e=>{var t=_();f(o(t),{before:`https://picsum.photos/seed/vert-a/600/400`,after:`https://picsum.photos/seed/vert-b/600/400`,orientation:`vertical`,beforeLabel:`Haut`,afterLabel:`Bas`,color:`cyan`,rounded:`xl`}),c(t),a(e,t)},$$slots:{default:!0}});var M=t(j,2);p(M,{title:`Arrondis`,description:`5 niveaux d'arrondi.`,code:`<ImageCompare before="/a.jpg" after="/b.jpg" rounded="none" showLabels={false} color="violet" />
<ImageCompare before="/a.jpg" after="/b.jpg" rounded="xl" showLabels={false} color="violet" />`,children:e=>{var n=y();u(n,4,()=>[`none`,`sm`,`md`,`lg`,`xl`],i,(e,n)=>{var i=v(),s=o(i),u=o(s,!0);c(s),f(t(s,2),{get before(){return`https://picsum.photos/seed/round-${n??``}-a/200/200`},get after(){return`https://picsum.photos/seed/round-${n??``}-b/200/200`},get rounded(){return n},showLabels:!1,color:`violet`,height:`120px`}),c(i),r(()=>l(u,n)),a(e,i)}),c(n),a(e,n)},$$slots:{default:!0}}),p(t(M,2),{title:`Sans handle / Sans labels`,description:`Mode minimal avec juste la ligne.`,code:`<ImageCompare before="/a.jpg" after="/b.jpg" showHandle={false} color="emerald" />
<ImageCompare before="/a.jpg" after="/b.jpg" showLabels={false} color="pink" />`,children:e=>{var n=b(),r=o(n);f(t(o(r),2),{before:`https://picsum.photos/seed/no-handle-a/500/350`,after:`https://picsum.photos/seed/no-handle-b/500/350`,showHandle:!1,color:`emerald`}),c(r);var i=t(r,2);f(t(o(i),2),{before:`https://picsum.photos/seed/no-labels-a/500/350`,after:`https://picsum.photos/seed/no-labels-b/500/350`,showLabels:!1,color:`pink`}),c(i),c(n),a(e,n)},$$slots:{default:!0}}),a(e,C)}export{S as component};