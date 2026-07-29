import{D as e,G as t,H as n,K as r,P as i,R as a,S as o,T as s,U as c,W as l,X as u,k as d,ot as f,q as p,st as m,w as h,x as g}from"../chunks/8SYn-b8K.js";import"../chunks/xihTtKlq.js";import{C as _,F as v,_ as y}from"../chunks/B_y9JiaV.js";import{t as b}from"../chunks/Gl4F0DQS.js";var x=e(`<!> <!>`,1),S=e(`<div class="flex flex-wrap gap-2"></div>`),C=e(`<div class="text-left space-y-2 text-sm" style="color:var(--karbon-text-2);"><p>L'application demande les permissions suivantes :</p> <ul class="space-y-1.5 pl-4"><li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Acces a la camera</li> <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Acces au microphone</li> <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Acces aux fichiers</li></ul></div>`),w=e(`<div class="flex flex-wrap gap-2"></div> <!>`,1),T=e(`<h1 class="text-3xl font-bold mb-2">Dialog</h1> <p class="text-[var(--karbon-text-3)] mb-8">Boites de dialogue de confirmation avec variantes, input de confirmation et loading.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> <!></div> <!> <!> <!> <!> <!> <!>`,1);function E(e){let E=p(!1),D=p(t({info:!1,warning:!1,danger:!1,success:!1})),O=p(!1),k=p(!1),A=p(!1),j=p(!1),M=p(!1);function N(){r(k,!0),r(M,!0),setTimeout(()=>{r(M,!1),r(k,!1)},2e3)}var P=T(),F=l(c(P),4);y(l(n(F),2),{code:`<script lang="ts">
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
/>`,language:`svelte`,title:`Example.svelte`,lineCopy:!0}),m(F);var I=l(F,2);b(I,{title:`Basic`,description:`Dialog simple de confirmation.`,code:`<Dialog
  bind:open
  title="Confirmer l'action"
  message="Etes-vous sur de vouloir continuer ?"
  onconfirm={() => open = false}
  oncancel={() => open = false}
/>`,children:e=>{var t=x(),n=c(t);v(n,{onclick:()=>r(E,!0),children:(e,t)=>{f(),s(e,d(`Ouvrir Dialog`))},$$slots:{default:!0}}),_(l(n,2),{title:`Confirmer l'action`,message:`Etes-vous sur de vouloir continuer ? Cette action peut etre annulee.`,onconfirm:()=>r(E,!1),oncancel:()=>r(E,!1),get open(){return i(E)},set open(e){r(E,e,!0)}}),s(e,t)},$$slots:{default:!0}});var L=l(I,2);b(L,{title:`Variants`,description:`4 variantes : info, warning, danger, success.`,code:`<Dialog open={open} title="Information" variant="info" />
<Dialog open={open} title="Attention" variant="warning" />
<Dialog open={open} title="Suppression" variant="danger" />
<Dialog open={open} title="Succes" variant="success" />`,children:e=>{var t=S();g(t,20,()=>[`info`,`warning`,`danger`,`success`],o,(e,t)=>{var n=x(),o=c(n);{let e=u(()=>t===`info`?`blue`:t===`warning`?`amber`:t===`danger`?`red`:`emerald`);v(o,{get color(){return i(e)},variant:`flat`,onclick:()=>r(D,{...i(D),[t]:!0},!0),children:(e,n)=>{f();var r=d();a(()=>h(r,t)),s(e,r)},$$slots:{default:!0}})}var p=l(o,2);{let e=u(()=>t===`info`?`Information`:t===`warning`?`Attention`:t===`danger`?`Suppression`:`Succes`),n=u(()=>t===`info`?`Voici une information importante a prendre en compte.`:t===`warning`?`Cette action pourrait avoir des consequences inattendues.`:t===`danger`?`Cette action est irreversible. Toutes les donnees seront perdues.`:`L'operation a ete effectuee avec succes.`),a=u(()=>t===`danger`?`Supprimer`:t===`success`?`Parfait`:`Continuer`);_(p,{get open(){return i(D)[t]},get title(){return i(e)},get message(){return i(n)},get variant(){return t},get confirmLabel(){return i(a)},onconfirm:()=>r(D,{...i(D),[t]:!1},!0),oncancel:()=>r(D,{...i(D),[t]:!1},!0)})}s(e,n)}),m(t),s(e,t)},$$slots:{default:!0}});var R=l(L,2);b(R,{title:`Input de confirmation`,description:`L'utilisateur doit taper un mot pour confirmer.`,code:`<Dialog
  bind:open
  title="Supprimer definitivement"
  variant="danger"
  confirmInput="Supprimer"
  confirmInputLabel="Tapez 'Supprimer' pour confirmer"
/>`,children:e=>{var t=x(),n=c(t);v(n,{color:`red`,variant:`flat`,onclick:()=>r(O,!0),children:(e,t)=>{f(),s(e,d(`Supprimer le compte`))},$$slots:{default:!0}}),_(l(n,2),{title:`Supprimer definitivement`,message:`Cette action va supprimer votre compte et toutes les donnees associees. C'est irreversible.`,variant:`danger`,confirmLabel:`Supprimer mon compte`,cancelLabel:`Non, garder mon compte`,confirmInput:`Supprimer`,confirmInputLabel:`Tapez 'Supprimer' pour confirmer`,onconfirm:()=>r(O,!1),oncancel:()=>r(O,!1),get open(){return i(O)},set open(e){r(O,e,!0)}}),s(e,t)},$$slots:{default:!0}});var z=l(R,2);b(z,{title:`Avec loading`,description:`Etat de chargement pendant la confirmation.`,code:`<Dialog
  bind:open
  title="Enregistrement"
  variant="info"
  loading={loadingState}
/>`,children:e=>{var t=x(),n=c(t);v(n,{variant:`flat`,color:`violet`,onclick:N,children:(e,t)=>{f(),s(e,d(`Avec loading (2s)`))},$$slots:{default:!0}}),_(l(n,2),{title:`Enregistrement`,message:`Vos modifications vont etre sauvegardees.`,variant:`info`,confirmLabel:`Sauvegarder`,get loading(){return i(M)},onconfirm:()=>{},oncancel:()=>{r(k,!1),r(M,!1)},get open(){return i(k)},set open(e){r(k,e,!0)}}),s(e,t)},$$slots:{default:!0}});var B=l(z,2);b(B,{title:`Contenu custom`,description:`Injectez du contenu riche via le snippet children.`,code:`<Dialog bind:open title="Permissions" variant="warning">
  {#snippet children()}
    <ul>
      <li>Acces a la camera</li>
      <li>Acces au microphone</li>
    </ul>
  {/snippet}
</Dialog>`,children:e=>{var t=x(),n=c(t);v(n,{variant:`flat`,color:`amber`,onclick:()=>r(A,!0),children:(e,t)=>{f(),s(e,d(`Avec contenu custom`))},$$slots:{default:!0}}),_(l(n,2),{title:`Permissions requises`,variant:`warning`,confirmLabel:`Autoriser`,onconfirm:()=>r(A,!1),oncancel:()=>r(A,!1),get open(){return i(A)},set open(e){r(A,e,!0)},children:e=>{s(e,C())},$$slots:{default:!0}}),s(e,t)},$$slots:{default:!0}}),b(l(B,2),{title:`Couleur custom`,description:`Utilisez n'importe quelle couleur du theme.`,code:`<Dialog
  bind:open
  title="Publier l'article"
  message="L'article sera visible par tous."
  color="violet"
/>`,children:e=>{var t=w(),n=c(t);g(n,20,()=>[`violet`,`cyan`,`pink`,`emerald`],o,(e,t)=>{v(e,{get color(){return t},variant:`flat`,onclick:()=>r(j,!0),children:(e,n)=>{f();var r=d();a(()=>h(r,t)),s(e,r)},$$slots:{default:!0}})}),m(n),_(l(n,2),{title:`Publier l'article`,message:`L'article sera visible par tous les visiteurs du site.`,color:`violet`,confirmLabel:`Publier`,onconfirm:()=>r(j,!1),oncancel:()=>r(j,!1),get open(){return i(j)},set open(e){r(j,e,!0)}}),s(e,t)},$$slots:{default:!0}}),s(e,P)}export{E as component};