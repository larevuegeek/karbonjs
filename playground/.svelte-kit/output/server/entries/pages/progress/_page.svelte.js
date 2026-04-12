import { T as escape_html, a as ensure_array_like } from "../../../chunks/server.js";
import { F as Button, _ as CodeBlock, s as Progress } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/progress/+page.svelte
function _page($$renderer) {
	const usageCode = `<script lang="ts">
  import { Progress } from '@karbonjs/ui-svelte'
<\/script>

<Progress value={65} color="violet" variant="glow" label="outside" />

<Progress value={45} color="emerald" variant="striped" animated size="lg" />

<Progress value={0} segments={[
  { value: 35, color: 'blue', label: 'Systeme' },
  { value: 25, color: 'violet', label: 'Apps' },
  { value: 15, color: 'amber', label: 'Media' },
]} size="lg" />`;
	const colors = [
		"red",
		"orange",
		"amber",
		"emerald",
		"cyan",
		"blue",
		"violet",
		"pink"
	];
	let animValue = 0;
	let running = false;
	function startAnimation() {
		animValue = 0;
		running = true;
		const interval = setInterval(() => {
			animValue += Math.random() * 8 + 2;
			if (animValue >= 100) {
				animValue = 100;
				running = false;
				clearInterval(interval);
			}
		}, 200);
	}
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Progress</h1> <p class="text-[var(--karbon-text-3)] mb-8">Barres de progression avec variantes, couleurs, tailles, labels et animations.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
	CodeBlock($$renderer, {
		code: usageCode,
		language: "svelte",
		title: "Example.svelte",
		lineCopy: true
	});
	$$renderer.push(`<!----></div> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-4 max-w-lg">`);
			Progress($$renderer, { value: 25 });
			$$renderer.push(`<!----> `);
			Progress($$renderer, { value: 50 });
			$$renderer.push(`<!----> `);
			Progress($$renderer, { value: 75 });
			$$renderer.push(`<!----> `);
			Progress($$renderer, { value: 100 });
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Basic",
			code: `<Progress value={25} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3 max-w-lg"><!--[-->`);
			const each_array = ensure_array_like(colors);
			for (let i = 0, $$length = each_array.length; i < $$length; i++) {
				let c = each_array[i];
				Progress($$renderer, {
					value: 20 + i * 10,
					color: c
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Colors",
			code: `<Progress value={60} color="emerald" />
<Progress value={40} color="violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-4 max-w-lg"><div><span class="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style="color: var(--karbon-text-4);">Default</span> `);
			Progress($$renderer, {
				value: 65,
				color: "violet"
			});
			$$renderer.push(`<!----></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style="color: var(--karbon-text-4);">Striped</span> `);
			Progress($$renderer, {
				value: 65,
				color: "violet",
				variant: "striped"
			});
			$$renderer.push(`<!----></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style="color: var(--karbon-text-4);">Gradient</span> `);
			Progress($$renderer, {
				value: 65,
				color: "violet",
				variant: "gradient"
			});
			$$renderer.push(`<!----></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style="color: var(--karbon-text-4);">Glow</span> `);
			Progress($$renderer, {
				value: 65,
				color: "violet",
				variant: "glow"
			});
			$$renderer.push(`<!----></div></div>`);
		}
		DemoSection($$renderer, {
			title: "Variants",
			code: `<Progress value={65} color="violet" />
<Progress value={65} color="violet" variant="striped" />
<Progress value={65} color="violet" variant="gradient" />
<Progress value={65} color="violet" variant="glow" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-2 max-w-lg"><!--[-->`);
			const each_array_1 = ensure_array_like(colors);
			for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
				let c = each_array_1[i];
				Progress($$renderer, {
					value: 30 + i * 8,
					color: c,
					variant: "striped"
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Striped × Colors",
			code: `<Progress value={50} color="emerald" variant="striped" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3 max-w-lg"><!--[-->`);
			const each_array_2 = ensure_array_like(colors);
			for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
				let c = each_array_2[i];
				Progress($$renderer, {
					value: 30 + i * 8,
					color: c,
					variant: "glow"
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Glow × Colors",
			code: `<Progress value={50} color="violet" variant="glow" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-4 max-w-lg"><!--[-->`);
			const each_array_3 = ensure_array_like([
				"xs",
				"sm",
				"md",
				"lg",
				"xl"
			]);
			for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
				let sz = each_array_3[$$index_3];
				$$renderer.push(`<div><span class="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style="color: var(--karbon-text-4);">${escape_html(sz)}</span> `);
				Progress($$renderer, {
					value: 65,
					color: "emerald",
					size: sz
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Sizes",
			code: `<Progress value={65} color="emerald" size="xs" />
<Progress value={65} color="emerald" size="md" />
<Progress value={65} color="emerald" size="xl" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-5 max-w-lg"><div><span class="text-xs mb-1.5 block" style="color: var(--karbon-text-4);">Outside (default)</span> `);
			Progress($$renderer, {
				value: 65,
				color: "blue",
				label: "outside"
			});
			$$renderer.push(`<!----></div> <div><span class="text-xs mb-1.5 block" style="color: var(--karbon-text-4);">Top</span> `);
			{
				function children($$renderer) {
					$$renderer.push(`<!---->Progression`);
				}
				Progress($$renderer, {
					value: 45,
					color: "violet",
					label: "top",
					children,
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!----></div> <div><span class="text-xs mb-1.5 block" style="color: var(--karbon-text-4);">Inside (lg/xl only)</span> `);
			Progress($$renderer, {
				value: 72,
				color: "emerald",
				label: "inside",
				size: "xl"
			});
			$$renderer.push(`<!----></div> <div><span class="text-xs mb-1.5 block" style="color: var(--karbon-text-4);">Custom format</span> `);
			Progress($$renderer, {
				value: 750,
				max: 1e3,
				color: "cyan",
				label: "outside",
				labelFormat: (v, m) => `${v} / ${m} Mo`
			});
			$$renderer.push(`<!----></div> <div><span class="text-xs mb-1.5 block" style="color: var(--karbon-text-4);">Top + children label</span> `);
			{
				function children($$renderer) {
					$$renderer.push(`<!---->Installation`);
				}
				Progress($$renderer, {
					value: 3,
					max: 5,
					color: "pink",
					label: "top",
					labelFormat: (v, m) => `Etape ${v}/${m}`,
					children,
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!----></div></div>`);
		}
		DemoSection($$renderer, {
			title: "Labels",
			code: "<Progress value={65} color=\"blue\" label=\"outside\" />\n<Progress value={45} color=\"violet\" label=\"top\" />\n<Progress value={72} color=\"emerald\" label=\"inside\" size=\"xl\" />\n<Progress value={750} max={1000} color=\"cyan\" label=\"outside\"\n  labelFormat={(v, m) => `${v} / ${m} Mo`} />",
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3 max-w-lg">`);
			Progress($$renderer, {
				value: 0,
				indeterminate: true,
				color: "violet"
			});
			$$renderer.push(`<!----> `);
			Progress($$renderer, {
				value: 0,
				indeterminate: true,
				color: "emerald",
				variant: "glow"
			});
			$$renderer.push(`<!----> `);
			Progress($$renderer, {
				value: 0,
				indeterminate: true,
				color: "cyan",
				size: "sm"
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Indeterminate",
			code: `<Progress value={0} indeterminate color="violet" />
<Progress value={0} indeterminate color="emerald" variant="glow" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3 max-w-lg">`);
			Progress($$renderer, {
				value: 60,
				color: "violet",
				variant: "striped",
				animated: true
			});
			$$renderer.push(`<!----> `);
			Progress($$renderer, {
				value: 80,
				color: "emerald",
				variant: "striped",
				animated: true
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Striped anime",
			code: `<Progress value={60} color="violet" variant="striped" animated />
<Progress value={80} color="emerald" variant="striped" animated />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-4 max-w-lg"><div><span class="text-xs mb-1 block" style="color: var(--karbon-text-4);">Espace disque</span> `);
			Progress($$renderer, {
				value: 0,
				segments: [
					{
						value: 35,
						color: "blue",
						label: "Systeme"
					},
					{
						value: 25,
						color: "violet",
						label: "Apps"
					},
					{
						value: 15,
						color: "amber",
						label: "Media"
					}
				],
				size: "lg"
			});
			$$renderer.push(`<!----> <div class="flex gap-4 mt-2"><span class="flex items-center gap-1 text-[11px]" style="color: var(--karbon-text-3);"><span class="w-2 h-2 rounded-full" style="background:var(--karbon-blue-500);"></span>Systeme 35%</span> <span class="flex items-center gap-1 text-[11px]" style="color: var(--karbon-text-3);"><span class="w-2 h-2 rounded-full" style="background:var(--karbon-violet-500);"></span>Apps 25%</span> <span class="flex items-center gap-1 text-[11px]" style="color: var(--karbon-text-3);"><span class="w-2 h-2 rounded-full" style="background:var(--karbon-amber-500);"></span>Media 15%</span></div></div> <div><span class="text-xs mb-1 block" style="color: var(--karbon-text-4);">Sondage</span> `);
			Progress($$renderer, {
				value: 0,
				segments: [
					{
						value: 45,
						color: "emerald",
						label: "Pour"
					},
					{
						value: 30,
						color: "red",
						label: "Contre"
					},
					{
						value: 25,
						color: "slate",
						label: "Abstention"
					}
				],
				size: "md"
			});
			$$renderer.push(`<!----></div></div>`);
		}
		DemoSection($$renderer, {
			title: "Multi-segments",
			code: `<Progress value={0} segments={[
  { value: 35, color: 'blue', label: 'Systeme' },
  { value: 25, color: 'violet', label: 'Apps' },
  { value: 15, color: 'amber', label: 'Media' },
]} size="lg" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="max-w-lg">`);
			Button($$renderer, {
				size: "sm",
				variant: "flat",
				color: "violet",
				onclick: startAnimation,
				disabled: running,
				class: "mb-3",
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(running ? "En cours..." : "Demarrer")}`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Progress($$renderer, {
				value: animValue,
				color: "violet",
				variant: "glow",
				label: "outside",
				size: "lg"
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Animation en direct",
			code: `<Button size="sm" onclick={startAnimation}>Demarrer</Button>
<Progress value={animValue} color="violet"
  variant="glow" label="outside" size="lg" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3 max-w-lg"><div><span class="text-xs mb-1 block" style="color: var(--karbon-text-4);">Rounded (default)</span> `);
			Progress($$renderer, {
				value: 65,
				color: "blue",
				shape: "rounded"
			});
			$$renderer.push(`<!----></div> <div><span class="text-xs mb-1 block" style="color: var(--karbon-text-4);">Square</span> `);
			Progress($$renderer, {
				value: 65,
				color: "blue",
				shape: "square"
			});
			$$renderer.push(`<!----></div></div>`);
		}
		DemoSection($$renderer, {
			title: "Shapes",
			code: `<Progress value={65} color="blue" shape="rounded" />
<Progress value={65} color="blue" shape="square" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
