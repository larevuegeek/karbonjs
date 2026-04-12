import{D as e,G as t,J as n,P as r,R as i,S as a,T as o,U as s,W as c,q as l,st as u,w as d,x as f}from"../chunks/B6-asBX0.js";import"../chunks/BpAyAfhb.js";import{_ as p,t as m}from"../chunks/CW4ffV1m.js";import{t as h}from"../chunks/j70LMsjr.js";var g=e(`<!> <p class="text-xs mt-2" style="color: var(--karbon-text-4);"> </p>`,1),_=e(`<div class="space-y-4"><div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Default</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Outline</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Flat</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Minimal</span> <!></div></div>`),v=e(`<div class="space-y-3"></div>`),y=e(`<div class="space-y-4"><div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Small</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Medium</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Large</span> <!></div></div>`),b=e(`<!> <p class="text-xs mt-2" style="color: var(--karbon-text-4);"> </p>`,1),x=e(`<h1 class="text-3xl font-bold mb-2">Pagination</h1> <p class="text-[var(--karbon-text-3)] mb-8">Navigation entre pages avec ellipsis, first/last, variantes et couleurs.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> <!></div> <!> <!> <!> <!> <!> <!> <!>`,1);function S(e){let S=[`red`,`emerald`,`cyan`,`blue`,`violet`,`pink`],C=n(1),w=n(5),T=n(1),E=n(12);var D=x(),O=t(c(D),4);p(t(s(O),2),{code:`<script lang="ts">
  import { Pagination } from '@karbonjs/ui-svelte'

  let page = $state(1)
<\/script>

<Pagination bind:page total={200} perPage={10} color="violet" />
<Pagination bind:page total={200} perPage={10} variant="outline" color="blue" />
<Pagination page={3} total={200} perPage={10} baseUrl="/articles" />`,language:`svelte`,title:`Example.svelte`,lineCopy:!0}),u(O);var k=t(O,2);h(k,{title:`Basic`,description:`Pagination simple avec bind:page.`,code:`<Pagination
  bind:page={page1}
  total={200}
  perPage={10}
/>`,children:e=>{var n=g(),a=c(n);m(a,{total:200,perPage:10,get page(){return r(C)},set page(e){l(C,e,!0)}});var f=t(a,2),p=s(f);u(f),i(()=>d(p,`Page: ${r(C)??``}`)),o(e,n)},$$slots:{default:!0}});var A=t(k,2);h(A,{title:`Variants`,description:`4 variantes visuelles : default, outline, flat, minimal.`,code:`<Pagination bind:page total={500} perPage={10} color="violet" />
<Pagination bind:page total={500} perPage={10} variant="outline" color="violet" />
<Pagination bind:page total={500} perPage={10} variant="flat" color="violet" />
<Pagination bind:page total={500} perPage={10} variant="minimal" color="violet" />`,children:e=>{var n=_(),i=s(n);m(t(s(i),2),{total:500,perPage:10,color:`violet`,get page(){return r(w)},set page(e){l(w,e,!0)}}),u(i);var a=t(i,2);m(t(s(a),2),{total:500,perPage:10,variant:`outline`,color:`violet`,get page(){return r(w)},set page(e){l(w,e,!0)}}),u(a);var c=t(a,2);m(t(s(c),2),{total:500,perPage:10,variant:`flat`,color:`violet`,get page(){return r(w)},set page(e){l(w,e,!0)}}),u(c);var d=t(c,2);m(t(s(d),2),{total:500,perPage:10,variant:`minimal`,color:`violet`,get page(){return r(w)},set page(e){l(w,e,!0)}}),u(d),u(n),o(e,n)},$$slots:{default:!0}});var j=t(A,2);h(j,{title:`Colors`,description:`6 couleurs disponibles.`,code:`<Pagination page={3} total={100} perPage={10} color="emerald" />
<Pagination page={3} total={100} perPage={10} color="violet" />`,children:e=>{var t=v();f(t,21,()=>S,a,(e,t)=>{m(e,{page:3,total:100,perPage:10,get color(){return r(t)}})}),u(t),o(e,t)},$$slots:{default:!0}});var M=t(j,2);h(M,{title:`Sizes`,description:`3 tailles : sm, md, lg.`,code:`<Pagination bind:page total={150} perPage={10} size="sm" color="emerald" />
<Pagination bind:page total={150} perPage={10} size="md" color="emerald" />
<Pagination bind:page total={150} perPage={10} size="lg" color="emerald" />`,children:e=>{var n=y(),i=s(n);m(t(s(i),2),{total:150,perPage:10,size:`sm`,color:`emerald`,get page(){return r(T)},set page(e){l(T,e,!0)}}),u(i);var a=t(i,2);m(t(s(a),2),{total:150,perPage:10,size:`md`,color:`emerald`,get page(){return r(T)},set page(e){l(T,e,!0)}}),u(a);var c=t(a,2);m(t(s(c),2),{total:150,perPage:10,size:`lg`,color:`emerald`,get page(){return r(T)},set page(e){l(T,e,!0)}}),u(c),u(n),o(e,n)},$$slots:{default:!0}});var N=t(M,2);h(N,{title:`Beaucoup de pages (ellipsis)`,description:`Navigation avec ellipsis pour les grandes listes.`,code:`<Pagination
  bind:page
  total={1000}
  perPage={10}
  color="blue"
  siblings={2}
/>`,children:e=>{var n=b(),a=c(n);m(a,{total:1e3,perPage:10,color:`blue`,siblings:2,get page(){return r(E)},set page(e){l(E,e,!0)}});var f=t(a,2),p=s(f);u(f),i(()=>d(p,`Page ${r(E)??``} / 100 — Naviguez pour voir les ellipsis`)),o(e,n)},$$slots:{default:!0}});var P=t(N,2);h(P,{title:`Sans first/last`,description:`Masque les boutons premiere/derniere page.`,code:`<Pagination
  page={3}
  total={200}
  perPage={10}
  showFirstLast={false}
  color="pink"
/>`,children:e=>{m(e,{page:3,total:200,perPage:10,showFirstLast:!1,color:`pink`})},$$slots:{default:!0}}),h(t(P,2),{title:`Avec liens (SSR)`,description:`Utilise des balises <a> au lieu de <button> pour le SSR/SEO.`,code:`<Pagination
  page={3}
  total={200}
  perPage={10}
  baseUrl="/pagination"
  color="violet"
/>`,children:e=>{m(e,{page:3,total:200,perPage:10,baseUrl:`/pagination`,color:`violet`})},$$slots:{default:!0}}),o(e,D)}export{S as component};