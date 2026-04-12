import { a as ensure_array_like } from "../../../chunks/server.js";
import { P as ButtonBrand, _ as CodeBlock } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/buttonbrand/+page.svelte
function _page($$renderer) {
	const usageCode = `<script lang="ts">
  import { ButtonBrand } from '@karbonjs/ui-svelte'
<\/script>

<ButtonBrand brand="google" />
<ButtonBrand brand="github" variant="outline" />
<ButtonBrand brand="discord" variant="light" />

<!-- Login form -->
<ButtonBrand brand="google" fullWidth shape="pill" variant="outline">
  Se connecter avec Google
</ButtonBrand>

<!-- Icon only -->
<ButtonBrand brand="twitter" iconOnly shape="circle" />`;
	const socialProviders = [
		"google",
		"facebook",
		"apple",
		"microsoft",
		"github",
		"gitlab",
		"twitter",
		"x",
		"discord",
		"slack",
		"linkedin",
		"reddit"
	];
	const mediaProviders = [
		"twitch",
		"youtube",
		"tiktok",
		"instagram",
		"snapchat",
		"pinterest",
		"spotify"
	];
	const streamingProviders = [
		"netflix",
		"disneyplus",
		"hbo",
		"primeVideo",
		"appletv",
		"crunchyroll"
	];
	const gamingProviders = [
		"steam",
		"playstation",
		"xbox",
		"nintendo",
		"epicgames"
	];
	const techProviders = [
		"stripe",
		"paypal",
		"amazon",
		"figma",
		"notion",
		"vercel",
		"netlify"
	];
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">ButtonBrand</h1> <p class="text-[var(--karbon-text-3)] mb-8">Boutons pre-styles pour les fournisseurs OAuth, reseaux sociaux et services.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
	CodeBlock($$renderer, {
		code: usageCode,
		language: "svelte",
		title: "Example.svelte",
		lineCopy: true
	});
	$$renderer.push(`<!----></div> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2 mb-4"><!--[-->`);
			const each_array = ensure_array_like(socialProviders);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let brand = each_array[$$index];
				ButtonBrand($$renderer, { brand });
			}
			$$renderer.push(`<!--]--></div> <div class="flex flex-wrap gap-2 mb-4"><!--[-->`);
			const each_array_1 = ensure_array_like(socialProviders);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let brand = each_array_1[$$index_1];
				ButtonBrand($$renderer, {
					brand,
					variant: "outline"
				});
			}
			$$renderer.push(`<!--]--></div> <div class="flex flex-wrap gap-2"><!--[-->`);
			const each_array_2 = ensure_array_like(socialProviders);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let brand = each_array_2[$$index_2];
				ButtonBrand($$renderer, {
					brand,
					variant: "light"
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Social & Auth",
			description: "Google, Facebook, Apple, GitHub, Discord et plus.",
			code: `<ButtonBrand brand="google" />
<ButtonBrand brand="github" variant="outline" />
<ButtonBrand brand="discord" variant="light" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2 mb-4"><!--[-->`);
			const each_array_3 = ensure_array_like(mediaProviders);
			for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
				let brand = each_array_3[$$index_3];
				ButtonBrand($$renderer, { brand });
			}
			$$renderer.push(`<!--]--></div> <div class="flex flex-wrap gap-2"><!--[-->`);
			const each_array_4 = ensure_array_like(mediaProviders);
			for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
				let brand = each_array_4[$$index_4];
				ButtonBrand($$renderer, {
					brand,
					variant: "outline"
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Media & Entertainment",
			description: "Twitch, YouTube, TikTok, Instagram, Spotify et plus.",
			code: `<ButtonBrand brand="twitch" />
<ButtonBrand brand="youtube" variant="outline" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2 mb-4"><!--[-->`);
			const each_array_5 = ensure_array_like(streamingProviders);
			for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
				let brand = each_array_5[$$index_5];
				ButtonBrand($$renderer, { brand });
			}
			$$renderer.push(`<!--]--></div> <div class="flex flex-wrap gap-2"><!--[-->`);
			const each_array_6 = ensure_array_like(streamingProviders);
			for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
				let brand = each_array_6[$$index_6];
				ButtonBrand($$renderer, {
					brand,
					variant: "outline"
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Streaming TV",
			description: "Netflix, Disney+, HBO, Prime Video et plus.",
			code: `<ButtonBrand brand="netflix" />
<ButtonBrand brand="disneyplus" variant="outline" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2 mb-4"><!--[-->`);
			const each_array_7 = ensure_array_like(gamingProviders);
			for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
				let brand = each_array_7[$$index_7];
				ButtonBrand($$renderer, { brand });
			}
			$$renderer.push(`<!--]--></div> <div class="flex flex-wrap gap-2"><!--[-->`);
			const each_array_8 = ensure_array_like(gamingProviders);
			for (let $$index_8 = 0, $$length = each_array_8.length; $$index_8 < $$length; $$index_8++) {
				let brand = each_array_8[$$index_8];
				ButtonBrand($$renderer, {
					brand,
					variant: "outline"
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Gaming",
			description: "Steam, PlayStation, Xbox, Nintendo, Epic Games.",
			code: `<ButtonBrand brand="steam" />
<ButtonBrand brand="playstation" variant="outline" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2 mb-4"><!--[-->`);
			const each_array_9 = ensure_array_like(techProviders);
			for (let $$index_9 = 0, $$length = each_array_9.length; $$index_9 < $$length; $$index_9++) {
				let brand = each_array_9[$$index_9];
				ButtonBrand($$renderer, { brand });
			}
			$$renderer.push(`<!--]--></div> <div class="flex flex-wrap gap-2"><!--[-->`);
			const each_array_10 = ensure_array_like(techProviders);
			for (let $$index_10 = 0, $$length = each_array_10.length; $$index_10 < $$length; $$index_10++) {
				let brand = each_array_10[$$index_10];
				ButtonBrand($$renderer, {
					brand,
					variant: "outline"
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Tech & Business",
			description: "Stripe, PayPal, Amazon, Figma, Notion, Vercel, Netlify.",
			code: `<ButtonBrand brand="stripe" />
<ButtonBrand brand="figma" variant="outline" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2 mb-4"><!--[-->`);
			const each_array_11 = ensure_array_like(socialProviders);
			for (let $$index_11 = 0, $$length = each_array_11.length; $$index_11 < $$length; $$index_11++) {
				let brand = each_array_11[$$index_11];
				ButtonBrand($$renderer, {
					brand,
					iconOnly: true,
					shape: "circle"
				});
			}
			$$renderer.push(`<!--]--></div> <div class="flex flex-wrap gap-2 mb-4"><!--[-->`);
			const each_array_12 = ensure_array_like(socialProviders);
			for (let $$index_12 = 0, $$length = each_array_12.length; $$index_12 < $$length; $$index_12++) {
				let brand = each_array_12[$$index_12];
				ButtonBrand($$renderer, {
					brand,
					iconOnly: true,
					shape: "circle",
					variant: "outline"
				});
			}
			$$renderer.push(`<!--]--></div> <div class="flex flex-wrap gap-2"><!--[-->`);
			const each_array_13 = ensure_array_like(socialProviders);
			for (let $$index_13 = 0, $$length = each_array_13.length; $$index_13 < $$length; $$index_13++) {
				let brand = each_array_13[$$index_13];
				ButtonBrand($$renderer, {
					brand,
					iconOnly: true,
					shape: "rounded",
					variant: "light"
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Icon Only",
			description: "Mode icone seule avec differentes formes et variantes.",
			code: `<ButtonBrand brand="google" iconOnly shape="circle" />
<ButtonBrand brand="github" iconOnly shape="circle" variant="outline" />
<ButtonBrand brand="discord" iconOnly shape="rounded" variant="light" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap items-end gap-3">`);
			ButtonBrand($$renderer, {
				brand: "google",
				size: "xs"
			});
			$$renderer.push(`<!----> `);
			ButtonBrand($$renderer, {
				brand: "google",
				size: "sm"
			});
			$$renderer.push(`<!----> `);
			ButtonBrand($$renderer, {
				brand: "google",
				size: "md"
			});
			$$renderer.push(`<!----> `);
			ButtonBrand($$renderer, {
				brand: "google",
				size: "lg"
			});
			$$renderer.push(`<!----> `);
			ButtonBrand($$renderer, {
				brand: "google",
				size: "xl"
			});
			$$renderer.push(`<!----> `);
			ButtonBrand($$renderer, {
				brand: "google",
				size: "2xl"
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Sizes",
			description: "De xs a 2xl.",
			code: `<ButtonBrand brand="google" size="xs" />
<ButtonBrand brand="google" size="sm" />
<ButtonBrand brand="google" size="md" />
<ButtonBrand brand="google" size="lg" />
<ButtonBrand brand="google" size="xl" />
<ButtonBrand brand="google" size="2xl" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-3">`);
			ButtonBrand($$renderer, {
				brand: "discord",
				shape: "sharp"
			});
			$$renderer.push(`<!----> `);
			ButtonBrand($$renderer, {
				brand: "discord",
				shape: "soft"
			});
			$$renderer.push(`<!----> `);
			ButtonBrand($$renderer, {
				brand: "discord",
				shape: "rounded"
			});
			$$renderer.push(`<!----> `);
			ButtonBrand($$renderer, {
				brand: "discord",
				shape: "pill"
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Shapes",
			description: "4 formes : sharp, soft, rounded, pill.",
			code: `<ButtonBrand brand="discord" shape="sharp" />
<ButtonBrand brand="discord" shape="soft" />
<ButtonBrand brand="discord" shape="rounded" />
<ButtonBrand brand="discord" shape="pill" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-col gap-2 max-w-xs">`);
			ButtonBrand($$renderer, {
				brand: "google",
				fullWidth: true,
				shape: "pill",
				variant: "outline",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Se connecter avec Google`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			ButtonBrand($$renderer, {
				brand: "facebook",
				fullWidth: true,
				shape: "pill",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Se connecter avec Facebook`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			ButtonBrand($$renderer, {
				brand: "apple",
				fullWidth: true,
				shape: "pill",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Continuer avec Apple`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			ButtonBrand($$renderer, {
				brand: "github",
				fullWidth: true,
				shape: "pill",
				variant: "outline",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Se connecter avec GitHub`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			ButtonBrand($$renderer, {
				brand: "discord",
				fullWidth: true,
				shape: "pill",
				variant: "light",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Rejoindre via Discord`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Cas d'usage — Login",
			description: "Formulaire de connexion avec boutons pleine largeur.",
			code: `<ButtonBrand brand="google" fullWidth shape="pill" variant="outline">Se connecter avec Google</ButtonBrand>
<ButtonBrand brand="facebook" fullWidth shape="pill">Se connecter avec Facebook</ButtonBrand>
<ButtonBrand brand="apple" fullWidth shape="pill">Continuer avec Apple</ButtonBrand>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
