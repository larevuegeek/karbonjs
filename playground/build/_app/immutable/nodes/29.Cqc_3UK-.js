import{A as e,D as t,G as n,J as r,K as i,L as a,O as o,T as s,V as c,X as l,Z as u,ct as d,q as f,w as p}from"../chunks/B-3x_64Z.js";import"../chunks/xihTtKlq.js";import{_ as m,t as h}from"../chunks/Czp43ix-.js";import{t as g}from"../chunks/uEASi3Rw.js";var _=e(`<!> <p class="text-xs mt-2" style="color: var(--karbon-text-4);"> </p>`,1),v=e(`<div class="space-y-4"><div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Default</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Outline</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Flat</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Minimal</span> <!></div></div>`),y=e(`<div class="space-y-3"></div>`),b=e(`<div class="space-y-4"><div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Small</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Medium</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Large</span> <!></div></div>`),x=e(`<h1 class="text-3xl font-bold mb-2">Pagination</h1> <p class="text-[var(--karbon-text-3)] mb-8">Navigation entre pages avec ellipsis, first/last, variantes et couleurs.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> <!></div> <!> <!> <!> <!> <!> <!> <!>`,1);function S(e){let S=[`red`,`emerald`,`cyan`,`blue`,`violet`,`pink`],C=u(1),w=u(5),T=u(1),E=u(12);var D=x(),O=r(i(D),4),k=r(n(O),2);m(k,{code:`<script lang="ts">
  import { Pagination } from '@karbonjs/ui-svelte'

  let page = $state(1)
<\/script>

<Pagination bind:page total={200} perPage={10} color="violet" />
<Pagination bind:page total={200} perPage={10} variant="outline" color="blue" />
<Pagination page={3} total={200} perPage={10} baseUrl="/articles" />`,language:`svelte`,title:`Example.svelte`,lineCopy:!0}),d(O);var A=r(O,2);g(A,{title:`Basic`,description:`Pagination simple avec bind:page.`,code:`<Pagination
  bind:page={page1}
  total={200}
  perPage={10}
/>`,children:e=>{var n=_(),s=i(n);h(s,{total:200,perPage:10,get page(){return a(C)},set page(e){l(C,e,!0)}});var u=r(s,2),d=f(u);c(()=>t(d,`Page: ${a(C)??``}`)),o(e,n)},$$slots:{default:!0}});var j=r(A,2);g(j,{title:`Variants`,description:`4 variantes visuelles : default, outline, flat, minimal.`,code:`<Pagination bind:page total={500} perPage={10} color="violet" />
<Pagination bind:page total={500} perPage={10} variant="outline" color="violet" />
<Pagination bind:page total={500} perPage={10} variant="flat" color="violet" />
<Pagination bind:page total={500} perPage={10} variant="minimal" color="violet" />`,children:e=>{var t=v(),i=n(t),s=r(n(i),2);h(s,{total:500,perPage:10,color:`violet`,get page(){return a(w)},set page(e){l(w,e,!0)}}),d(i);var c=r(i,2),u=r(n(c),2);h(u,{total:500,perPage:10,variant:`outline`,color:`violet`,get page(){return a(w)},set page(e){l(w,e,!0)}}),d(c);var f=r(c,2),p=r(n(f),2);h(p,{total:500,perPage:10,variant:`flat`,color:`violet`,get page(){return a(w)},set page(e){l(w,e,!0)}}),d(f);var m=r(f,2),g=r(n(m),2);h(g,{total:500,perPage:10,variant:`minimal`,color:`violet`,get page(){return a(w)},set page(e){l(w,e,!0)}}),d(m),d(t),o(e,t)},$$slots:{default:!0}});var M=r(j,2);g(M,{title:`Colors`,description:`6 couleurs disponibles.`,code:`<Pagination page={3} total={100} perPage={10} color="emerald" />
<Pagination page={3} total={100} perPage={10} color="violet" />`,children:e=>{var t=y();p(t,21,()=>S,s,(e,t)=>{h(e,{page:3,total:100,perPage:10,get color(){return a(t)}})}),d(t),o(e,t)},$$slots:{default:!0}});var N=r(M,2);g(N,{title:`Sizes`,description:`3 tailles : sm, md, lg.`,code:`<Pagination bind:page total={150} perPage={10} size="sm" color="emerald" />
<Pagination bind:page total={150} perPage={10} size="md" color="emerald" />
<Pagination bind:page total={150} perPage={10} size="lg" color="emerald" />`,children:e=>{var t=b(),i=n(t),s=r(n(i),2);h(s,{total:150,perPage:10,size:`sm`,color:`emerald`,get page(){return a(T)},set page(e){l(T,e,!0)}}),d(i);var c=r(i,2),u=r(n(c),2);h(u,{total:150,perPage:10,size:`md`,color:`emerald`,get page(){return a(T)},set page(e){l(T,e,!0)}}),d(c);var f=r(c,2),p=r(n(f),2);h(p,{total:150,perPage:10,size:`lg`,color:`emerald`,get page(){return a(T)},set page(e){l(T,e,!0)}}),d(f),d(t),o(e,t)},$$slots:{default:!0}});var P=r(N,2);g(P,{title:`Beaucoup de pages (ellipsis)`,description:`Navigation avec ellipsis pour les grandes listes.`,code:`<Pagination
  bind:page
  total={1000}
  perPage={10}
  color="blue"
  siblings={2}
/>`,children:e=>{var n=_(),s=i(n);h(s,{total:1e3,perPage:10,color:`blue`,siblings:2,get page(){return a(E)},set page(e){l(E,e,!0)}});var u=r(s,2),d=f(u);c(()=>t(d,`Page ${a(E)??``} / 100 — Naviguez pour voir les ellipsis`)),o(e,n)},$$slots:{default:!0}});var F=r(P,2);g(F,{title:`Sans first/last`,description:`Masque les boutons premiere/derniere page.`,code:`<Pagination
  page={3}
  total={200}
  perPage={10}
  showFirstLast={false}
  color="pink"
/>`,children:e=>{h(e,{page:3,total:200,perPage:10,showFirstLast:!1,color:`pink`})},$$slots:{default:!0}});var I=r(F,2);g(I,{title:`Avec liens (SSR)`,description:`Utilise des balises <a> au lieu de <button> pour le SSR/SEO.`,code:`<Pagination
  page={3}
  total={200}
  perPage={10}
  baseUrl="/pagination"
  color="violet"
/>`,children:e=>{h(e,{page:3,total:200,perPage:10,baseUrl:`/pagination`,color:`violet`})},$$slots:{default:!0}}),o(e,D)}export{S as component};