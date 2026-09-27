import{$ as e,A as t,D as n,G as r,J as i,K as a,L as o,O as s,T as c,V as l,ct as u,q as d,w as f}from"../chunks/B-3x_64Z.js";import"../chunks/xihTtKlq.js";import"../chunks/BQfviTfZ.js";import{_ as p}from"../chunks/Czp43ix-.js";import{t as m}from"../chunks/uEASi3Rw.js";var h=t(`<div class="space-y-6"><!> <!> <!> <!> <!> <!> <!> <!></div>`),g=t(`<div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);"> </span> <!></div>`),_=t(`<div class="space-y-4"></div>`),v=t(`<div class="space-y-3"></div>`),y=t(`<div class="space-y-6"><div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans numeros de ligne</span> <!></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans header</span> <!></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Word wrap</span> <!></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Max height (scroll)</span> <!></div></div>`),b=t(`<div class="space-y-3"><!> <!> <!></div>`),x=t(`<h1 class="text-3xl font-bold mb-2">CodeBlock</h1> <p class="text-[var(--karbon-text-3)] mb-10">Bloc de code avec coloration syntaxique, copier, numeros de ligne et highlight.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> <!></div> <!> <!> <!> <!> <!> <!> <!>`,1);function S(t){let S=[`red`,`emerald`,`cyan`,`blue`,`violet`,`pink`],C=`import { Button, Badge } from '@karbonjs/ui-svelte'

// Create a reusable component
function UserCard({ name, role, active }) {
  const status = active ? 'online' : 'offline'
  const count = 42

  return {
    name,
    role,
    status,
    greeting: \`Hello \${name}!\`
  }
}

export default UserCard`,w=`interface User {
  id: number
  name: string
  email: string
  roles: string[]
  active: boolean
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/api/users')
  if (!res.ok) throw new Error('Failed')
  return res.json()
}

// Type guard
function isAdmin(user: User): boolean {
  return user.roles.includes('ROLE_ADMIN')
}`,T=`#!/bin/bash
# Deploy script for KarbonJS

set -e

echo "Building project..."
pnpm run build

if [ -d "dist" ]; then
  echo "Deploying to production..."
  rsync -avz --delete dist/ user@server:/var/www/app/
  echo "Deploy complete!"
else
  echo "Error: dist directory not found"
  exit 1
fi`;var E=x(),D=i(a(E),4),O=i(r(D),2);p(O,{code:`<script lang="ts">
  import { CodeBlock } from '@karbonjs/ui-svelte'

  const code = \`const greeting = "Hello KarbonJS!"
console.log(greeting)\`
<\/script>

<CodeBlock {code} language="ts" title="example.ts" />
<CodeBlock {code} language="ts" lineCopy highlightLines={[1]} color="violet" />
<CodeBlock code="npm install @karbonjs/ui-svelte" language="bash"
  showLineNumbers={false} title="Installation" />`,language:`svelte`,title:`Example.svelte`,lineCopy:!0}),u(D);var k=i(D,2);m(k,{title:`Langages`,description:`Coloration syntaxique pour JS, TS, Rust, Python, HTML, CSS, SQL et Bash.`,code:`<CodeBlock code={jsCode} language="js" title="utils.js" />
<CodeBlock code={tsCode} language="ts" title="types.ts" />
<CodeBlock code={rustCode} language="rust" title="main.rs" />`,children:e=>{var t=h(),n=r(t);p(n,{code:C,language:`js`,title:`utils.js`});var a=i(n,2);p(a,{code:w,language:`ts`,title:`types.ts`});var o=i(a,2);p(o,{code:`use karbon::http::{App, AppState};
use axum::{routing::get, Json};
use serde::Serialize;

#[derive(Serialize)]
struct Health {
    status: String,
    version: String,
}

#[karbon::get("/health")]
async fn check() -> Json<Health> {
    Json(Health {
        status: "ok".into(),
        version: env!("CARGO_PKG_VERSION").into(),
    })
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    App::new()
        .router(Router::new().route("/health", get(check)))
        .serve()
        .await
}`,language:`rust`,title:`main.rs`});var c=i(o,2);p(c,{code:`import asyncio
from typing import List, Optional

class DataProcessor:
    """Process and transform data efficiently."""

    def __init__(self, batch_size: int = 100):
        self.batch_size = batch_size
        self.results: List[dict] = []

    async def process(self, items: List[str]) -> List[dict]:
        # Split into batches
        for i in range(0, len(items), self.batch_size):
            batch = items[i:i + self.batch_size]
            result = await self._process_batch(batch)
            self.results.extend(result)

        return self.results

    async def _process_batch(self, batch: List[str]) -> List[dict]:
        return [{"value": item, "length": len(item)} for item in batch]`,language:`python`,title:`processor.py`});var l=i(c,2);p(l,{code:`<div class="card">
  <header class="card-header">
    <h2>Welcome to KarbonJS</h2>
    <p class="subtitle">A modern UI framework</p>
  </header>
  <div class="card-body">
    <img src="/hero.jpg" alt="Hero" loading="lazy" />
    <p>Build beautiful interfaces with ease.</p>
    <a href="/docs" class="btn btn-primary">
      Get Started &rarr;
    </a>
  </div>
  <!-- Footer with links -->
  <footer class="card-footer">
    <span>&copy; 2026 KarbonJS</span>
  </footer>
</div>`,language:`html`,title:`index.html`});var d=i(l,2);p(d,{code:`.card {
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  background: var(--karbon-bg-card);
  border: 1px solid var(--karbon-border);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Dark theme override */
[data-theme="dark"] .card {
  background: #1a1a2e;
  border-color: rgba(255, 255, 255, 0.06);
}`,language:`css`,title:`styles.css`});var f=i(d,2);p(f,{code:`SELECT
  u.id,
  u.username,
  u.email,
  COUNT(c.id) AS article_count,
  MAX(c.created) AS last_article
FROM users u
LEFT JOIN content c ON c.user_id = u.id
WHERE u.active = 1
  AND u.created > '2025-01-01'
GROUP BY u.id, u.username, u.email
HAVING article_count > 5
ORDER BY article_count DESC
LIMIT 20;`,language:`sql`,title:`query.sql`});var m=i(f,2);p(m,{code:T,language:`bash`,title:`deploy.sh`}),u(t),s(e,t)},$$slots:{default:!0}});var A=i(k,2);m(A,{title:`Copie par ligne`,description:`Survolez une ligne pour voir le bouton copier apparaitre a droite.`,code:`<CodeBlock code={tsCode} language="ts" title="types.ts" lineCopy />`,children:e=>{p(e,{code:w,language:`ts`,title:`types.ts`,lineCopy:!0})},$$slots:{default:!0}});var j=i(A,2);m(j,{title:`Highlight de lignes`,description:`Mettez en surbrillance des lignes specifiques.`,code:`<CodeBlock code={jsCode} language="js" highlightLines={[4, 5, 6, 12, 13]} color="violet" />`,children:e=>{p(e,{code:C,language:`js`,highlightLines:[4,5,6,12,13],color:`violet`})},$$slots:{default:!0}});var M=i(j,2);m(M,{title:`Variants`,description:`4 variantes : default, bordered, filled, minimal.`,code:`<CodeBlock code={code} language="js" variant="default" />
<CodeBlock code={code} language="js" variant="bordered" color="violet" />
<CodeBlock code={code} language="js" variant="filled" color="violet" />
<CodeBlock code={code} language="js" variant="minimal" color="violet" />`,children:e=>{var t=_();f(t,4,()=>[`default`,`bordered`,`filled`,`minimal`],c,(e,t)=>{var a=g(),o=r(a),c=d(o,!0),f=i(o,2);p(f,{code:`const greeting = "Hello KarbonJS!"
console.log(greeting)`,language:`js`,get variant(){return t},color:`violet`}),u(a),l(()=>n(c,t)),s(e,a)}),u(t),s(e,t)},$$slots:{default:!0}});var N=i(M,2);m(N,{title:`Couleurs`,description:`Accent couleur sur la variante filled.`,code:`<CodeBlock code={code} language="js" color="red" variant="filled" />
<CodeBlock code={code} language="js" color="violet" variant="filled" />`,children:t=>{var n=v();f(n,5,()=>S,c,(t,n)=>{{let r=e(()=>`// Accent ${o(n)}\nconst value = 42`);p(t,{get code(){return o(r)},language:`js`,get color(){return o(n)},variant:`filled`,showLineNumbers:!1})}}),u(n),s(t,n)},$$slots:{default:!0}});var P=i(N,2);m(P,{title:`Options`,description:`Sans numeros de ligne, sans header, word wrap, max height.`,code:`<CodeBlock code={bashCode} language="bash" showLineNumbers={false} />
<CodeBlock code={cmd} language="bash" showLanguage={false} showCopy={false} showLineNumbers={false} />
<CodeBlock code={longCode} language="js" wrap />
<CodeBlock code={code} language="ts" maxHeight="200px" />`,children:e=>{var t=y(),n=r(t),a=i(r(n),2);p(a,{code:T,language:`bash`,showLineNumbers:!1}),u(n);var o=i(n,2),c=i(r(o),2);p(c,{code:`npm install @karbonjs/ui-svelte`,language:`bash`,showLanguage:!1,showCopy:!1,showLineNumbers:!1}),u(o);var l=i(o,2),d=i(r(l),2);p(d,{code:`const longString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."`,language:`js`,wrap:!0}),u(l);var f=i(l,2),m=i(r(f),2);p(m,{code:C+`

`+w,language:`ts`,maxHeight:`200px`}),u(f),u(t),s(e,t)},$$slots:{default:!0}});var F=i(P,2);m(F,{title:`Inline (commande)`,description:`Mode minimal pour afficher une commande ou un snippet court.`,code:`<CodeBlock code="npm install @karbonjs/ui-svelte" language="bash" showLineNumbers={false} showLanguage={false} title="Installation" />`,children:e=>{var t=b(),n=r(t);p(n,{code:`npm install @karbonjs/ui-svelte`,language:`bash`,showLineNumbers:!1,showLanguage:!1,title:`Installation`});var a=i(n,2);p(a,{code:`cargo install karbon-cli`,language:`bash`,showLineNumbers:!1,showLanguage:!1,title:`CLI`});var o=i(a,2);p(o,{code:`import { Button, Badge, Modal } from '@karbonjs/ui-svelte'`,language:`js`,showLineNumbers:!1,title:`Import`}),u(t),s(e,t)},$$slots:{default:!0}}),s(t,E)}export{S as component};