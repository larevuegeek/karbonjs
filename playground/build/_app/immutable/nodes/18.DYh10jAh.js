import{C as e,D as t,H as n,K as r,O as i,P as a,R as o,T as s,U as c,W as l,k as u,ot as d,q as f,st as p,w as m}from"../chunks/8SYn-b8K.js";import"../chunks/xihTtKlq.js";import{F as h,_ as g,p as _}from"../chunks/B_y9JiaV.js";import{t as v}from"../chunks/Gl4F0DQS.js";var y=t(`<p class="text-xs mt-3" style="color:var(--karbon-text-3);">Selection: <strong> </strong></p>`),b=t(`<div class="flex flex-wrap gap-4"><!> <!> <!></div> <!>`,1),x=i(`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg> Options`,1),S=i(`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Mon compte`,1),C=t(`<div class="flex gap-4"><!> <!></div>`),w=t(`<div class="p-2 rounded-lg cursor-pointer transition-colors" style="color:var(--karbon-text-3);background:var(--karbon-bg-card);border:1px solid var(--karbon-border);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></div>`),T=t(`<div class="p-2 rounded-lg cursor-pointer transition-colors" style="color:var(--karbon-text-3);background:var(--karbon-bg-card);border:1px solid var(--karbon-border);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></div>`),E=t(`<div class="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer text-sm font-semibold" style="background:color-mix(in srgb,var(--karbon-violet-500) 15%,transparent);color:var(--karbon-violet-400);">AM</div>`),D=t(`<span class="text-sm underline cursor-pointer" style="color:var(--karbon-text-2);">Plus d'actions</span>`),O=t(`<div class="flex flex-wrap items-center gap-4"><!> <!> <!> <!></div>`),k=t(`<h1 class="text-3xl font-bold mb-2">Dropdown</h1> <p class="text-[var(--karbon-text-3)] mb-10">Menus deroulants avec icones, descriptions, groupes, badges, recherche et keyboard nav.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> <!></div> <!> <!> <!> <!> <!> <!> <!>`,1);function A(t){let i=f(``),A=[{label:`Modifier`,value:`edit`},{label:`Dupliquer`,value:`duplicate`},{label:`Archiver`,value:`archive`},{divider:!0,label:``},{label:`Supprimer`,value:`delete`,danger:!0}],j=[{label:`Modifier`,value:`edit`,icon:`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>`},{label:`Dupliquer`,value:`duplicate`,icon:`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`},{label:`Partager`,value:`share`,icon:`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>`},{divider:!0,label:``},{label:`Supprimer`,value:`delete`,danger:!0,icon:`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`}],M=[{label:`Publier`,value:`publish`,description:`Rendre visible a tous`,icon:`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>`},{label:`Brouillon`,value:`draft`,description:`Sauvegarder sans publier`,icon:`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5z"/><path d="M14 3v4a2 2 0 0 0 2 2h4"/></svg>`},{label:`Planifier`,value:`schedule`,description:`Publier a une date donnee`,icon:`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`}],N=[{label:`Profil`,value:`profile`,group:`Mon compte`},{label:`Parametres`,value:`settings`,group:`Mon compte`},{label:`Factures`,value:`billing`,group:`Mon compte`},{label:`Equipe`,value:`team`,group:`Organisation`},{label:`Projets`,value:`projects`,group:`Organisation`},{divider:!0,label:``},{label:`Deconnexion`,value:`logout`,danger:!0}],P=[{label:`Boite de reception`,value:`inbox`,badge:`12`},{label:`Envoyes`,value:`sent`,badge:`3`},{label:`Brouillons`,value:`drafts`,badge:`1`},{label:`Spam`,value:`spam`,badge:`99+`},{divider:!0,label:``},{label:`Corbeille`,value:`trash`}],F=Array.from({length:20},(e,t)=>({label:`Option ${t+1}`,value:`opt-${t+1}`}));var I=k(),L=l(c(I),4);g(l(n(L),2),{code:`<script lang="ts">
  import { Dropdown, Button } from '@karbonjs/ui-svelte'

  const items = [
    { label: 'Modifier', value: 'edit' },
    { label: 'Dupliquer', value: 'duplicate' },
    { divider: true, label: '' },
    { label: 'Supprimer', value: 'delete', danger: true },
  ]
<\/script>

<Dropdown {items} onselect={(v) => console.log(v)}>
  {#snippet trigger()}
    <Button variant="outline">Actions</Button>
  {/snippet}
</Dropdown>`,language:`svelte`,title:`Example.svelte`,lineCopy:!0}),p(L);var R=l(L,2);v(R,{title:`Basic`,description:`Menu simple avec divider et action danger.`,code:`<Dropdown items={items} onselect={(v) => console.log(v)}>
  {#snippet trigger()}
    <Button variant="outline">Actions</Button>
  {/snippet}
</Dropdown>`,children:t=>{var f=b(),g=c(f),v=n(g);_(v,{get items(){return A},onselect:e=>r(i,e,!0),trigger:e=>{h(e,{variant:`outline`,color:`slate`,children:(e,t)=>{d(),s(e,u(`Actions`))},$$slots:{default:!0}})},$$slots:{trigger:!0}});var x=l(v,2);_(x,{get items(){return A},align:`right`,onselect:e=>r(i,e,!0),trigger:e=>{h(e,{variant:`outline`,color:`slate`,children:(e,t)=>{d(),s(e,u(`Aligne droite`))},$$slots:{default:!0}})},$$slots:{trigger:!0}}),_(l(x,2),{get items(){return A},position:`top`,onselect:e=>r(i,e,!0),trigger:e=>{h(e,{variant:`outline`,color:`slate`,children:(e,t)=>{d(),s(e,u(`Ouvre en haut`))},$$slots:{default:!0}})},$$slots:{trigger:!0}}),p(g);var S=l(g,2),C=e=>{var t=y(),r=l(n(t)),c=n(r,!0);p(r),p(t),o(()=>m(c,a(i))),s(e,t)};e(S,e=>{a(i)&&e(C)}),s(t,f)},$$slots:{default:!0}});var z=l(R,2);v(z,{title:`Avec icones`,description:`Chaque item peut avoir une icone SVG.`,code:`<Dropdown items={[
  { label: 'Modifier', value: 'edit', icon: '<svg>...</svg>' },
  { label: 'Supprimer', value: 'delete', danger: true },
]}>
  {#snippet trigger()}
    <Button>Options</Button>
  {/snippet}
</Dropdown>`,children:e=>{_(e,{get items(){return j},onselect:e=>r(i,e,!0),trigger:e=>{h(e,{variant:`flat`,color:`violet`,children:(e,t)=>{var n=x();d(),s(e,n)},$$slots:{default:!0}})},$$slots:{trigger:!0}})},$$slots:{default:!0}});var B=l(z,2);v(B,{title:`Avec descriptions`,description:`Ajoutez une description sous chaque item pour plus de contexte.`,code:`<Dropdown items={[
  { label: 'Publier', value: 'publish',
    description: 'Rendre visible a tous' },
  { label: 'Brouillon', value: 'draft',
    description: 'Sauvegarder sans publier' },
]} width="18rem">
  {#snippet trigger()}
    <Button>Sauvegarder</Button>
  {/snippet}
</Dropdown>`,children:e=>{_(e,{get items(){return M},width:`18rem`,onselect:e=>r(i,e,!0),trigger:e=>{h(e,{color:`emerald`,children:(e,t)=>{d(),s(e,u(`Sauvegarder`))},$$slots:{default:!0}})},$$slots:{trigger:!0}})},$$slots:{default:!0}});var V=l(B,2);v(V,{title:`Avec groupes`,description:`Organisez les items par sections avec des titres de groupe.`,code:`<Dropdown items={[
  { label: 'Profil', value: 'profile', group: 'Mon compte' },
  { label: 'Equipe', value: 'team', group: 'Organisation' },
  { label: 'Deconnexion', value: 'logout', danger: true },
]}>
  {#snippet trigger()}
    <Button>Mon compte</Button>
  {/snippet}
</Dropdown>`,children:e=>{_(e,{get items(){return N},onselect:e=>r(i,e,!0),trigger:e=>{h(e,{variant:`flat`,children:(e,t)=>{var n=S();d(),s(e,n)},$$slots:{default:!0}})},$$slots:{trigger:!0}})},$$slots:{default:!0}});var H=l(V,2);v(H,{title:`Avec badges`,description:`Compteurs a droite de chaque item.`,code:`<Dropdown items={[
  { label: 'Boite de reception', value: 'inbox', badge: '12' },
  { label: 'Spam', value: 'spam', badge: '99+' },
]} color="blue">
  {#snippet trigger()}
    <Button>Messages</Button>
  {/snippet}
</Dropdown>`,children:e=>{var t=C(),a=n(t);_(a,{get items(){return P},color:`blue`,onselect:e=>r(i,e,!0),trigger:e=>{h(e,{variant:`flat`,color:`blue`,children:(e,t)=>{d(),s(e,u(`Messages`))},$$slots:{default:!0}})},$$slots:{trigger:!0}}),_(l(a,2),{get items(){return P},color:`violet`,onselect:e=>r(i,e,!0),trigger:e=>{h(e,{variant:`flat`,color:`violet`,children:(e,t)=>{d(),s(e,u(`Violet`))},$$slots:{default:!0}})},$$slots:{trigger:!0}}),p(t),s(e,t)},$$slots:{default:!0}});var U=l(H,2);v(U,{title:`Avec recherche`,description:`Barre de recherche integree pour filtrer les items. Ideal pour les longues listes.`,code:`<Dropdown items={longList} searchable width="16rem">
  {#snippet trigger()}
    <Button>20 options</Button>
  {/snippet}
</Dropdown>`,children:e=>{_(e,{get items(){return F},searchable:!0,width:`16rem`,onselect:e=>r(i,e,!0),trigger:e=>{h(e,{variant:`outline`,color:`slate`,children:(e,t)=>{d(),s(e,u(`20 options (recherche)`))},$$slots:{default:!0}})},$$slots:{trigger:!0}})},$$slots:{default:!0}}),v(l(U,2),{title:`Triggers varies`,description:`N'importe quel element peut etre un trigger.`,code:`<Dropdown items={items}>
  {#snippet trigger()}
    <div class="icon-button">...</div>
  {/snippet}
</Dropdown>
<Dropdown items={items}>
  {#snippet trigger()}
    <span class="text-link">Plus d'actions</span>
  {/snippet}
</Dropdown>`,children:e=>{var t=O(),a=n(t);_(a,{get items(){return A},onselect:e=>r(i,e,!0),trigger:e=>{s(e,w())},$$slots:{trigger:!0}});var o=l(a,2);_(o,{get items(){return A},onselect:e=>r(i,e,!0),trigger:e=>{s(e,T())},$$slots:{trigger:!0}});var c=l(o,2);_(c,{get items(){return N},align:`right`,onselect:e=>r(i,e,!0),trigger:e=>{s(e,E())},$$slots:{trigger:!0}}),_(l(c,2),{get items(){return A},onselect:e=>r(i,e,!0),trigger:e=>{s(e,D())},$$slots:{trigger:!0}}),p(t),s(e,t)},$$slots:{default:!0}}),s(t,I)}export{A as component};