import { T as escape_html, a as ensure_array_like, c as stringify } from "../../../chunks/server.js";
import { D as Slider, _ as CodeBlock } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/slider/+page.svelte
function _page($$renderer) {
	const usageCode = `import { Slider } from '@karbonjs/ui-svelte'

<Slider name="volume" label="Volume" bind:value={volume} />
<Slider name="temp" label="Temperature" min={10} max={35} step={0.5} color="red" />
<Slider name="hidden" label="Opacity" showValue={false} value={80} color="violet" />
<Slider name="off" label="Disabled" disabled value={40} />`;
	const colors = [
		"red",
		"orange",
		"amber",
		"yellow",
		"lime",
		"emerald",
		"cyan",
		"blue",
		"violet",
		"pink",
		"slate",
		"zinc"
	];
	let volume = 50;
	let brightness = 75;
	let temperature = 22;
	let $$settled = true;
	let $$inner_renderer;
	function $$render_inner($$renderer) {
		$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Slider</h1> <p class="text-[var(--karbon-text-3)] mb-8">Curseurs de selection avec min/max, step, couleurs et etats.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
		CodeBlock($$renderer, {
			code: usageCode,
			language: "svelte",
			title: "Example.svelte",
			lineCopy: true
		});
		$$renderer.push(`<!----></div> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="max-w-md space-y-6">`);
				Slider($$renderer, {
					name: "basic",
					label: "Volume",
					get value() {
						return volume;
					},
					set value($$value) {
						volume = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				Slider($$renderer, {
					name: "brightness",
					label: "Luminosite",
					color: "amber",
					get value() {
						return brightness;
					},
					set value($$value) {
						brightness = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Basic",
				code: `<Slider name="basic" label="Volume" bind:value={volume} />
<Slider name="brightness" label="Luminosite" bind:value={brightness} color="amber" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="max-w-md space-y-6">`);
				Slider($$renderer, {
					name: "temp",
					label: "Temperature (°C)",
					min: 10,
					max: 35,
					step: .5,
					color: "red",
					get value() {
						return temperature;
					},
					set value($$value) {
						temperature = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				Slider($$renderer, {
					name: "percent",
					label: "Pourcentage",
					min: 0,
					max: 100,
					step: 5,
					value: 60,
					color: "emerald"
				});
				$$renderer.push(`<!----> `);
				Slider($$renderer, {
					name: "range",
					label: "Range (0-1000)",
					min: 0,
					max: 1e3,
					step: 50,
					value: 500,
					color: "blue"
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Min / Max / Step",
				code: `<Slider name="temp" label="Temperature (°C)"
  min={10} max={35} step={0.5} bind:value={temperature} color="red" />
<Slider name="percent" label="Pourcentage"
  min={0} max={100} step={5} value={60} color="emerald" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="max-w-md space-y-4"><!--[-->`);
				const each_array = ensure_array_like(colors);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let color = each_array[$$index];
					Slider($$renderer, {
						name: `color-${stringify(color)}`,
						label: color,
						color,
						value: 50
					});
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Colors",
				code: `<Slider name="color-violet" label="violet" color="violet" value={50} />
<Slider name="color-emerald" label="emerald" color="emerald" value={50} />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="max-w-md">`);
				Slider($$renderer, {
					name: "no-value",
					label: "Slider sans valeur",
					showValue: false,
					value: 30,
					color: "violet"
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Without Value Display",
				code: `<Slider name="no-value" label="Slider sans valeur"
  showValue={false} value={30} color="violet" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="max-w-md">`);
				Slider($$renderer, {
					name: "disabled",
					label: "Desactive",
					disabled: true,
					value: 40
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Disabled",
				code: `<Slider name="disabled" label="Desactive" disabled value={40} />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="max-w-md space-y-4 p-4 rounded-xl border border-[var(--karbon-border)]">`);
				Slider($$renderer, {
					name: "int-volume",
					label: "Volume",
					color: "cyan",
					get value() {
						return volume;
					},
					set value($$value) {
						volume = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				Slider($$renderer, {
					name: "int-brightness",
					label: "Luminosite",
					color: "amber",
					get value() {
						return brightness;
					},
					set value($$value) {
						brightness = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				Slider($$renderer, {
					name: "int-temp",
					label: "Temperature",
					min: 15,
					max: 30,
					step: .5,
					color: "red",
					get value() {
						return temperature;
					},
					set value($$value) {
						temperature = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> <div class="text-xs text-[var(--karbon-text-3)] pt-2 border-t border-[var(--karbon-border)]">Volume: <strong>${escape_html(volume)}</strong> | Luminosite: <strong>${escape_html(brightness)}</strong> | Temp: <strong>${escape_html(temperature)}°C</strong></div></div>`);
			}
			DemoSection($$renderer, {
				title: "Interactive",
				code: `<Slider name="int-volume" label="Volume" bind:value={volume} color="cyan" />
<Slider name="int-brightness" label="Luminosite" bind:value={brightness} color="amber" />
<Slider name="int-temp" label="Temperature"
  min={15} max={30} step={0.5} bind:value={temperature} color="red" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!---->`);
	}
	do {
		$$settled = true;
		$$inner_renderer = $$renderer.copy();
		$$render_inner($$inner_renderer);
	} while (!$$settled);
	$$renderer.subsume($$inner_renderer);
}
//#endregion
export { _page as default };
