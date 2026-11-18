import{A as e,B as t,E as n,J as r,K as i,L as a,M as o,O as s,Q as c,U as l,W as u,Y as d,b as f,it as p,q as m,rt as h,y as g}from"../chunks/cw37mxrC.js";import{C as _,F as v,_ as y}from"../chunks/DTAilj2v.js";import{t as b}from"../chunks/CILZRAmH.js";var x=e(`<!> <!>`,1),S=e(`<div class="flex flex-wrap gap-2"></div>`),C=e(`<div class="text-left space-y-2 text-sm" style="color:var(--karbon-text-2);"><p>L'application demande les permissions suivantes :</p> <ul class="space-y-1.5 pl-4"><li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Acces a la camera</li> <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Acces au microphone</li> <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Acces aux fichiers</li></ul></div>`),w=e(`<div class="flex flex-wrap gap-2"></div> <!>`,1),T=e(`<h1 class="text-3xl font-bold mb-2">Dialog</h1> <p class="text-[var(--karbon-text-3)] mb-8">Boites de dialogue de confirmation avec variantes, input de confirmation et loading.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> <!></div> <!> <!> <!> <!> <!> <!>`,1);function E(e){let E=d(!1),D=d(m({info:!1,warning:!1,danger:!1,success:!1})),O=d(!1),k=d(!1),A=d(!1),j=d(!1),M=d(!1);function N(){r(k,!0),r(M,!0),setTimeout(()=>{r(M,!1),r(k,!1)},2e3)}var P=T(),F=i(u(P),4),I=i(l(F),2);y(I,{code:`<script lang="ts">
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
/>`,language:`svelte`,title:`Example.svelte`,lineCopy:!0}),p(F);var L=i(F,2);b(L,{title:`Basic`,description:`Dialog simple de confirmation.`,code:`<Dialog
  bind:open
  title="Confirmer l'action"
  message="Etes-vous sur de vouloir continuer ?"
  onconfirm={() => open = false}
  oncancel={() => open = false}
/>`,children:e=>{var t=x(),n=u(t);v(n,{onclick:()=>r(E,!0),children:(e,t)=>{h();var n=o(`Ouvrir Dialog`);s(e,n)},$$slots:{default:!0}});var c=i(n,2);_(c,{title:`Confirmer l'action`,message:`Etes-vous sur de vouloir continuer ? Cette action peut etre annulee.`,onconfirm:()=>r(E,!1),oncancel:()=>r(E,!1),get open(){return a(E)},set open(e){r(E,e,!0)}}),s(e,t)},$$slots:{default:!0}});var R=i(L,2);b(R,{title:`Variants`,description:`4 variantes : info, warning, danger, success.`,code:`<Dialog open={open} title="Information" variant="info" />
<Dialog open={open} title="Attention" variant="warning" />
<Dialog open={open} title="Suppression" variant="danger" />
<Dialog open={open} title="Succes" variant="success" />`,children:e=>{var l=S();g(l,20,()=>[`info`,`warning`,`danger`,`success`],f,(e,l)=>{var d=x(),f=u(d);{let e=c(()=>l===`info`?`blue`:l===`warning`?`amber`:l===`danger`?`red`:`emerald`);v(f,{get color(){return a(e)},variant:`flat`,onclick:()=>r(D,{...a(D),[l]:!0},!0),children:(e,r)=>{h();var i=o();t(()=>n(i,l)),s(e,i)},$$slots:{default:!0}})}var p=i(f,2);{let e=c(()=>l===`info`?`Information`:l===`warning`?`Attention`:l===`danger`?`Suppression`:`Succes`),t=c(()=>l===`info`?`Voici une information importante a prendre en compte.`:l===`warning`?`Cette action pourrait avoir des consequences inattendues.`:l===`danger`?`Cette action est irreversible. Toutes les donnees seront perdues.`:`L'operation a ete effectuee avec succes.`),n=c(()=>l===`danger`?`Supprimer`:l===`success`?`Parfait`:`Continuer`);_(p,{get open(){return a(D)[l]},get title(){return a(e)},get message(){return a(t)},get variant(){return l},get confirmLabel(){return a(n)},onconfirm:()=>r(D,{...a(D),[l]:!1},!0),oncancel:()=>r(D,{...a(D),[l]:!1},!0)})}s(e,d)}),p(l),s(e,l)},$$slots:{default:!0}});var z=i(R,2);b(z,{title:`Input de confirmation`,description:`L'utilisateur doit taper un mot pour confirmer.`,code:`<Dialog
  bind:open
  title="Supprimer definitivement"
  variant="danger"
  confirmInput="Supprimer"
  confirmInputLabel="Tapez 'Supprimer' pour confirmer"
/>`,children:e=>{var t=x(),n=u(t);v(n,{color:`red`,variant:`flat`,onclick:()=>r(O,!0),children:(e,t)=>{h();var n=o(`Supprimer le compte`);s(e,n)},$$slots:{default:!0}});var c=i(n,2);_(c,{title:`Supprimer definitivement`,message:`Cette action va supprimer votre compte et toutes les donnees associees. C'est irreversible.`,variant:`danger`,confirmLabel:`Supprimer mon compte`,cancelLabel:`Non, garder mon compte`,confirmInput:`Supprimer`,confirmInputLabel:`Tapez 'Supprimer' pour confirmer`,onconfirm:()=>r(O,!1),oncancel:()=>r(O,!1),get open(){return a(O)},set open(e){r(O,e,!0)}}),s(e,t)},$$slots:{default:!0}});var B=i(z,2);b(B,{title:`Avec loading`,description:`Etat de chargement pendant la confirmation.`,code:`<Dialog
  bind:open
  title="Enregistrement"
  variant="info"
  loading={loadingState}
/>`,children:e=>{var t=x(),n=u(t);v(n,{variant:`flat`,color:`violet`,onclick:N,children:(e,t)=>{h();var n=o(`Avec loading (2s)`);s(e,n)},$$slots:{default:!0}});var c=i(n,2);_(c,{title:`Enregistrement`,message:`Vos modifications vont etre sauvegardees.`,variant:`info`,confirmLabel:`Sauvegarder`,get loading(){return a(M)},onconfirm:()=>{},oncancel:()=>{r(k,!1),r(M,!1)},get open(){return a(k)},set open(e){r(k,e,!0)}}),s(e,t)},$$slots:{default:!0}});var V=i(B,2);b(V,{title:`Contenu custom`,description:`Injectez du contenu riche via le snippet children.`,code:`<Dialog bind:open title="Permissions" variant="warning">
  {#snippet children()}
    <ul>
      <li>Acces a la camera</li>
      <li>Acces au microphone</li>
    </ul>
  {/snippet}
</Dialog>`,children:e=>{var t=x(),n=u(t);v(n,{variant:`flat`,color:`amber`,onclick:()=>r(A,!0),children:(e,t)=>{h();var n=o(`Avec contenu custom`);s(e,n)},$$slots:{default:!0}});var c=i(n,2);_(c,{title:`Permissions requises`,variant:`warning`,confirmLabel:`Autoriser`,onconfirm:()=>r(A,!1),oncancel:()=>r(A,!1),get open(){return a(A)},set open(e){r(A,e,!0)},children:e=>{var t=C();s(e,t)},$$slots:{default:!0}}),s(e,t)},$$slots:{default:!0}});var H=i(V,2);b(H,{title:`Couleur custom`,description:`Utilisez n'importe quelle couleur du theme.`,code:`<Dialog
  bind:open
  title="Publier l'article"
  message="L'article sera visible par tous."
  color="violet"
/>`,children:e=>{var c=w(),l=u(c);g(l,20,()=>[`violet`,`cyan`,`pink`,`emerald`],f,(e,i)=>{v(e,{get color(){return i},variant:`flat`,onclick:()=>r(j,!0),children:(e,r)=>{h();var a=o();t(()=>n(a,i)),s(e,a)},$$slots:{default:!0}})}),p(l);var d=i(l,2);_(d,{title:`Publier l'article`,message:`L'article sera visible par tous les visiteurs du site.`,color:`violet`,confirmLabel:`Publier`,onconfirm:()=>r(j,!1),oncancel:()=>r(j,!1),get open(){return a(j)},set open(e){r(j,e,!0)}}),s(e,c)},$$slots:{default:!0}}),s(e,P)}export{E as component};