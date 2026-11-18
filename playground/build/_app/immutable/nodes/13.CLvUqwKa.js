import{A as e,B as t,E as n,G as r,K as i,L as a,O as o,U as s,W as c,Z as l,b as u,it as d,y as f}from"../chunks/cw37mxrC.js";import"../chunks/DnTe57Jg.js";import{_ as p}from"../chunks/DTAilj2v.js";import{t as m}from"../chunks/CILZRAmH.js";var h=e(`<div class="space-y-6"><!> <!> <!> <!> <!> <!> <!> <!></div>`),g=e(`<div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);"> </span> <!></div>`),_=e(`<div class="space-y-4"></div>`),v=e(`<div class="space-y-3"></div>`),y=e(`<div class="space-y-6"><div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans numeros de ligne</span> <!></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans header</span> <!></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Word wrap</span> <!></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Max height (scroll)</span> <!></div></div>`),b=e(`<div class="space-y-3"><!> <!> <!></div>`),x=e(`<h1 class="text-3xl font-bold mb-2">CodeBlock</h1> <p class="text-[var(--karbon-text-3)] mb-10">Bloc de code avec coloration syntaxique, copier, numeros de ligne et highlight.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> <!></div> <!> <!> <!> <!> <!> <!> <!>`,1);function S(e){let S=[`red`,`emerald`,`cyan`,`blue`,`violet`,`pink`],C=`import { Button, Badge } from '@karbonjs/ui-svelte'

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
fi`;var E=x(),D=i(c(E),4),O=i(s(D),2);p(O,{code:`<script lang="ts">
  import { CodeBlock } from '@karbonjs/ui-svelte'

  const code = \`const greeting = "Hello KarbonJS!"
console.log(greeting)\`
<\/script>

<CodeBlock {code} language="ts" title="example.ts" />
<CodeBlock {code} language="ts" lineCopy highlightLines={[1]} color="violet" />
<CodeBlock code="npm install @karbonjs/ui-svelte" language="bash"
  showLineNumbers={false} title="Installation" />`,language:`svelte`,title:`Example.svelte`,lineCopy:!0}),d(D);var k=i(D,2);m(k,{title:`Langages`,description:`Coloration syntaxique pour JS, TS, Rust, Python, HTML, CSS, SQL et Bash.`,code:`<CodeBlock code={jsCode} language="js" title="utils.js" />
<CodeBlock code={tsCode} language="ts" title="types.ts" />
<CodeBlock code={rustCode} language="rust" title="main.rs" />`,children:e=>{var t=h(),n=s(t);p(n,{code:C,language:`js`,title:`utils.js`});var r=i(n,2);p(r,{code:w,language:`ts`,title:`types.ts`});var a=i(r,2);p(a,{code:`use karbon::http::{App, AppState};
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
}`,language:`rust`,title:`main.rs`});var c=i(a,2);p(c,{code:`import asyncio
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
</div>`,language:`html`,title:`index.html`});var u=i(l,2);p(u,{code:`.card {
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
}`,language:`css`,title:`styles.css`});var f=i(u,2);p(f,{code:`SELECT
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
LIMIT 20;`,language:`sql`,title:`query.sql`});var m=i(f,2);p(m,{code:T,language:`bash`,title:`deploy.sh`}),d(t),o(e,t)},$$slots:{default:!0}});var A=i(k,2);m(A,{title:`Copie par ligne`,description:`Survolez une ligne pour voir le bouton copier apparaitre a droite.`,code:`<CodeBlock code={tsCode} language="ts" title="types.ts" lineCopy />`,children:e=>{p(e,{code:w,language:`ts`,title:`types.ts`,lineCopy:!0})},$$slots:{default:!0}});var j=i(A,2);m(j,{title:`Highlight de lignes`,description:`Mettez en surbrillance des lignes specifiques.`,code:`<CodeBlock code={jsCode} language="js" highlightLines={[4, 5, 6, 12, 13]} color="violet" />`,children:e=>{p(e,{code:C,language:`js`,highlightLines:[4,5,6,12,13],color:`violet`})},$$slots:{default:!0}});var M=i(j,2);m(M,{title:`Variants`,description:`4 variantes : default, bordered, filled, minimal.`,code:`<CodeBlock code={code} language="js" variant="default" />
<CodeBlock code={code} language="js" variant="bordered" color="violet" />
<CodeBlock code={code} language="js" variant="filled" color="violet" />
<CodeBlock code={code} language="js" variant="minimal" color="violet" />`,children:e=>{var a=_();f(a,4,()=>[`default`,`bordered`,`filled`,`minimal`],u,(e,a)=>{var c=g(),l=s(c),u=r(l,!0),f=i(l,2);p(f,{code:`const greeting = "Hello KarbonJS!"
console.log(greeting)`,language:`js`,get variant(){return a},color:`violet`}),d(c),t(()=>n(u,a)),o(e,c)}),d(a),o(e,a)},$$slots:{default:!0}});var N=i(M,2);m(N,{title:`Couleurs`,description:`Accent couleur sur la variante filled.`,code:`<CodeBlock code={code} language="js" color="red" variant="filled" />
<CodeBlock code={code} language="js" color="violet" variant="filled" />`,children:e=>{var t=v();f(t,5,()=>S,u,(e,t)=>{{let n=l(()=>`// Accent ${a(t)}\nconst value = 42`);p(e,{get code(){return a(n)},language:`js`,get color(){return a(t)},variant:`filled`,showLineNumbers:!1})}}),d(t),o(e,t)},$$slots:{default:!0}});var P=i(N,2);m(P,{title:`Options`,description:`Sans numeros de ligne, sans header, word wrap, max height.`,code:`<CodeBlock code={bashCode} language="bash" showLineNumbers={false} />
<CodeBlock code={cmd} language="bash" showLanguage={false} showCopy={false} showLineNumbers={false} />
<CodeBlock code={longCode} language="js" wrap />
<CodeBlock code={code} language="ts" maxHeight="200px" />`,children:e=>{var t=y(),n=s(t),r=i(s(n),2);p(r,{code:T,language:`bash`,showLineNumbers:!1}),d(n);var a=i(n,2),c=i(s(a),2);p(c,{code:`npm install @karbonjs/ui-svelte`,language:`bash`,showLanguage:!1,showCopy:!1,showLineNumbers:!1}),d(a);var l=i(a,2),u=i(s(l),2);p(u,{code:`const longString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."`,language:`js`,wrap:!0}),d(l);var f=i(l,2),m=i(s(f),2);p(m,{code:C+`

`+w,language:`ts`,maxHeight:`200px`}),d(f),d(t),o(e,t)},$$slots:{default:!0}});var F=i(P,2);m(F,{title:`Inline (commande)`,description:`Mode minimal pour afficher une commande ou un snippet court.`,code:`<CodeBlock code="npm install @karbonjs/ui-svelte" language="bash" showLineNumbers={false} showLanguage={false} title="Installation" />`,children:e=>{var t=b(),n=s(t);p(n,{code:`npm install @karbonjs/ui-svelte`,language:`bash`,showLineNumbers:!1,showLanguage:!1,title:`Installation`});var r=i(n,2);p(r,{code:`cargo install karbon-cli`,language:`bash`,showLineNumbers:!1,showLanguage:!1,title:`CLI`});var a=i(r,2);p(a,{code:`import { Button, Badge, Modal } from '@karbonjs/ui-svelte'`,language:`js`,showLineNumbers:!1,title:`Import`}),d(t),o(e,t)},$$slots:{default:!0}}),o(e,E)}export{S as component};