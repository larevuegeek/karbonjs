import{D as e,G as t,J as n,K as r,P as i,R as a,S as o,T as s,U as c,W as l,Z as u,k as d,ot as f,q as p,st as m,w as h,x as g}from"../chunks/B6-asBX0.js";import"../chunks/BpAyAfhb.js";import{C as _,F as v,_ as y}from"../chunks/CW4ffV1m.js";import{t as b}from"../chunks/j70LMsjr.js";var x=e(`<!> <!>`,1),S=e(`<!> <!>`,1),C=e(`<div class="flex flex-wrap gap-2"></div>`),w=e(`<!> <!>`,1),T=e(`<!> <!>`,1),E=e(`<div class="text-left space-y-2 text-sm" style="color:var(--karbon-text-2);"><p>L'application demande les permissions suivantes :</p> <ul class="space-y-1.5 pl-4"><li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Acces a la camera</li> <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Acces au microphone</li> <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Acces aux fichiers</li></ul></div>`),D=e(`<!> <!>`,1),O=e(`<div class="flex flex-wrap gap-2"></div> <!>`,1),k=e(`<h1 class="text-3xl font-bold mb-2">Dialog</h1> <p class="text-[var(--karbon-text-3)] mb-8">Boites de dialogue de confirmation avec variantes, input de confirmation et loading.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> <!></div> <!> <!> <!> <!> <!> <!>`,1);function A(e){let A=n(!1),j=n(r({info:!1,warning:!1,danger:!1,success:!1})),M=n(!1),N=n(!1),P=n(!1),F=n(!1),I=n(!1);function L(){p(N,!0),p(I,!0),setTimeout(()=>{p(I,!1),p(N,!1)},2e3)}var R=k(),z=t(l(R),4);y(t(c(z),2),{code:`<script lang="ts">
  import { Dialog, Button } from '@karbonjs/ui-svelte'

  let open = $state(false)
<\/script>

<Button color="red" onclick={() => open = true}>Supprimer</Button>

<Dialog
  bind:open
  title="Supprimer definitivement"
  message="Cette action est irreversible."
  variant="danger"
  confirmLabel="Supprimer"
  confirmInput="Supprimer"
  confirmInputLabel="Tapez 'Supprimer' pour confirmer"
  onconfirm={() => open = false}
  oncancel={() => open = false}
/>`,language:`svelte`,title:`Example.svelte`,lineCopy:!0}),m(z);var B=t(z,2);b(B,{title:`Basic`,description:`Dialog simple de confirmation.`,code:`<Dialog
  bind:open
  title="Confirmer l'action"
  message="Etes-vous sur de vouloir continuer ?"
  onconfirm={() => open = false}
  oncancel={() => open = false}
/>`,children:e=>{var n=x(),r=l(n);v(r,{onclick:()=>p(A,!0),children:(e,t)=>{f(),s(e,d(`Ouvrir Dialog`))},$$slots:{default:!0}}),_(t(r,2),{title:`Confirmer l'action`,message:`Etes-vous sur de vouloir continuer ? Cette action peut etre annulee.`,onconfirm:()=>p(A,!1),oncancel:()=>p(A,!1),get open(){return i(A)},set open(e){p(A,e,!0)}}),s(e,n)},$$slots:{default:!0}});var V=t(B,2);b(V,{title:`Variants`,description:`4 variantes : info, warning, danger, success.`,code:`<Dialog open={open} title="Information" variant="info" />
<Dialog open={open} title="Attention" variant="warning" />
<Dialog open={open} title="Suppression" variant="danger" />
<Dialog open={open} title="Succes" variant="success" />`,children:e=>{var n=C();g(n,20,()=>[`info`,`warning`,`danger`,`success`],o,(e,n)=>{var r=S(),o=l(r);{let e=u(()=>n===`info`?`blue`:n===`warning`?`amber`:n===`danger`?`red`:`emerald`);v(o,{get color(){return i(e)},variant:`flat`,onclick:()=>p(j,{...i(j),[n]:!0},!0),children:(e,t)=>{f();var r=d();a(()=>h(r,n)),s(e,r)},$$slots:{default:!0}})}var c=t(o,2);{let e=u(()=>n===`info`?`Information`:n===`warning`?`Attention`:n===`danger`?`Suppression`:`Succes`),t=u(()=>n===`info`?`Voici une information importante a prendre en compte.`:n===`warning`?`Cette action pourrait avoir des consequences inattendues.`:n===`danger`?`Cette action est irreversible. Toutes les donnees seront perdues.`:`L'operation a ete effectuee avec succes.`),r=u(()=>n===`danger`?`Supprimer`:n===`success`?`Parfait`:`Continuer`);_(c,{get open(){return i(j)[n]},get title(){return i(e)},get message(){return i(t)},get variant(){return n},get confirmLabel(){return i(r)},onconfirm:()=>p(j,{...i(j),[n]:!1},!0),oncancel:()=>p(j,{...i(j),[n]:!1},!0)})}s(e,r)}),m(n),s(e,n)},$$slots:{default:!0}});var H=t(V,2);b(H,{title:`Input de confirmation`,description:`L'utilisateur doit taper un mot pour confirmer.`,code:`<Dialog
  bind:open
  title="Supprimer definitivement"
  variant="danger"
  confirmInput="Supprimer"
  confirmInputLabel="Tapez 'Supprimer' pour confirmer"
/>`,children:e=>{var n=w(),r=l(n);v(r,{color:`red`,variant:`flat`,onclick:()=>p(M,!0),children:(e,t)=>{f(),s(e,d(`Supprimer le compte`))},$$slots:{default:!0}}),_(t(r,2),{title:`Supprimer definitivement`,message:`Cette action va supprimer votre compte et toutes les donnees associees. C'est irreversible.`,variant:`danger`,confirmLabel:`Supprimer mon compte`,cancelLabel:`Non, garder mon compte`,confirmInput:`Supprimer`,confirmInputLabel:`Tapez 'Supprimer' pour confirmer`,onconfirm:()=>p(M,!1),oncancel:()=>p(M,!1),get open(){return i(M)},set open(e){p(M,e,!0)}}),s(e,n)},$$slots:{default:!0}});var U=t(H,2);b(U,{title:`Avec loading`,description:`Etat de chargement pendant la confirmation.`,code:`<Dialog
  bind:open
  title="Enregistrement"
  variant="info"
  loading={loadingState}
/>`,children:e=>{var n=T(),r=l(n);v(r,{variant:`flat`,color:`violet`,onclick:L,children:(e,t)=>{f(),s(e,d(`Avec loading (2s)`))},$$slots:{default:!0}}),_(t(r,2),{title:`Enregistrement`,message:`Vos modifications vont etre sauvegardees.`,variant:`info`,confirmLabel:`Sauvegarder`,get loading(){return i(I)},onconfirm:()=>{},oncancel:()=>{p(N,!1),p(I,!1)},get open(){return i(N)},set open(e){p(N,e,!0)}}),s(e,n)},$$slots:{default:!0}});var W=t(U,2);b(W,{title:`Contenu custom`,description:`Injectez du contenu riche via le snippet children.`,code:`<Dialog bind:open title="Permissions" variant="warning">
  {#snippet children()}
    <ul>
      <li>Acces a la camera</li>
      <li>Acces au microphone</li>
    </ul>
  {/snippet}
</Dialog>`,children:e=>{var n=D(),r=l(n);v(r,{variant:`flat`,color:`amber`,onclick:()=>p(P,!0),children:(e,t)=>{f(),s(e,d(`Avec contenu custom`))},$$slots:{default:!0}}),_(t(r,2),{title:`Permissions requises`,variant:`warning`,confirmLabel:`Autoriser`,onconfirm:()=>p(P,!1),oncancel:()=>p(P,!1),get open(){return i(P)},set open(e){p(P,e,!0)},children:e=>{s(e,E())},$$slots:{default:!0}}),s(e,n)},$$slots:{default:!0}}),b(t(W,2),{title:`Couleur custom`,description:`Utilisez n'importe quelle couleur du theme.`,code:`<Dialog
  bind:open
  title="Publier l'article"
  message="L'article sera visible par tous."
  color="violet"
/>`,children:e=>{var n=O(),r=l(n);g(r,20,()=>[`violet`,`cyan`,`pink`,`emerald`],o,(e,t)=>{v(e,{get color(){return t},variant:`flat`,onclick:()=>p(F,!0),children:(e,n)=>{f();var r=d();a(()=>h(r,t)),s(e,r)},$$slots:{default:!0}})}),m(r),_(t(r,2),{title:`Publier l'article`,message:`L'article sera visible par tous les visiteurs du site.`,color:`violet`,confirmLabel:`Publier`,onconfirm:()=>p(F,!1),oncancel:()=>p(F,!1),get open(){return i(F)},set open(e){p(F,e,!0)}}),s(e,n)},$$slots:{default:!0}}),s(e,R)}export{A as component};