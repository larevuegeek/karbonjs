import { T as escape_html, a as ensure_array_like } from "../../../chunks/server.js";
import { _ as CodeBlock } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/codeblock/+page.svelte
function _page($$renderer) {
	const colors = [
		"red",
		"emerald",
		"cyan",
		"blue",
		"violet",
		"pink"
	];
	const usageCode = `<script lang="ts">
  import { CodeBlock } from '@karbonjs/ui-svelte'

  const code = \`const greeting = "Hello KarbonJS!"
console.log(greeting)\`
<\/script>

<CodeBlock {code} language="ts" title="example.ts" />
<CodeBlock {code} language="ts" lineCopy highlightLines={[1]} color="violet" />
<CodeBlock code="npm install @karbonjs/ui-svelte" language="bash"
  showLineNumbers={false} title="Installation" />`;
	const jsCode = `import { Button, Badge } from '@karbonjs/ui-svelte'

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

export default UserCard`;
	const tsCode = `interface User {
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
}`;
	const rustCode = `use karbon::http::{App, AppState};
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
}`;
	const pythonCode = `import asyncio
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
        return [{"value": item, "length": len(item)} for item in batch]`;
	const htmlCode = `<div class="card">
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
</div>`;
	const cssCode = `.card {
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
}`;
	const sqlCode = `SELECT
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
LIMIT 20;`;
	const bashCode = `#!/bin/bash
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
fi`;
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">CodeBlock</h1> <p class="text-[var(--karbon-text-3)] mb-10">Bloc de code avec coloration syntaxique, copier, numeros de ligne et highlight.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
	CodeBlock($$renderer, {
		code: usageCode,
		language: "svelte",
		title: "Example.svelte",
		lineCopy: true
	});
	$$renderer.push(`<!----></div> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-6">`);
			CodeBlock($$renderer, {
				code: jsCode,
				language: "js",
				title: "utils.js"
			});
			$$renderer.push(`<!----> `);
			CodeBlock($$renderer, {
				code: tsCode,
				language: "ts",
				title: "types.ts"
			});
			$$renderer.push(`<!----> `);
			CodeBlock($$renderer, {
				code: rustCode,
				language: "rust",
				title: "main.rs"
			});
			$$renderer.push(`<!----> `);
			CodeBlock($$renderer, {
				code: pythonCode,
				language: "python",
				title: "processor.py"
			});
			$$renderer.push(`<!----> `);
			CodeBlock($$renderer, {
				code: htmlCode,
				language: "html",
				title: "index.html"
			});
			$$renderer.push(`<!----> `);
			CodeBlock($$renderer, {
				code: cssCode,
				language: "css",
				title: "styles.css"
			});
			$$renderer.push(`<!----> `);
			CodeBlock($$renderer, {
				code: sqlCode,
				language: "sql",
				title: "query.sql"
			});
			$$renderer.push(`<!----> `);
			CodeBlock($$renderer, {
				code: bashCode,
				language: "bash",
				title: "deploy.sh"
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Langages",
			description: "Coloration syntaxique pour JS, TS, Rust, Python, HTML, CSS, SQL et Bash.",
			code: `<CodeBlock code={jsCode} language="js" title="utils.js" />
<CodeBlock code={tsCode} language="ts" title="types.ts" />
<CodeBlock code={rustCode} language="rust" title="main.rs" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			CodeBlock($$renderer, {
				code: tsCode,
				language: "ts",
				title: "types.ts",
				lineCopy: true
			});
		}
		DemoSection($$renderer, {
			title: "Copie par ligne",
			description: "Survolez une ligne pour voir le bouton copier apparaitre a droite.",
			code: `<CodeBlock code={tsCode} language="ts" title="types.ts" lineCopy />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			CodeBlock($$renderer, {
				code: jsCode,
				language: "js",
				highlightLines: [
					4,
					5,
					6,
					12,
					13
				],
				color: "violet"
			});
		}
		DemoSection($$renderer, {
			title: "Highlight de lignes",
			description: "Mettez en surbrillance des lignes specifiques.",
			code: `<CodeBlock code={jsCode} language="js" highlightLines={[4, 5, 6, 12, 13]} color="violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-4"><!--[-->`);
			const each_array = ensure_array_like([
				"default",
				"bordered",
				"filled",
				"minimal"
			]);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let v = each_array[$$index];
				$$renderer.push(`<div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">${escape_html(v)}</span> `);
				CodeBlock($$renderer, {
					code: `const greeting = "Hello KarbonJS!"\nconsole.log(greeting)`,
					language: "js",
					variant: v,
					color: "violet"
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Variants",
			description: "4 variantes : default, bordered, filled, minimal.",
			code: `<CodeBlock code={code} language="js" variant="default" />
<CodeBlock code={code} language="js" variant="bordered" color="violet" />
<CodeBlock code={code} language="js" variant="filled" color="violet" />
<CodeBlock code={code} language="js" variant="minimal" color="violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3"><!--[-->`);
			const each_array_1 = ensure_array_like(colors);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let c = each_array_1[$$index_1];
				CodeBlock($$renderer, {
					code: `// Accent ${c}\nconst value = 42`,
					language: "js",
					color: c,
					variant: "filled",
					showLineNumbers: false
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Couleurs",
			description: "Accent couleur sur la variante filled.",
			code: `<CodeBlock code={code} language="js" color="red" variant="filled" />
<CodeBlock code={code} language="js" color="violet" variant="filled" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-6"><div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans numeros de ligne</span> `);
			CodeBlock($$renderer, {
				code: bashCode,
				language: "bash",
				showLineNumbers: false
			});
			$$renderer.push(`<!----></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans header</span> `);
			CodeBlock($$renderer, {
				code: `npm install @karbonjs/ui-svelte`,
				language: "bash",
				showLanguage: false,
				showCopy: false,
				showLineNumbers: false
			});
			$$renderer.push(`<!----></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Word wrap</span> `);
			CodeBlock($$renderer, {
				code: `const longString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."`,
				language: "js",
				wrap: true
			});
			$$renderer.push(`<!----></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Max height (scroll)</span> `);
			CodeBlock($$renderer, {
				code: jsCode + "\n\n" + tsCode,
				language: "ts",
				maxHeight: "200px"
			});
			$$renderer.push(`<!----></div></div>`);
		}
		DemoSection($$renderer, {
			title: "Options",
			description: "Sans numeros de ligne, sans header, word wrap, max height.",
			code: `<CodeBlock code={bashCode} language="bash" showLineNumbers={false} />
<CodeBlock code={cmd} language="bash" showLanguage={false} showCopy={false} showLineNumbers={false} />
<CodeBlock code={longCode} language="js" wrap />
<CodeBlock code={code} language="ts" maxHeight="200px" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3">`);
			CodeBlock($$renderer, {
				code: "npm install @karbonjs/ui-svelte",
				language: "bash",
				showLineNumbers: false,
				showLanguage: false,
				title: "Installation"
			});
			$$renderer.push(`<!----> `);
			CodeBlock($$renderer, {
				code: "cargo install karbon-cli",
				language: "bash",
				showLineNumbers: false,
				showLanguage: false,
				title: "CLI"
			});
			$$renderer.push(`<!----> `);
			CodeBlock($$renderer, {
				code: `import { Button, Badge, Modal } from '@karbonjs/ui-svelte'`,
				language: "js",
				showLineNumbers: false,
				title: "Import"
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Inline (commande)",
			description: "Mode minimal pour afficher une commande ou un snippet court.",
			code: `<CodeBlock code="npm install @karbonjs/ui-svelte" language="bash" showLineNumbers={false} showLanguage={false} title="Installation" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
