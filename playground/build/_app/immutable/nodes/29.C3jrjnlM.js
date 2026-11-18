import{A as e,B as t,E as n,G as r,J as i,K as a,L as o,O as s,U as c,W as l,Y as u,b as d,it as f,y as p}from"../chunks/cw37mxrC.js";import{_ as m,t as h}from"../chunks/DTAilj2v.js";import{t as g}from"../chunks/CILZRAmH.js";var _=e(`<!> <p class="text-xs mt-2" style="color: var(--karbon-text-4);"> </p>`,1),v=e(`<div class="space-y-4"><div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Default</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Outline</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Flat</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Minimal</span> <!></div></div>`),y=e(`<div class="space-y-3"></div>`),b=e(`<div class="space-y-4"><div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Small</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Medium</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Large</span> <!></div></div>`),x=e(`<h1 class="text-3xl font-bold mb-2">Pagination</h1> <p class="text-[var(--karbon-text-3)] mb-8">Navigation entre pages avec ellipsis, first/last, variantes et couleurs.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> <!></div> <!> <!> <!> <!> <!> <!> <!>`,1);function S(e){let S=[`red`,`emerald`,`cyan`,`blue`,`violet`,`pink`],C=u(1),w=u(5),T=u(1),E=u(12);var D=x(),O=a(l(D),4),k=a(c(O),2);m(k,{code:`<script lang="ts">
  import { Pagination } from '@karbonjs/ui-svelte'

  let page = $state(1)
<\/script>

<Pagination bind:page total={200} perPage={10} color="violet" />
<Pagination bind:page total={200} perPage={10} variant="outline" color="blue" />
<Pagination page={3} total={200} perPage={10} baseUrl="/articles" />`,language:`svelte`,title:`Example.svelte`,lineCopy:!0}),f(O);var A=a(O,2);g(A,{title:`Basic`,description:`Pagination simple avec bind:page.`,code:`<Pagination
  bind:page={page1}
  total={200}
  perPage={10}
/>`,children:e=>{var c=_(),u=l(c);h(u,{total:200,perPage:10,get page(){return o(C)},set page(e){i(C,e,!0)}});var d=a(u,2),f=r(d);t(()=>n(f,`Page: ${o(C)??``}`)),s(e,c)},$$slots:{default:!0}});var j=a(A,2);g(j,{title:`Variants`,description:`4 variantes visuelles : default, outline, flat, minimal.`,code:`<Pagination bind:page total={500} perPage={10} color="violet" />
<Pagination bind:page total={500} perPage={10} variant="outline" color="violet" />
<Pagination bind:page total={500} perPage={10} variant="flat" color="violet" />
<Pagination bind:page total={500} perPage={10} variant="minimal" color="violet" />`,children:e=>{var t=v(),n=c(t),r=a(c(n),2);h(r,{total:500,perPage:10,color:`violet`,get page(){return o(w)},set page(e){i(w,e,!0)}}),f(n);var l=a(n,2),u=a(c(l),2);h(u,{total:500,perPage:10,variant:`outline`,color:`violet`,get page(){return o(w)},set page(e){i(w,e,!0)}}),f(l);var d=a(l,2),p=a(c(d),2);h(p,{total:500,perPage:10,variant:`flat`,color:`violet`,get page(){return o(w)},set page(e){i(w,e,!0)}}),f(d);var m=a(d,2),g=a(c(m),2);h(g,{total:500,perPage:10,variant:`minimal`,color:`violet`,get page(){return o(w)},set page(e){i(w,e,!0)}}),f(m),f(t),s(e,t)},$$slots:{default:!0}});var M=a(j,2);g(M,{title:`Colors`,description:`6 couleurs disponibles.`,code:`<Pagination page={3} total={100} perPage={10} color="emerald" />
<Pagination page={3} total={100} perPage={10} color="violet" />`,children:e=>{var t=y();p(t,21,()=>S,d,(e,t)=>{h(e,{page:3,total:100,perPage:10,get color(){return o(t)}})}),f(t),s(e,t)},$$slots:{default:!0}});var N=a(M,2);g(N,{title:`Sizes`,description:`3 tailles : sm, md, lg.`,code:`<Pagination bind:page total={150} perPage={10} size="sm" color="emerald" />
<Pagination bind:page total={150} perPage={10} size="md" color="emerald" />
<Pagination bind:page total={150} perPage={10} size="lg" color="emerald" />`,children:e=>{var t=b(),n=c(t),r=a(c(n),2);h(r,{total:150,perPage:10,size:`sm`,color:`emerald`,get page(){return o(T)},set page(e){i(T,e,!0)}}),f(n);var l=a(n,2),u=a(c(l),2);h(u,{total:150,perPage:10,size:`md`,color:`emerald`,get page(){return o(T)},set page(e){i(T,e,!0)}}),f(l);var d=a(l,2),p=a(c(d),2);h(p,{total:150,perPage:10,size:`lg`,color:`emerald`,get page(){return o(T)},set page(e){i(T,e,!0)}}),f(d),f(t),s(e,t)},$$slots:{default:!0}});var P=a(N,2);g(P,{title:`Beaucoup de pages (ellipsis)`,description:`Navigation avec ellipsis pour les grandes listes.`,code:`<Pagination
  bind:page
  total={1000}
  perPage={10}
  color="blue"
  siblings={2}
/>`,children:e=>{var c=_(),u=l(c);h(u,{total:1e3,perPage:10,color:`blue`,siblings:2,get page(){return o(E)},set page(e){i(E,e,!0)}});var d=a(u,2),f=r(d);t(()=>n(f,`Page ${o(E)??``} / 100 — Naviguez pour voir les ellipsis`)),s(e,c)},$$slots:{default:!0}});var F=a(P,2);g(F,{title:`Sans first/last`,description:`Masque les boutons premiere/derniere page.`,code:`<Pagination
  page={3}
  total={200}
  perPage={10}
  showFirstLast={false}
  color="pink"
/>`,children:e=>{h(e,{page:3,total:200,perPage:10,showFirstLast:!1,color:`pink`})},$$slots:{default:!0}});var I=a(F,2);g(I,{title:`Avec liens (SSR)`,description:`Utilise des balises <a> au lieu de <button> pour le SSR/SEO.`,code:`<Pagination
  page={3}
  total={200}
  perPage={10}
  baseUrl="/pagination"
  color="violet"
/>`,children:e=>{h(e,{page:3,total:200,perPage:10,baseUrl:`/pagination`,color:`violet`})},$$slots:{default:!0}}),s(e,D)}export{S as component};