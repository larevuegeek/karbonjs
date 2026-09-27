import{A as e,D as t,G as n,J as r,K as i,L as a,M as o,O as s,T as c,V as l,X as u,Y as d,Z as f,ct as p,et as m,st as h,w as g}from"../chunks/B-3x_64Z.js";import"../chunks/xihTtKlq.js";import{C as _,F as v,_ as y}from"../chunks/Czp43ix-.js";import{t as b}from"../chunks/uEASi3Rw.js";var x=e(`<!> <!>`,1),S=e(`<div class="flex flex-wrap gap-2"></div>`),C=e(`<div class="text-left space-y-2 text-sm" style="color:var(--karbon-text-2);"><p>L'application demande les permissions suivantes :</p> <ul class="space-y-1.5 pl-4"><li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Acces a la camera</li> <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Acces au microphone</li> <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Acces aux fichiers</li></ul></div>`),w=e(`<div class="flex flex-wrap gap-2"></div> <!>`,1),T=e(`<h1 class="text-3xl font-bold mb-2">Dialog</h1> <p class="text-[var(--karbon-text-3)] mb-8">Boites de dialogue de confirmation avec variantes, input de confirmation et loading.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> <!></div> <!> <!> <!> <!> <!> <!>`,1);function E(e){let E=f(!1),D=f(d({info:!1,warning:!1,danger:!1,success:!1})),O=f(!1),k=f(!1),A=f(!1),j=f(!1),M=f(!1);function N(){u(k,!0),u(M,!0),setTimeout(()=>{u(M,!1),u(k,!1)},2e3)}var P=T(),F=r(i(P),4),I=r(n(F),2);y(I,{code:`<script lang="ts">
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
/>`,language:`svelte`,title:`Example.svelte`,lineCopy:!0}),p(F);var L=r(F,2);b(L,{title:`Basic`,description:`Dialog simple de confirmation.`,code:`<Dialog
  bind:open
  title="Confirmer l'action"
  message="Etes-vous sur de vouloir continuer ?"
  onconfirm={() => open = false}
  oncancel={() => open = false}
/>`,children:e=>{var t=x(),n=i(t);v(n,{onclick:()=>u(E,!0),children:(e,t)=>{h();var n=o(`Ouvrir Dialog`);s(e,n)},$$slots:{default:!0}});var c=r(n,2);_(c,{title:`Confirmer l'action`,message:`Etes-vous sur de vouloir continuer ? Cette action peut etre annulee.`,onconfirm:()=>u(E,!1),oncancel:()=>u(E,!1),get open(){return a(E)},set open(e){u(E,e,!0)}}),s(e,t)},$$slots:{default:!0}});var R=r(L,2);b(R,{title:`Variants`,description:`4 variantes : info, warning, danger, success.`,code:`<Dialog open={open} title="Information" variant="info" />
<Dialog open={open} title="Attention" variant="warning" />
<Dialog open={open} title="Suppression" variant="danger" />
<Dialog open={open} title="Succes" variant="success" />`,children:e=>{var n=S();g(n,20,()=>[`info`,`warning`,`danger`,`success`],c,(e,n)=>{var c=x(),d=i(c);{let e=m(()=>n===`info`?`blue`:n===`warning`?`amber`:n===`danger`?`red`:`emerald`);v(d,{get color(){return a(e)},variant:`flat`,onclick:()=>u(D,{...a(D),[n]:!0},!0),children:(e,r)=>{h();var i=o();l(()=>t(i,n)),s(e,i)},$$slots:{default:!0}})}var f=r(d,2);{let e=m(()=>n===`info`?`Information`:n===`warning`?`Attention`:n===`danger`?`Suppression`:`Succes`),t=m(()=>n===`info`?`Voici une information importante a prendre en compte.`:n===`warning`?`Cette action pourrait avoir des consequences inattendues.`:n===`danger`?`Cette action est irreversible. Toutes les donnees seront perdues.`:`L'operation a ete effectuee avec succes.`),r=m(()=>n===`danger`?`Supprimer`:n===`success`?`Parfait`:`Continuer`);_(f,{get open(){return a(D)[n]},get title(){return a(e)},get message(){return a(t)},get variant(){return n},get confirmLabel(){return a(r)},onconfirm:()=>u(D,{...a(D),[n]:!1},!0),oncancel:()=>u(D,{...a(D),[n]:!1},!0)})}s(e,c)}),p(n),s(e,n)},$$slots:{default:!0}});var z=r(R,2);b(z,{title:`Input de confirmation`,description:`L'utilisateur doit taper un mot pour confirmer.`,code:`<Dialog
  bind:open
  title="Supprimer definitivement"
  variant="danger"
  confirmInput="Supprimer"
  confirmInputLabel="Tapez 'Supprimer' pour confirmer"
/>`,children:e=>{var t=x(),n=i(t);v(n,{color:`red`,variant:`flat`,onclick:()=>u(O,!0),children:(e,t)=>{h();var n=o(`Supprimer le compte`);s(e,n)},$$slots:{default:!0}});var c=r(n,2);_(c,{title:`Supprimer definitivement`,message:`Cette action va supprimer votre compte et toutes les donnees associees. C'est irreversible.`,variant:`danger`,confirmLabel:`Supprimer mon compte`,cancelLabel:`Non, garder mon compte`,confirmInput:`Supprimer`,confirmInputLabel:`Tapez 'Supprimer' pour confirmer`,onconfirm:()=>u(O,!1),oncancel:()=>u(O,!1),get open(){return a(O)},set open(e){u(O,e,!0)}}),s(e,t)},$$slots:{default:!0}});var B=r(z,2);b(B,{title:`Avec loading`,description:`Etat de chargement pendant la confirmation.`,code:`<Dialog
  bind:open
  title="Enregistrement"
  variant="info"
  loading={loadingState}
/>`,children:e=>{var t=x(),n=i(t);v(n,{variant:`flat`,color:`violet`,onclick:N,children:(e,t)=>{h();var n=o(`Avec loading (2s)`);s(e,n)},$$slots:{default:!0}});var c=r(n,2);_(c,{title:`Enregistrement`,message:`Vos modifications vont etre sauvegardees.`,variant:`info`,confirmLabel:`Sauvegarder`,get loading(){return a(M)},onconfirm:()=>{},oncancel:()=>{u(k,!1),u(M,!1)},get open(){return a(k)},set open(e){u(k,e,!0)}}),s(e,t)},$$slots:{default:!0}});var V=r(B,2);b(V,{title:`Contenu custom`,description:`Injectez du contenu riche via le snippet children.`,code:`<Dialog bind:open title="Permissions" variant="warning">
  {#snippet children()}
    <ul>
      <li>Acces a la camera</li>
      <li>Acces au microphone</li>
    </ul>
  {/snippet}
</Dialog>`,children:e=>{var t=x(),n=i(t);v(n,{variant:`flat`,color:`amber`,onclick:()=>u(A,!0),children:(e,t)=>{h();var n=o(`Avec contenu custom`);s(e,n)},$$slots:{default:!0}});var c=r(n,2);_(c,{title:`Permissions requises`,variant:`warning`,confirmLabel:`Autoriser`,onconfirm:()=>u(A,!1),oncancel:()=>u(A,!1),get open(){return a(A)},set open(e){u(A,e,!0)},children:e=>{var t=C();s(e,t)},$$slots:{default:!0}}),s(e,t)},$$slots:{default:!0}});var H=r(V,2);b(H,{title:`Couleur custom`,description:`Utilisez n'importe quelle couleur du theme.`,code:`<Dialog
  bind:open
  title="Publier l'article"
  message="L'article sera visible par tous."
  color="violet"
/>`,children:e=>{var n=w(),d=i(n);g(d,20,()=>[`violet`,`cyan`,`pink`,`emerald`],c,(e,n)=>{v(e,{get color(){return n},variant:`flat`,onclick:()=>u(j,!0),children:(e,r)=>{h();var i=o();l(()=>t(i,n)),s(e,i)},$$slots:{default:!0}})}),p(d);var f=r(d,2);_(f,{title:`Publier l'article`,message:`L'article sera visible par tous les visiteurs du site.`,color:`violet`,confirmLabel:`Publier`,onconfirm:()=>u(j,!1),oncancel:()=>u(j,!1),get open(){return a(j)},set open(e){u(j,e,!0)}}),s(e,n)},$$slots:{default:!0}}),s(e,P)}export{E as component};