import{D as e,H as t,K as n,P as r,R as i,S as a,T as o,U as s,W as c,q as l,st as u,w as d,x as f}from"../chunks/8SYn-b8K.js";import"../chunks/xihTtKlq.js";import{_ as p,t as m}from"../chunks/B_y9JiaV.js";import{t as h}from"../chunks/Gl4F0DQS.js";var g=e(`<!> <p class="text-xs mt-2" style="color: var(--karbon-text-4);"> </p>`,1),_=e(`<div class="space-y-4"><div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Default</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Outline</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Flat</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Minimal</span> <!></div></div>`),v=e(`<div class="space-y-3"></div>`),y=e(`<div class="space-y-4"><div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Small</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Medium</span> <!></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Large</span> <!></div></div>`),b=e(`<h1 class="text-3xl font-bold mb-2">Pagination</h1> <p class="text-[var(--karbon-text-3)] mb-8">Navigation entre pages avec ellipsis, first/last, variantes et couleurs.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> <!></div> <!> <!> <!> <!> <!> <!> <!>`,1);function x(e){let x=[`red`,`emerald`,`cyan`,`blue`,`violet`,`pink`],S=l(1),C=l(5),w=l(1),T=l(12);var E=b(),D=c(s(E),4);p(c(t(D),2),{code:`<script lang="ts">
  import { Pagination } from '@karbonjs/ui-svelte'

  let page = $state(1)
<\/script>

<Pagination bind:page total={200} perPage={10} color="violet" />
<Pagination bind:page total={200} perPage={10} variant="outline" color="blue" />
<Pagination page={3} total={200} perPage={10} baseUrl="/articles" />`,language:`svelte`,title:`Example.svelte`,lineCopy:!0}),u(D);var O=c(D,2);h(O,{title:`Basic`,description:`Pagination simple avec bind:page.`,code:`<Pagination
  bind:page={page1}
  total={200}
  perPage={10}
/>`,children:e=>{var a=g(),l=s(a);m(l,{total:200,perPage:10,get page(){return r(S)},set page(e){n(S,e,!0)}});var f=c(l,2),p=t(f);u(f),i(()=>d(p,`Page: ${r(S)??``}`)),o(e,a)},$$slots:{default:!0}});var k=c(O,2);h(k,{title:`Variants`,description:`4 variantes visuelles : default, outline, flat, minimal.`,code:`<Pagination bind:page total={500} perPage={10} color="violet" />
<Pagination bind:page total={500} perPage={10} variant="outline" color="violet" />
<Pagination bind:page total={500} perPage={10} variant="flat" color="violet" />
<Pagination bind:page total={500} perPage={10} variant="minimal" color="violet" />`,children:e=>{var i=_(),a=t(i);m(c(t(a),2),{total:500,perPage:10,color:`violet`,get page(){return r(C)},set page(e){n(C,e,!0)}}),u(a);var s=c(a,2);m(c(t(s),2),{total:500,perPage:10,variant:`outline`,color:`violet`,get page(){return r(C)},set page(e){n(C,e,!0)}}),u(s);var l=c(s,2);m(c(t(l),2),{total:500,perPage:10,variant:`flat`,color:`violet`,get page(){return r(C)},set page(e){n(C,e,!0)}}),u(l);var d=c(l,2);m(c(t(d),2),{total:500,perPage:10,variant:`minimal`,color:`violet`,get page(){return r(C)},set page(e){n(C,e,!0)}}),u(d),u(i),o(e,i)},$$slots:{default:!0}});var A=c(k,2);h(A,{title:`Colors`,description:`6 couleurs disponibles.`,code:`<Pagination page={3} total={100} perPage={10} color="emerald" />
<Pagination page={3} total={100} perPage={10} color="violet" />`,children:e=>{var t=v();f(t,21,()=>x,a,(e,t)=>{m(e,{page:3,total:100,perPage:10,get color(){return r(t)}})}),u(t),o(e,t)},$$slots:{default:!0}});var j=c(A,2);h(j,{title:`Sizes`,description:`3 tailles : sm, md, lg.`,code:`<Pagination bind:page total={150} perPage={10} size="sm" color="emerald" />
<Pagination bind:page total={150} perPage={10} size="md" color="emerald" />
<Pagination bind:page total={150} perPage={10} size="lg" color="emerald" />`,children:e=>{var i=y(),a=t(i);m(c(t(a),2),{total:150,perPage:10,size:`sm`,color:`emerald`,get page(){return r(w)},set page(e){n(w,e,!0)}}),u(a);var s=c(a,2);m(c(t(s),2),{total:150,perPage:10,size:`md`,color:`emerald`,get page(){return r(w)},set page(e){n(w,e,!0)}}),u(s);var l=c(s,2);m(c(t(l),2),{total:150,perPage:10,size:`lg`,color:`emerald`,get page(){return r(w)},set page(e){n(w,e,!0)}}),u(l),u(i),o(e,i)},$$slots:{default:!0}});var M=c(j,2);h(M,{title:`Beaucoup de pages (ellipsis)`,description:`Navigation avec ellipsis pour les grandes listes.`,code:`<Pagination
  bind:page
  total={1000}
  perPage={10}
  color="blue"
  siblings={2}
/>`,children:e=>{var a=g(),l=s(a);m(l,{total:1e3,perPage:10,color:`blue`,siblings:2,get page(){return r(T)},set page(e){n(T,e,!0)}});var f=c(l,2),p=t(f);u(f),i(()=>d(p,`Page ${r(T)??``} / 100 — Naviguez pour voir les ellipsis`)),o(e,a)},$$slots:{default:!0}});var N=c(M,2);h(N,{title:`Sans first/last`,description:`Masque les boutons premiere/derniere page.`,code:`<Pagination
  page={3}
  total={200}
  perPage={10}
  showFirstLast={false}
  color="pink"
/>`,children:e=>{m(e,{page:3,total:200,perPage:10,showFirstLast:!1,color:`pink`})},$$slots:{default:!0}}),h(c(N,2),{title:`Avec liens (SSR)`,description:`Utilise des balises <a> au lieu de <button> pour le SSR/SEO.`,code:`<Pagination
  page={3}
  total={200}
  perPage={10}
  baseUrl="/pagination"
  color="violet"
/>`,children:e=>{m(e,{page:3,total:200,perPage:10,baseUrl:`/pagination`,color:`violet`})},$$slots:{default:!0}}),o(e,E)}export{x as component};