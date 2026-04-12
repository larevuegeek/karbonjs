import "./index-server.js";
import { C as attr, T as escape_html, a as ensure_array_like, c as stringify, d as html, i as derived, n as attr_style, r as bind_props, t as attr_class, w as clsx } from "./server.js";
import * as si from "simple-icons";
//#region ../packages/ui-svelte/src/button/Button.svelte
function Button($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { variant = "solid", size = "md", color, shape = "rounded", type = "button", disabled = false, loading = false, loadingText = "", arrow = false, fullWidth = false, class: className = "", classes = {}, onclick, children } = $$props;
		const isDisabled = derived(() => disabled || loading);
		function c(shade) {
			return color ? `var(--karbon-${color}-${shade})` : "";
		}
		const pri = derived(() => color ? c(500) : "var(--karbon-primary)");
		const priHover = derived(() => color ? c(600) : "var(--karbon-primary-hover)");
		const priLight = derived(() => color ? c(400) : "var(--karbon-primary)");
		const priFg = derived(() => color ? "white" : "var(--karbon-primary-foreground, white)");
		const style = derived(() => {
			let vars = "";
			switch (variant) {
				case "solid":
					vars = `--kb-bg:${pri()};--kb-bg-h:${priHover()};--kb-c:${priFg()};--kb-c-h:${priFg()};--kb-b:none;--kb-b-h:none;--kb-sh:none;--kb-sh-h:none`;
					break;
				case "flat":
					vars = `--kb-bg:color-mix(in srgb,${pri()} 15%,transparent);--kb-bg-h:color-mix(in srgb,${pri()} 25%,transparent);--kb-c:${priLight()};--kb-c-h:${priLight()};--kb-b:none;--kb-b-h:none;--kb-sh:none;--kb-sh-h:none`;
					break;
				case "bordered":
					vars = `--kb-bg:transparent;--kb-bg-h:color-mix(in srgb,${pri()} 8%,transparent);--kb-c:${priLight()};--kb-c-h:${priLight()};--kb-b:2px solid ${priLight()};--kb-b-h:2px solid ${pri()};--kb-sh:none;--kb-sh-h:none`;
					break;
				case "light":
					vars = `--kb-bg:transparent;--kb-bg-h:color-mix(in srgb,${pri()} 10%,transparent);--kb-c:${priLight()};--kb-c-h:${pri()};--kb-b:none;--kb-b-h:none;--kb-sh:none;--kb-sh-h:none`;
					break;
				case "outline":
					vars = `--kb-bg:transparent;--kb-bg-h:color-mix(in srgb,${pri()} 6%,transparent);--kb-c:${priLight()};--kb-c-h:${priLight()};--kb-b:1px solid color-mix(in srgb,${priLight()} 35%,transparent);--kb-b-h:1px solid ${priLight()};--kb-sh:none;--kb-sh-h:none`;
					break;
				case "ghost":
					vars = color ? `--kb-bg:transparent;--kb-bg-h:color-mix(in srgb,${pri()} 10%,transparent);--kb-c:${priLight()};--kb-c-h:${priLight()};--kb-b:none;--kb-b-h:none;--kb-sh:none;--kb-sh-h:none` : `--kb-bg:transparent;--kb-bg-h:var(--karbon-nav-hover-bg,rgba(255,255,255,0.05));--kb-c:var(--karbon-text-3);--kb-c-h:var(--karbon-text-2);--kb-b:none;--kb-b-h:none;--kb-sh:none;--kb-sh-h:none`;
					break;
				case "shadow":
					vars = `--kb-bg:${pri()};--kb-bg-h:${priHover()};--kb-c:${priFg()};--kb-c-h:${priFg()};--kb-b:none;--kb-b-h:none;--kb-sh:0 4px 14px 0 color-mix(in srgb,${pri()} 40%,transparent);--kb-sh-h:0 6px 20px 0 color-mix(in srgb,${pri()} 55%,transparent)`;
					break;
			}
			return vars;
		});
		const sizeClasses = {
			"2xs": "px-1.5 py-0.5 text-[10px] rounded-sm",
			xs: "px-2.5 py-1 text-xs",
			sm: "px-3 py-1.5 text-sm",
			md: "px-4 py-2 text-sm",
			lg: "px-5 py-2.5 text-base",
			xl: "px-6 py-3 text-base",
			"2xl": "px-8 py-3.5 text-lg",
			"3xl": "px-10 py-4 text-xl"
		};
		$$renderer.push(`<button${attr("type", type)}${attr("disabled", isDisabled(), true)}${attr_style(style())}${attr_class(` karbon-btn inline-flex items-center justify-center gap-2 font-semibold ${stringify({
			sharp: "rounded-none",
			soft: "rounded-md",
			rounded: "rounded-lg",
			pill: "rounded-full",
			circle: "rounded-full"
		}[shape])} transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${stringify(arrow ? "relative overflow-hidden py-3 md:py-3.5 px-8 text-[0.8125rem] md:text-sm" : fullWidth ? "w-full " + sizeClasses[size] : shape === "circle" ? {
			"2xs": "w-5 h-5 text-[10px]",
			xs: "w-7 h-7 text-xs",
			sm: "w-8 h-8 text-sm",
			md: "w-10 h-10 text-sm",
			lg: "w-12 h-12 text-base",
			xl: "w-14 h-14 text-base",
			"2xl": "w-16 h-16 text-lg",
			"3xl": "w-20 h-20 text-xl"
		}[size] : sizeClasses[size])} ${stringify(arrow ? "group" : "")} ${stringify(classes?.root ?? className)} `, "svelte-175e9v")}>`);
		if (arrow) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="flex items-center gap-2 transition-transform duration-300 group-hover:-translate-x-3">`);
			if (loading) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`);
				if (loadingText) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span>${escape_html(loadingText)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			} else {
				$$renderer.push("<!--[-1-->");
				children($$renderer);
				$$renderer.push(`<!---->`);
			}
			$$renderer.push(`<!--]--></span> `);
			if (!loading) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="absolute right-5 flex items-center opacity-0 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else {
			$$renderer.push("<!--[-1-->");
			if (loading) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`);
				if (loadingText) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span>${escape_html(loadingText)}</span>`);
				} else {
					$$renderer.push("<!--[-1-->");
					children($$renderer);
					$$renderer.push(`<!---->`);
				}
				$$renderer.push(`<!--]-->`);
			} else {
				$$renderer.push("<!--[-1-->");
				children($$renderer);
				$$renderer.push(`<!---->`);
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></button>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/button/ButtonBrand.svelte
function ButtonBrand($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { brand, variant = "solid", size = "md", shape = "rounded", type = "button", disabled = false, loading = false, loadingText = "", fullWidth = false, iconOnly = false, class: className = "", classes = {}, onclick, children } = $$props;
		const isDisabled = derived(() => disabled || loading);
		const slugMap = {
			google: "siGoogle",
			facebook: "siFacebook",
			apple: "siApple",
			github: "siGithub",
			gitlab: "siGitlab",
			x: "siX",
			discord: "siDiscord",
			reddit: "siReddit",
			twitch: "siTwitch",
			youtube: "siYoutube",
			tiktok: "siTiktok",
			instagram: "siInstagram",
			snapchat: "siSnapchat",
			pinterest: "siPinterest",
			spotify: "siSpotify",
			netflix: "siNetflix",
			hbo: "siHbomax",
			appletv: "siAppletv",
			crunchyroll: "siCrunchyroll",
			steam: "siSteam",
			playstation: "siPlaystation",
			epicgames: "siEpicgames",
			stripe: "siStripe",
			paypal: "siPaypal",
			figma: "siFigma",
			notion: "siNotion",
			vercel: "siVercel",
			netlify: "siNetlify"
		};
		const fallbackSvg = {
			microsoft: "<rect x=\"1\" y=\"1\" width=\"10\" height=\"10\"/><rect x=\"13\" y=\"1\" width=\"10\" height=\"10\"/><rect x=\"1\" y=\"13\" width=\"10\" height=\"10\"/><rect x=\"13\" y=\"13\" width=\"10\" height=\"10\"/>",
			twitter: "<path d=\"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z\"/>",
			slack: "<path d=\"M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z\"/>",
			linkedin: "<path d=\"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z\"/>",
			disneyplus: "<path d=\"M1.57 8.793c-.192.14-.257.372-.115.588.167.253.488.318.717.14l6.946-5.126c.192-.14.245-.372.091-.588a.52.52 0 0 0-.142-.152.46.46 0 0 0-.575.012zm16.09 2.184c-.68-1.167-1.698-2.146-2.98-2.87-.744-.42-1.565-.742-2.438-.965l1.14-.825c.77-.557 1.052-1.42.68-2.082-.384-.662-1.321-.84-2.091-.283L2.505 10.88c-.77.558-1.052 1.421-.668 2.082.372.65 1.321.84 2.091.283l3.7-2.677c.744.15 1.437.396 2.065.72 1.744.906 2.864 2.478 2.864 4.205 0 2.735-2.812 4.944-6.275 4.944-1.18 0-2.297-.269-3.206-.751a.447.447 0 0 0-.614.163.464.464 0 0 0 .16.63c1.053.558 2.338.87 3.66.87 4.044 0 7.165-2.644 7.165-5.856 0-1.61-.82-3.09-2.184-4.212l2.132-1.543c.128-.093.2-.258.128-.395a.23.23 0 0 0-.064-.082z\"/><circle cx=\"21.5\" cy=\"8.5\" r=\"1.5\"/>",
			primeVideo: "<path d=\"M1.285 11.953C.41 11.665 0 11.143 0 10.445c0-.476.182-.894.545-1.256.364-.362.79-.543 1.28-.543.42 0 .79.13 1.107.39.318.26.554.63.71 1.108l-1.003.38c-.076-.293-.19-.507-.34-.643a.73.73 0 0 0-.498-.203.783.783 0 0 0-.56.227.757.757 0 0 0-.235.564c0 .372.236.665.708.879zm4.638-2.558L8.17 9.22c-.158-.39-.37-.675-.635-.857a1.501 1.501 0 0 0-.88-.273c-.56 0-1.03.21-1.413.627-.384.419-.575.94-.575 1.563 0 .614.188 1.124.563 1.53.375.406.847.61 1.416.61.36 0 .672-.1.937-.297.265-.198.48-.5.645-.91l-2.23-.173.15-.886h3.38l-.006.115c-.058.846-.34 1.534-.845 2.063-.505.53-1.15.794-1.935.794-.866 0-1.582-.3-2.148-.9-.566-.6-.85-1.366-.85-2.299 0-.95.295-1.73.884-2.342.589-.611 1.327-.917 2.214-.917.646 0 1.2.166 1.665.498.464.332.8.81 1.007 1.434z\" transform=\"translate(4 2) scale(1.2)\"/>",
			amazon: "<path d=\"M.045 18.02c.072-.116.187-.124.348-.024 2.862 1.773 6.093 2.66 9.693 2.66 2.602 0 5.145-.588 7.63-1.764.366-.173.674-.244.92-.211.246.032.373.171.381.415.007.244-.105.46-.337.647-.232.187-.586.424-1.062.71a16.87 16.87 0 0 1-2.742 1.279 16.76 16.76 0 0 1-5.028 1.025c-3.455.06-6.543-.88-9.262-2.822-.21-.153-.262-.308-.157-.467l.373-.448zm13.514-3.533c-.152-.195-.296-.151-.433.133-.137.284-.18.574-.13.87.05.294.207.523.47.685a9.532 9.532 0 0 0 1.768.887c1.032.39 1.69.642 1.976.755.286.113.462.183.53.21.264.1.503.122.717.062.213-.06.32-.222.32-.486v-.14c0-.41-.154-.78-.463-1.112-.31-.33-.765-.626-1.369-.886-.604-.26-1.024-.438-1.26-.534a17.86 17.86 0 0 0-2.127-.443z\"/>",
			xbox: "<path d=\"M6.97 3.846c-.987.567-1.878 1.323-2.604 2.222C2.9 8.088 2.3 10.6 2.9 12.87c.438 1.655 1.47 3.106 2.873 4.072.182-.22 1.263-1.685 3.243-4.593 1.78-2.613 2.282-3.64 2.282-4.282 0-.415-.106-.739-.354-1.175-.622-1.094-1.79-2.156-3.098-2.838-.287-.15-.598-.29-.876-.208zM12 2.04c-1.076 0-2.122.192-3.106.547 1.524.81 2.9 2.07 3.674 3.362.33.552.514 1.106.514 1.775 0 .97-.465 2.046-2.452 4.975-1.734 2.557-2.862 4.153-3.318 4.744.66.384 1.31.59 2.128.722.684.11 1.483.066 2.142-.052 2.688-.48 4.81-2.35 5.678-4.933.737-2.193.414-4.698-.88-6.737A7.893 7.893 0 0 0 12 2.04z\"/><path d=\"M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 1.2c5.934 0 10.8 4.866 10.8 10.8S17.934 22.8 12 22.8 1.2 17.934 1.2 12 6.066 1.2 12 1.2z\"/>",
			nintendo: "<path d=\"M5.818 0A5.818 5.818 0 0 0 0 5.818v12.364A5.818 5.818 0 0 0 5.818 24h12.364A5.818 5.818 0 0 0 24 18.182V5.818A5.818 5.818 0 0 0 18.182 0H5.818zm0 1.745h4.91v20.51h-4.91a4.073 4.073 0 0 1-4.073-4.073V5.818a4.073 4.073 0 0 1 4.073-4.073zm8.509 0h3.855a4.073 4.073 0 0 1 4.073 4.073v12.364a4.073 4.073 0 0 1-4.073 4.073h-3.855V1.745zM7.636 6.545a3.273 3.273 0 1 0 0 6.546 3.273 3.273 0 0 0 0-6.546zm0 1.746a1.527 1.527 0 1 1 0 3.054 1.527 1.527 0 0 1 0-3.054zm8.728 2.182a1.745 1.745 0 1 0 0 3.49 1.745 1.745 0 0 0 0-3.49z\"/>"
		};
		const meta = {
			google: { label: "Google" },
			facebook: { label: "Facebook" },
			apple: { label: "Apple" },
			microsoft: { label: "Microsoft" },
			github: { label: "GitHub" },
			gitlab: { label: "GitLab" },
			twitter: { label: "Twitter" },
			x: { label: "X" },
			discord: { label: "Discord" },
			slack: { label: "Slack" },
			linkedin: { label: "LinkedIn" },
			reddit: { label: "Reddit" },
			twitch: { label: "Twitch" },
			youtube: { label: "YouTube" },
			tiktok: { label: "TikTok" },
			instagram: { label: "Instagram" },
			snapchat: {
				label: "Snapchat",
				fg: "#000"
			},
			pinterest: { label: "Pinterest" },
			spotify: {
				label: "Spotify",
				fg: "#000"
			},
			netflix: { label: "Netflix" },
			disneyplus: { label: "Disney+" },
			hbo: { label: "HBO Max" },
			primeVideo: { label: "Prime Video" },
			appletv: { label: "Apple TV+" },
			crunchyroll: { label: "Crunchyroll" },
			steam: { label: "Steam" },
			playstation: { label: "PlayStation" },
			xbox: { label: "Xbox" },
			nintendo: { label: "Nintendo" },
			epicgames: { label: "Epic Games" },
			stripe: { label: "Stripe" },
			paypal: { label: "PayPal" },
			amazon: {
				label: "Amazon",
				fg: "#000"
			},
			figma: { label: "Figma" },
			notion: { label: "Notion" },
			vercel: { label: "Vercel" },
			netlify: {
				label: "Netlify",
				fg: "#000"
			}
		};
		const icon = derived(() => {
			const key = slugMap[brand];
			if (key && key in si) {
				const data = si[key];
				return {
					svg: data.svg,
					hex: data.hex,
					viewBox: "0 0 24 24"
				};
			}
			if (fallbackSvg[brand]) return {
				svg: fallbackSvg[brand],
				hex: fallbackHex[brand] || "666666",
				viewBox: "0 0 24 24"
			};
			return null;
		});
		const fallbackHex = {
			microsoft: "00A4EF",
			twitter: "1DA1F2",
			slack: "4A154B",
			linkedin: "0A66C2",
			disneyplus: "113CCF",
			primeVideo: "00A8E1",
			amazon: "FF9900",
			xbox: "107C10",
			nintendo: "E60012"
		};
		const brandLabel = derived(() => meta[brand]?.label || brand);
		const brandFg = derived(() => meta[brand]?.fg || "white");
		const rawHex = derived(() => icon() ? `#${icon().hex}` : "#666");
		function lighten(hex, amount) {
			const r = parseInt(hex.slice(1, 3), 16);
			const g = parseInt(hex.slice(3, 5), 16);
			const b = parseInt(hex.slice(5, 7), 16);
			const lr = Math.round(r + (255 - r) * amount);
			const lg = Math.round(g + (255 - g) * amount);
			const lb = Math.round(b + (255 - b) * amount);
			return `#${lr.toString(16).padStart(2, "0")}${lg.toString(16).padStart(2, "0")}${lb.toString(16).padStart(2, "0")}`;
		}
		function luminance(hex) {
			const r = parseInt(hex.slice(1, 3), 16) / 255;
			const g = parseInt(hex.slice(3, 5), 16) / 255;
			const b = parseInt(hex.slice(5, 7), 16) / 255;
			return .299 * r + .587 * g + .114 * b;
		}
		const isDark = derived(() => luminance(rawHex()) < .25);
		const visibleColor = derived(() => isDark() ? lighten(rawHex(), .6) : rawHex());
		const solidBg = derived(() => isDark() ? lighten(rawHex(), .15) : rawHex());
		const solidBgHover = derived(() => isDark() ? lighten(rawHex(), .25) : rawHex() + "cc");
		const style = derived(() => {
			switch (variant) {
				case "solid": return `--kb-bg:${solidBg()};--kb-bg-h:${solidBgHover()};--kb-c:${brandFg()};--kb-c-h:${brandFg()};--kb-b:none;--kb-b-h:none`;
				case "outline": return `--kb-bg:transparent;--kb-bg-h:${visibleColor()}15;--kb-c:${visibleColor()};--kb-c-h:${visibleColor()};--kb-b:1px solid ${visibleColor()}40;--kb-b-h:1px solid ${visibleColor()}80`;
				case "light": return `--kb-bg:${visibleColor()}15;--kb-bg-h:${visibleColor()}25;--kb-c:${visibleColor()};--kb-c-h:${visibleColor()};--kb-b:none;--kb-b-h:none`;
				default: return "";
			}
		});
		const sizeClasses = {
			"2xs": "px-1.5 py-0.5 text-[10px] gap-1",
			xs: "px-2.5 py-1 text-xs gap-1.5",
			sm: "px-3 py-1.5 text-sm gap-2",
			md: "px-4 py-2 text-sm gap-2",
			lg: "px-5 py-2.5 text-base gap-2.5",
			xl: "px-6 py-3 text-base gap-2.5",
			"2xl": "px-8 py-3.5 text-lg gap-3",
			"3xl": "px-10 py-4 text-xl gap-3"
		};
		const iconSizes = {
			"2xs": 10,
			xs: 12,
			sm: 14,
			md: 16,
			lg: 18,
			xl: 20,
			"2xl": 22,
			"3xl": 24
		};
		$$renderer.push(`<button${attr("type", type)}${attr("disabled", isDisabled(), true)}${attr_style(style())}${attr_class(` karbon-btn inline-flex items-center justify-center font-semibold ${stringify({
			sharp: "rounded-none",
			soft: "rounded-md",
			rounded: "rounded-lg",
			pill: "rounded-full",
			circle: "rounded-full"
		}[shape])} ${stringify(shape === "circle" && iconOnly ? {
			"2xs": "w-5 h-5",
			xs: "w-7 h-7",
			sm: "w-8 h-8",
			md: "w-10 h-10",
			lg: "w-12 h-12",
			xl: "w-14 h-14",
			"2xl": "w-16 h-16",
			"3xl": "w-20 h-20"
		}[size] : sizeClasses[size])} transition-all duration-200 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${stringify(fullWidth ? "w-full" : "")} ${stringify(classes?.root ?? className)} `, "svelte-rger9g")}>`);
		if (loading) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("width", iconSizes[size])}${attr("height", iconSizes[size])} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`);
			if (loadingText) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span>${escape_html(loadingText)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else {
			$$renderer.push("<!--[-1-->");
			if (icon()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("width", iconSizes[size])}${attr("height", iconSizes[size])}${attr("viewBox", icon().viewBox)} fill="currentColor" role="img"${attr("aria-label", brandLabel())}>${html(icon().svg)}</svg>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (!iconOnly) {
				$$renderer.push("<!--[0-->");
				if (children) {
					$$renderer.push("<!--[0-->");
					children($$renderer);
					$$renderer.push(`<!---->`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<span>${escape_html(brandLabel())}</span>`);
				}
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></button>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/form/Input.svelte
function Input($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { name, type = "text", value = "", placeholder = "", label = "", error = "", errorIcon = true, required = false, disabled = false, readonly = false, autocomplete = "", clearable = false, icon, variant = "dark", inputVariant = "outlined", color, classes, class: className = "", inputClass = "", labelClass = "", wrapperClass = "", oninput, onchange, onfocus, onblur, onkeydown } = $$props;
		let focused = false;
		const isPassword = derived(() => type === "password");
		const inputType = derived(() => (isPassword(), type));
		const hasRightAction = derived(() => isPassword() || clearable && value);
		const hasIcon = derived(() => !!icon);
		const focusColor = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		const themes = {
			dark: {
				label: "text-[11px] font-medium text-gray-500 uppercase tracking-wider",
				icon: "text-gray-600",
				action: "text-gray-600 hover:text-gray-400",
				error: "text-red-400",
				glow: true,
				base: "text-white placeholder-gray-700",
				variants: {
					outlined: "border border-white/8 bg-white/3",
					filled: "border-0 bg-white/8",
					underline: "rounded-none bg-transparent"
				}
			},
			light: {
				label: "text-sm font-medium text-gray-700",
				icon: "text-gray-400",
				action: "text-gray-400 hover:text-gray-600",
				error: "text-[var(--karbon-danger)]",
				glow: false,
				base: "text-gray-900 placeholder-gray-400",
				variants: {
					outlined: "border border-gray-300 bg-white",
					filled: "border-0 bg-gray-100",
					underline: "rounded-none bg-transparent"
				}
			}
		};
		const theme = derived(() => themes[variant]);
		const variantClass = derived(() => theme().variants[inputVariant]);
		$$renderer.push(`<div${attr_class(`${stringify(classes?.root ?? "")} ${stringify(wrapperClass || "space-y-1.5")}`)}>`);
		if (label) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<label${attr("for", name)}${attr_class(`${stringify(theme().label)} block mb-1.5 ${stringify(classes?.label ?? "")} ${stringify(labelClass)}`)}>${escape_html(label)}</label>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div${attr_class(`relative ${stringify(className)}`)}>`);
		if (icon) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${stringify(classes?.icon ?? "")} ${stringify(theme().icon)}`, void 0, { "z-10": variant === "dark" })}${attr_style("")}>`);
			icon($$renderer);
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <input${attr("id", name)}${attr("name", name)}${attr("type", inputType())}${attr("value", value)}${attr("placeholder", placeholder)}${attr("required", required, true)}${attr("disabled", disabled, true)}${attr("readonly", readonly, true)}${attr("autocomplete", autocomplete)}${attr_class(`w-full ${stringify(inputVariant !== "underline" ? "rounded-lg" : "")} ${stringify(hasIcon() ? "pl-9" : "pl-3")} ${stringify(hasRightAction() ? "pr-10" : "pr-3")} py-2.5 md:py-3 text-[13px] md:text-sm focus:outline-none transition-all ${stringify(theme().base)} ${stringify(variantClass())} ${stringify(error ? "border-red-500/50" : "")} ${stringify(disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "")} ${stringify(variant === "dark" ? "relative z-[1]" : "")} ${stringify(classes?.input ?? "")} ${stringify(inputClass)}`)}${attr_style(`${stringify(inputVariant === "underline" ? "border:none;border-bottom:1px solid " + (error ? "var(--karbon-danger)" : "var(--karbon-border-input)") + ";border-radius:0;" : "")}${stringify("")}`)}/> `);
		if (variant === "dark" && theme().glow && inputVariant === "outlined") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class("absolute -inset-px rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none", void 0, { "opacity-100": focused })}${attr_style(`background: linear-gradient(135deg, color-mix(in srgb, ${stringify(focusColor())} 10%, transparent), transparent 50%);`)}></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (isPassword()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button type="button"${attr("aria-label", "Afficher le mot de passe")}${attr_class(`absolute right-3 top-1/2 -translate-y-1/2 ${stringify(theme().action)} transition-colors cursor-pointer z-10`)}${attr("tabindex", -1)}>`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>`);
			$$renderer.push(`<!--]--></button>`);
		} else if (clearable && value) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<button type="button" aria-label="Effacer"${attr_class(`absolute right-3 top-1/2 -translate-y-1/2 ${stringify(theme().action)} transition-colors cursor-pointer z-10`)}${attr("tabindex", -1)}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p${attr_class(`flex items-center gap-1.5 text-xs ${stringify(theme().error)} ${stringify(classes?.error ?? "")}`)}>`);
			if (errorIcon) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <span>${escape_html(error)}</span></p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { value });
	});
}
//#endregion
//#region ../packages/ui-svelte/src/form/Select.svelte
function Select($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { name, options, value = "", values = [], placeholder = "Selectionner...", label = "", error = "", errorIcon = true, required = false, disabled = false, multiple = false, searchable = false, clearable = false, variant = "dark", inputVariant = "outlined", color, classes, class: className = "", onchange } = $$props;
		const focusColor = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		const isDark = derived(() => variant === "dark");
		derived(() => options);
		const selectedLabel = derived(() => () => {
			if (multiple) return values.length ? `${values.length} selectionne${values.length > 1 ? "s" : ""}` : "";
			return options.find((o) => o.value === value)?.label || "";
		});
		const selectedOptions = derived(() => multiple ? options.filter((o) => values.includes(o.value)) : []);
		const variantClasses = derived(() => {
			if (inputVariant === "underline") return "rounded-none bg-transparent";
			if (inputVariant === "filled") return isDark() ? "rounded-lg bg-white/8" : "rounded-lg bg-gray-100";
			return isDark() ? "rounded-lg border border-white/8 bg-white/3" : "rounded-lg border border-gray-300 bg-white";
		});
		const inlineStyle = derived(() => {
			let s = "";
			if (inputVariant === "underline") s = `border:none;border-bottom:1px solid ${error ? "var(--karbon-danger)" : isDark() ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.12)"};border-radius:0;`;
			return s;
		});
		$$renderer.push(`<div${attr_class(`space-y-1.5 ${stringify(classes?.root ?? "")} ${stringify(className)}`)}>`);
		if (label) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span${attr_class(`${stringify(isDark() ? "text-[11px] font-medium text-gray-500 uppercase tracking-wider" : "text-sm font-medium text-gray-700")} block mb-1.5 ${stringify(classes?.label ?? "")}`)}>${escape_html(label)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <input type="hidden"${attr("name", name)}${attr("value", multiple ? values.join(",") : value)}/> <div class="relative"><div${attr_class(`relative w-full min-h-[42px] md:min-h-[46px] flex items-center gap-2 px-3 py-2 text-[13px] md:text-sm cursor-pointer transition-all ${stringify(variantClasses())} ${stringify(error ? "border-red-500/50" : "")} ${stringify(disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "")} ${stringify(classes?.select ?? "")}`)}${attr_style(inlineStyle())}><div class="flex-1 flex flex-wrap items-center gap-1.5 min-w-0">`);
		if (multiple && selectedOptions().length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<!--[-->`);
			const each_array = ensure_array_like(selectedOptions());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let opt = each_array[$$index];
				$$renderer.push(`<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium transition-colors"${attr_style(`background: color-mix(in srgb, ${stringify(focusColor())} 15%, transparent); color: ${stringify(focusColor())};`)}>${escape_html(opt.label)} <button type="button" class="hover:opacity-70 cursor-pointer"${attr("aria-label", `Retirer ${stringify(opt.label)}`)}><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button></span>`);
			}
			$$renderer.push(`<!--]-->`);
		} else if (!multiple && selectedLabel()()) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<span${attr_class(isDark() ? "text-white" : "text-gray-900")}>${escape_html(selectedLabel()())}</span>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<span${attr_class(isDark() ? "text-gray-600" : "text-gray-400")}>${escape_html(placeholder)}</span>`);
		}
		$$renderer.push(`<!--]--></div> <div class="flex items-center gap-1 shrink-0">`);
		if (clearable && (value || values.length > 0)) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button type="button"${attr_class(`${stringify(isDark() ? "text-gray-600 hover:text-gray-400" : "text-gray-400 hover:text-gray-600")} transition-colors cursor-pointer`)} aria-label="Tout effacer"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${attr_class(`${stringify(isDark() ? "text-gray-600" : "text-gray-400")} transition-transform duration-200 ${stringify("")}`)}><path d="m6 9 6 6 6-6"></path></svg></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p${attr_class(`flex items-center gap-1.5 text-xs ${stringify(isDark() ? "text-red-400" : "text-[var(--karbon-danger)]")} ${stringify(classes?.error ?? "")}`)}>`);
			if (errorIcon) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <span>${escape_html(error)}</span></p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, {
			value,
			values
		});
	});
}
//#endregion
//#region ../packages/ui-svelte/src/form/Checkbox.svelte
function Checkbox($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { name, checked = false, indeterminate = false, label = "", description = "", disabled = false, color, size = "md", shape = "rounded", icon = "check", variant = "filled", classes, class: className = "", onchange } = $$props;
		const accentColor = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		derived(() => color ? `var(--karbon-${color}-400)` : "var(--karbon-primary-hover, var(--karbon-primary))");
		const sizeMap = {
			sm: {
				box: "w-3.5 h-3.5",
				icon: 10,
				text: "text-xs",
				desc: "text-[11px]",
				gap: "gap-2"
			},
			md: {
				box: "w-4.5 h-4.5",
				icon: 13,
				text: "text-sm",
				desc: "text-xs",
				gap: "gap-2.5"
			},
			lg: {
				box: "w-5.5 h-5.5",
				icon: 16,
				text: "text-base",
				desc: "text-sm",
				gap: "gap-3"
			}
		};
		const s = derived(() => sizeMap[size]);
		const shapeMap = {
			square: "rounded-none",
			rounded: "rounded",
			circle: "rounded-full"
		};
		const shapeClass = derived(() => shapeMap[shape]);
		const isActive = derived(() => checked || indeterminate);
		const boxStyle = derived(() => {
			switch (variant) {
				case "filled": return `background:${isActive() ? accentColor() : "var(--karbon-bg-input,rgba(255,255,255,0.06))"};border:${isActive() ? "none" : "1.5px solid var(--karbon-border-input,rgba(255,255,255,0.12))"};box-shadow:${isActive() ? `0 0 0 2px color-mix(in srgb,${accentColor()} 20%,transparent)` : "none"};`;
				case "outlined": return `background:transparent;border:2px solid ${isActive() ? accentColor() : "var(--karbon-border-input,rgba(255,255,255,0.12))"};box-shadow:none;`;
				case "ghost": return `background:transparent;border:none;box-shadow:none;`;
				case "elegant": return `background:${isActive() ? `color-mix(in srgb,${accentColor()} 12%,transparent)` : "transparent"};border:1.5px solid ${isActive() ? accentColor() : "var(--karbon-border-input,rgba(255,255,255,0.12))"};box-shadow:${isActive() ? `0 0 8px color-mix(in srgb,${accentColor()} 15%,transparent)` : "none"};`;
				default: return "";
			}
		});
		const iconColor = derived(() => {
			switch (variant) {
				case "filled": return "white";
				case "outlined": return accentColor();
				case "ghost": return isActive() ? accentColor() : "var(--karbon-text-4)";
				case "elegant": return accentColor();
				default: return "white";
			}
		});
		$$renderer.push(`<input type="hidden"${attr("name", name)}${attr("value", checked ? "on" : "")}/> <div${attr_class(`inline-flex items-start ${stringify(s().gap)} ${stringify(disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer")} ${stringify(classes?.root ?? "")} ${stringify(className)}`)} role="checkbox"${attr("aria-checked", indeterminate ? "mixed" : checked)}${attr("aria-disabled", disabled)}${attr("tabindex", disabled ? -1 : 0)}><div${attr_class(`shrink-0 ${stringify(s().box)} ${stringify(shapeClass())} flex items-center justify-center transition-all duration-150 mt-0.5`)}${attr_style(boxStyle())}>`);
		if (indeterminate) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24" fill="none"${attr("stroke", iconColor())} stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`);
		} else if (checked) {
			$$renderer.push("<!--[1-->");
			if (icon === "check") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24" fill="none"${attr("stroke", iconColor())} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`);
			} else if (icon === "cross") {
				$$renderer.push("<!--[1-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24" fill="none"${attr("stroke", iconColor())} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`);
			} else if (icon === "dash") {
				$$renderer.push("<!--[2-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24" fill="none"${attr("stroke", iconColor())} stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`);
			} else if (icon === "heart") {
				$$renderer.push("<!--[3-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24"${attr("fill", iconColor())} stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`);
			} else if (icon === "star") {
				$$renderer.push("<!--[4-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24"${attr("fill", iconColor())} stroke="none"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"></path></svg>`);
			} else if (icon === "circle") {
				$$renderer.push("<!--[5-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("width", Math.round(s().icon * .6))}${attr("height", Math.round(s().icon * .6))} viewBox="0 0 24 24"${attr("fill", iconColor())} stroke="none"><circle cx="12" cy="12" r="12"></circle></svg>`);
			} else if (icon === "eye") {
				$$renderer.push("<!--[6-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24" fill="none"${attr("stroke", iconColor())} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path><circle cx="12" cy="12" r="3"></circle></svg>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (label || description) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="select-none min-w-0">`);
			if (label) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span${attr_class(`${stringify(s().text)} font-medium text-[var(--karbon-text)] ${stringify(classes?.label ?? "")}`)}>${escape_html(label)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (description) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p${attr_class(`${stringify(s().desc)} text-[var(--karbon-text-3)] mt-0.5 leading-relaxed ${stringify(classes?.description ?? "")}`)}>${escape_html(description)}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { checked });
	});
}
//#endregion
//#region ../packages/ui-svelte/src/form/Toggle.svelte
function Toggle($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { name, checked = false, label = "", description = "", size = "md", disabled = false, color, showIcons = false, classes, class: className = "", onchange } = $$props;
		const trackColor = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		const sizes = {
			sm: {
				track: "w-7 h-4",
				dot: 12,
				pad: 2,
				translate: 14,
				text: "text-xs",
				desc: "text-[11px]",
				iconSize: 7
			},
			md: {
				track: "w-10 h-[22px]",
				dot: 16,
				pad: 3,
				translate: 19,
				text: "text-sm",
				desc: "text-xs",
				iconSize: 9
			},
			lg: {
				track: "w-14 h-7",
				dot: 20,
				pad: 4,
				translate: 30,
				text: "text-base",
				desc: "text-sm",
				iconSize: 11
			}
		};
		const s = derived(() => sizes[size]);
		$$renderer.push(`<input type="hidden"${attr("name", name)}${attr("value", checked ? "on" : "")}/> <div${attr_class(`inline-flex items-center gap-2.5 ${stringify(disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer")} ${stringify(classes?.root ?? "")} ${stringify(className)}`)} role="switch"${attr("aria-checked", checked)}${attr("aria-disabled", disabled)}${attr("tabindex", disabled ? -1 : 0)}><span${attr_class(`relative inline-flex shrink-0 items-center rounded-full transition-all duration-200 ${stringify(s().track)} ${stringify(classes?.track ?? "")}`)}${attr_style(`background: ${stringify(checked ? trackColor() : "var(--karbon-border, rgba(255,255,255,0.12))")};${stringify(checked ? `box-shadow: 0 0 8px color-mix(in srgb, ${trackColor()} 30%, transparent);` : "")}`)}>`);
		if (showIcons) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span${attr_class(`absolute left-1.5 top-1/2 -translate-y-1/2 transition-opacity duration-150 ${stringify(checked ? "opacity-100" : "opacity-0")}`)}><svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().iconSize)}${attr("height", s().iconSize)} viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg></span> <span${attr_class(`absolute right-1.5 top-1/2 -translate-y-1/2 transition-opacity duration-150 ${stringify(checked ? "opacity-0" : "opacity-50")}`)}><svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().iconSize)}${attr("height", s().iconSize)} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <span${attr_class(`inline-block rounded-full bg-white shadow-sm transition-transform duration-200 ${stringify(classes?.dot ?? "")}`)}${attr_style(`width: ${stringify(s().dot)}px; height: ${stringify(s().dot)}px; transform: translateX(${stringify(checked ? s().translate : s().pad)}px);`)}></span></span> `);
		if (label || description) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="select-none min-w-0">`);
			if (label) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span${attr_class(`${stringify(s().text)} font-medium text-[var(--karbon-text)] ${stringify(classes?.label ?? "")}`)}>${escape_html(label)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (description) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p${attr_class(`${stringify(s().desc)} text-[var(--karbon-text-3)] mt-0.5 leading-relaxed`)}>${escape_html(description)}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { checked });
	});
}
//#endregion
//#region ../packages/ui-svelte/src/form/Textarea.svelte
function Textarea($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { name, value = "", placeholder = "", label = "", error = "", errorIcon = true, rows = 4, maxlength, showCount = false, required = false, disabled = false, readonly = false, variant = "dark", inputVariant = "outlined", color, classes, class: className = "", oninput } = $$props;
		derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		const themes = {
			dark: {
				label: "text-[11px] font-medium text-gray-500 uppercase tracking-wider",
				base: "text-white placeholder-gray-700",
				error: "text-red-400",
				count: "text-gray-600",
				variants: {
					outlined: "border border-white/8 bg-white/3",
					filled: "border-0 bg-white/8",
					underline: "rounded-none bg-transparent"
				}
			},
			light: {
				label: "text-sm font-medium text-gray-700",
				base: "text-gray-900 placeholder-gray-400",
				error: "text-[var(--karbon-danger)]",
				count: "text-gray-400",
				variants: {
					outlined: "border border-gray-300 bg-white",
					filled: "border-0 bg-gray-100",
					underline: "rounded-none bg-transparent"
				}
			}
		};
		const theme = derived(() => themes[variant]);
		const variantClass = derived(() => theme().variants[inputVariant]);
		const charCount = derived(() => value.length);
		const inlineStyle = derived(() => {
			let s = "";
			if (inputVariant === "underline") s += `border:none;border-bottom:1px solid ${error ? "var(--karbon-danger)" : "var(--karbon-border-input)"};border-radius:0;`;
			return s;
		});
		$$renderer.push(`<div${attr_class(`space-y-1.5 ${stringify(classes?.root ?? "")} ${stringify(className)}`)}>`);
		if (label) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<label${attr("for", name)}${attr_class(`${stringify(theme().label)} block mb-1.5 ${stringify(classes?.label ?? "")}`)}>${escape_html(label)}</label>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <textarea${attr("id", name)}${attr("name", name)}${attr("placeholder", placeholder)}${attr("rows", rows)}${attr("maxlength", maxlength)}${attr("required", required, true)}${attr("disabled", disabled, true)}${attr("readonly", readonly, true)}${attr_class(`w-full ${stringify(inputVariant !== "underline" ? "rounded-lg" : "")} px-3 py-2.5 text-[13px] md:text-sm focus:outline-none transition-all resize-y ${stringify(theme().base)} ${stringify(variantClass())} ${stringify(error ? "border-red-500/50" : "")} ${stringify(disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "")} ${stringify(classes?.textarea ?? "")}`)}${attr_style(inlineStyle())}>`);
		const $$body = escape_html(value);
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea> <div class="flex items-center justify-between">`);
		if (error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p${attr_class(`flex items-center gap-1.5 text-xs ${stringify(theme().error)} ${stringify(classes?.error ?? "")}`)}>`);
			if (errorIcon) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <span>${escape_html(error)}</span></p>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<span></span>`);
		}
		$$renderer.push(`<!--]--> `);
		if (showCount && maxlength) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span${attr_class(`text-xs ${stringify(theme().count)} ${stringify(classes?.count ?? "")}`)}>${escape_html(charCount())}/${escape_html(maxlength)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div>`);
		bind_props($$props, { value });
	});
}
//#endregion
//#region ../packages/ui-svelte/src/form/Radio.svelte
function Radio($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { name, options, value = "", label = "", direction = "column", disabled = false, color, size = "md", variant = "filled", classes, class: className = "", onchange } = $$props;
		const accentColor = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		const sizeMap = {
			sm: {
				box: 16,
				dot: 8,
				text: "text-xs",
				desc: "text-[11px]",
				gap: "gap-2"
			},
			md: {
				box: 20,
				dot: 11,
				text: "text-sm",
				desc: "text-xs",
				gap: "gap-2.5"
			},
			lg: {
				box: 24,
				dot: 13,
				text: "text-base",
				desc: "text-sm",
				gap: "gap-3"
			}
		};
		const s = derived(() => sizeMap[size]);
		function boxStyle(selected) {
			switch (variant) {
				case "filled": return `background:${selected ? accentColor() : "var(--karbon-bg-input,rgba(255,255,255,0.06))"};border:${selected ? "none" : "1.5px solid var(--karbon-border-input,rgba(255,255,255,0.12))"};box-shadow:${selected ? `0 0 0 2px color-mix(in srgb,${accentColor()} 20%,transparent)` : "none"};`;
				case "outlined": return `background:transparent;border:2px solid ${selected ? accentColor() : "var(--karbon-border-input,rgba(255,255,255,0.12))"};`;
				case "ghost": return `background:transparent;border:none;`;
				case "elegant": return `background:${selected ? `color-mix(in srgb,${accentColor()} 12%,transparent)` : "transparent"};border:1.5px solid ${selected ? accentColor() : "var(--karbon-border-input,rgba(255,255,255,0.12))"};box-shadow:${selected ? `0 0 8px color-mix(in srgb,${accentColor()} 15%,transparent)` : "none"};`;
				default: return "";
			}
		}
		function dotColor(selected) {
			switch (variant) {
				case "filled": return "white";
				case "outlined": return accentColor();
				case "ghost": return selected ? accentColor() : "var(--karbon-text-4)";
				case "elegant": return accentColor();
				default: return "white";
			}
		}
		$$renderer.push(`<fieldset${attr_class(`${stringify(classes?.root ?? "")} ${stringify(className)}`)}${attr("disabled", disabled, true)}>`);
		if (label) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<legend${attr_class(`${stringify(s().text)} font-medium text-[var(--karbon-text)] mb-2 ${stringify(classes?.legend ?? "")}`)}>${escape_html(label)}</legend>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div${attr_class(direction === "row" ? "flex flex-wrap items-center gap-4" : "flex flex-col gap-2.5")}><!--[-->`);
		const each_array = ensure_array_like(options);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let opt = each_array[$$index];
			const selected = value === opt.value;
			const isDisabled = opt.disabled || disabled;
			$$renderer.push(`<div${attr_class(`inline-flex items-center ${stringify(s().gap)} ${stringify(isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer")}`)} role="radio"${attr("aria-checked", selected)}${attr("aria-disabled", isDisabled)}${attr("tabindex", isDisabled ? -1 : 0)}><div class="shrink-0 rounded-full transition-all duration-150"${attr_style(`width:${stringify(s().box)}px;height:${stringify(s().box)}px;display:grid;place-items:center;box-sizing:border-box;${stringify(boxStyle(selected))}`)}>`);
			if (selected) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="rounded-full"${attr_style(`width:${stringify(s().dot)}px;height:${stringify(s().dot)}px;background:${stringify(dotColor(selected))};`)}></div>`);
			} else if (variant === "ghost") {
				$$renderer.push("<!--[1-->");
				$$renderer.push(`<div class="rounded-full"${attr_style(`width:${stringify(s().dot)}px;height:${stringify(s().dot)}px;background:var(--karbon-border-input,rgba(255,255,255,0.12));`)}></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="select-none min-w-0"><span${attr_class(`${stringify(s().text)} font-medium text-[var(--karbon-text)] ${stringify(classes?.label ?? "")}`)}>${escape_html(opt.label)}</span> `);
			if (opt.description) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p${attr_class(`${stringify(s().desc)} text-[var(--karbon-text-3)] mt-0.5 leading-relaxed ${stringify(classes?.description ?? "")}`)}>${escape_html(opt.description)}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div>`);
		}
		$$renderer.push(`<!--]--></div></fieldset>`);
		bind_props($$props, { value });
	});
}
//#endregion
//#region ../packages/ui-svelte/src/form/Slider.svelte
function Slider($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { name, value = 0, min = 0, max = 100, step = 1, label = "", showValue = true, disabled = false, color, classes, class: className = "", oninput } = $$props;
		const percent = derived(() => (value - min) / (max - min) * 100);
		const trackColor = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		$$renderer.push(`<div${attr_class(`space-y-2 ${stringify(classes?.root ?? "")} ${stringify(className)}`)}>`);
		if (label || showValue) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex items-center justify-between">`);
			if (label) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<label${attr("for", name)}${attr_class(`text-sm font-medium text-[var(--karbon-text,#1a1635)] ${stringify(classes?.label ?? "")}`)}>${escape_html(label)}</label>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (showValue) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span${attr_class(`text-sm font-semibold tabular-nums ${stringify(classes?.value ?? "")}`)}${attr_style(`color: ${stringify(trackColor())}`)}>${escape_html(value)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <input${attr("id", name)}${attr("name", name)} type="range"${attr("value", value)}${attr("min", min)}${attr("max", max)}${attr("step", step)}${attr("disabled", disabled, true)}${attr_class(`w-full h-2 rounded-full appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md ${stringify(classes?.input ?? "")}`, "svelte-1qw38ks")}${attr_style(`background: linear-gradient(to right, ${stringify(trackColor())} ${stringify(percent())}%, var(--karbon-border, rgba(0,0,0,0.07)) ${stringify(percent())}%); --thumb-color: ${stringify(trackColor())};`)}/></div>`);
		bind_props($$props, { value });
	});
}
//#endregion
//#region ../packages/ui-svelte/src/badge/Badge.svelte
function Badge($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { variant = "soft", color, size = "sm", shape = "pill", closable = false, dot = false, icon, class: className = "", classes = {}, onclose, children } = $$props;
		function c(shade) {
			return color ? `var(--karbon-${color}-${shade})` : "";
		}
		const accent = derived(() => color ? c(500) : "var(--karbon-primary)");
		const accentLight = derived(() => color ? c(400) : "var(--karbon-primary)");
		const presetStyles = {
			soft: "background:var(--karbon-bg-2);color:var(--karbon-text-2);",
			solid: "background:var(--karbon-primary);color:white;",
			outline: "background:transparent;color:var(--karbon-text-2);border:1px solid var(--karbon-border);",
			dot: "background:var(--karbon-bg-2);color:var(--karbon-text-2);",
			flat: "background:transparent;color:var(--karbon-text-2);"
		};
		const colorStyle = derived(() => {
			if (!color) return presetStyles[variant] || presetStyles.soft;
			switch (variant) {
				case "soft": return `background:color-mix(in srgb,${accent()} 15%,transparent);color:${accentLight()};`;
				case "solid": return `background:${accent()};color:white;`;
				case "outline": return `background:transparent;color:${accentLight()};border:1px solid color-mix(in srgb,${accentLight()} 40%,transparent);`;
				case "dot": return `background:color-mix(in srgb,${accent()} 10%,transparent);color:${accentLight()};`;
				case "flat": return `background:transparent;color:${accentLight()};`;
				default: return `background:color-mix(in srgb,${accent()} 15%,transparent);color:${accentLight()};`;
			}
		});
		const sizeClasses = {
			xs: "px-1.5 py-px text-[10px] gap-1",
			sm: "px-2 py-0.5 text-[11px] gap-1",
			md: "px-2.5 py-0.5 text-xs gap-1.5",
			lg: "px-3 py-1 text-sm gap-1.5"
		};
		const dotSizes = {
			xs: "w-1 h-1",
			sm: "w-1.5 h-1.5",
			md: "w-2 h-2",
			lg: "w-2 h-2"
		};
		const iconSizes = {
			xs: 8,
			sm: 10,
			md: 12,
			lg: 14
		};
		$$renderer.push(`<span${attr_class(`inline-flex items-center font-medium ${stringify(sizeClasses[size])} ${stringify({
			pill: "rounded-full",
			rounded: "rounded-md",
			square: "rounded-none"
		}[shape])} ${stringify(classes?.root ?? className)}`)}${attr_style(colorStyle())}>`);
		if ((variant === "dot" || dot) && !icon) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span${attr_class(`rounded-full shrink-0 ${stringify(dotSizes[size])} ${stringify(classes?.dot ?? "")}`)}${attr_style(`background: ${stringify(color ? accentLight() : "currentColor")};`)}></span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (icon) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span${attr_class(`shrink-0 ${stringify(classes?.icon ?? "")}`)}>`);
			icon($$renderer);
			$$renderer.push(`<!----></span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		children($$renderer);
		$$renderer.push(`<!----> `);
		if (closable) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button type="button"${attr_class(`shrink-0 ml-0.5 rounded-full transition-opacity opacity-60 hover:opacity-100 cursor-pointer ${stringify(classes?.close ?? "")}`)} aria-label="Fermer"><svg xmlns="http://www.w3.org/2000/svg"${attr("width", iconSizes[size])}${attr("height", iconSizes[size])} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></span>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/alert/AlertMessage.svelte
function AlertMessage($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { type = "info", variant = "soft", color, title = "", message = "", dismissible = false, icon, actions, class: className = "", classes = {}, ondismiss, children } = $$props;
		const typeColors = {
			error: "var(--karbon-red-500, #ef4444)",
			success: "var(--karbon-emerald-500, #10b981)",
			warning: "var(--karbon-amber-500, #f59e0b)",
			info: "var(--karbon-blue-500, #3b82f6)"
		};
		const typeColorsLight = {
			error: "var(--karbon-red-400, #f87171)",
			success: "var(--karbon-emerald-400, #34d399)",
			warning: "var(--karbon-amber-400, #fbbf24)",
			info: "var(--karbon-blue-400, #60a5fa)"
		};
		const baseColor = derived(() => color ? `var(--karbon-${color}-500)` : typeColors[type]);
		const lightColor = derived(() => color ? `var(--karbon-${color}-400)` : typeColorsLight[type]);
		const style = derived(() => {
			switch (variant) {
				case "soft": return `background:color-mix(in srgb,${baseColor()} 10%,transparent);color:${lightColor()};border:1px solid color-mix(in srgb,${baseColor()} 15%,transparent);`;
				case "filled": return `background:${baseColor()};color:white;border:none;`;
				case "outline": return `background:transparent;color:${lightColor()};border:1px solid color-mix(in srgb,${baseColor()} 30%,transparent);`;
				case "bordered": return `background:color-mix(in srgb,${baseColor()} 6%,transparent);color:${lightColor()};border:none;border-left:3px solid ${baseColor()};`;
				default: return "";
			}
		});
		const typeIcons = {
			error: "<circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\"/><line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\"/>",
			success: "<path d=\"M22 11.08V12a10 10 0 1 1-5.93-9.14\"/><path d=\"m9 11 3 3L22 4\"/>",
			warning: "<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/>",
			info: "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 16v-4\"/><path d=\"M12 8h.01\"/>"
		};
		if (message || children || title) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`flex gap-3 rounded-xl px-4 py-3 text-sm ${stringify(classes?.root ?? className)}`)}${attr_style(`${stringify(style())}animation:karbon-alert-in 0.25s ease;`)} role="alert">`);
			if (icon !== false) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div${attr_class(`shrink-0 mt-0.5 ${stringify(classes?.icon ?? "")}`)}>`);
				if (icon) {
					$$renderer.push("<!--[0-->");
					icon($$renderer);
					$$renderer.push(`<!---->`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"${attr("stroke", variant === "filled" ? "white" : "currentColor")} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${html(typeIcons[type] || typeIcons.info)}</svg>`);
				}
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="flex-1 min-w-0">`);
			if (title) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p${attr_class(`font-semibold ${stringify(message || children ? "mb-1" : "")} ${stringify(classes?.title ?? "")}`)}${attr_style(variant === "filled" ? "color:white;" : "")}>${escape_html(title)}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (children) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div${attr_class(`opacity-90 ${stringify(classes?.text ?? "")}`)}>`);
				children($$renderer);
				$$renderer.push(`<!----></div>`);
			} else if (message) {
				$$renderer.push("<!--[1-->");
				$$renderer.push(`<p${attr_class(`opacity-90 ${stringify(classes?.text ?? "")}`)}>${escape_html(message)}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (actions) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="mt-2.5 flex items-center gap-2">`);
				actions($$renderer);
				$$renderer.push(`<!----></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (dismissible) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<button type="button"${attr_class(`shrink-0 mt-0.5 rounded-lg p-1 transition-opacity opacity-50 hover:opacity-100 cursor-pointer ${stringify(classes?.close ?? "")}`)} aria-label="Fermer"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"${attr("stroke", variant === "filled" ? "white" : "currentColor")} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/overlay/Modal.svelte
function Modal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { open = false, title = "", description = "", size = "md", position = "center", backdrop = "blur", closable = true, closeOnOverlay = true, color, class: className = "", classes = {}, onclose, icon, children, footer } = $$props;
		const accent = derived(() => color ? `var(--karbon-${color}-500)` : "");
		const sizeMap = {
			xs: "max-w-xs",
			sm: "max-w-sm",
			md: "max-w-lg",
			lg: "max-w-2xl",
			xl: "max-w-4xl",
			full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]"
		};
		const backdropStyles = {
			blur: "background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);",
			dark: "background:rgba(0,0,0,0.6);",
			light: "background:rgba(255,255,255,0.4);backdrop-filter:blur(4px);",
			transparent: "background:transparent;"
		};
		const positionClasses = {
			center: "items-center justify-center",
			top: "items-start justify-center pt-16",
			right: "items-stretch justify-end",
			bottom: "items-end justify-center pb-4"
		};
		const contentPosition = {
			center: "rounded-xl",
			top: "rounded-xl",
			right: "rounded-l-xl rounded-r-none min-h-full",
			bottom: "rounded-t-xl rounded-b-none"
		};
		if (open) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`fixed inset-0 z-50 flex p-4 ${stringify(positionClasses[position])}`)}${attr_style(`opacity:${stringify(0)};transition:opacity 0.15s ease;`)}><div${attr_class(`fixed inset-0 ${stringify(classes?.overlay ?? "")}`)}${attr_style(`${stringify(backdropStyles[backdrop])}transition:opacity 0.15s ease;opacity:${stringify(0)};`)}></div> <div${attr_class(`relative z-10 w-full ${stringify(sizeMap[size])} ${stringify(contentPosition[position])} flex flex-col ${stringify(classes?.content ?? className)}`)}${attr_style(`background:var(--karbon-bg-card);box-shadow:0 25px 60px -12px rgba(0,0,0,0.4);border:1px solid var(--karbon-border); transform:${stringify("scale(0.95) translateY(8px)")}; transition:transform 0.2s cubic-bezier(0.16,1,0.3,1),opacity 0.15s ease; opacity:${stringify(0)};`)} role="dialog" aria-modal="true"${attr("aria-label", title || void 0)}>`);
			if (title || closable || icon || description) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div${attr_class(`flex gap-4 px-6 pt-6 pb-2 ${stringify(classes?.header ?? "")}`)}>`);
				if (icon) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="shrink-0 mt-0.5">`);
					if (color) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<div class="w-10 h-10 rounded-xl flex items-center justify-center"${attr_style(`background:color-mix(in srgb,${stringify(accent())} 12%,transparent);color:${stringify(accent())};`)}>`);
						icon($$renderer);
						$$renderer.push(`<!----></div>`);
					} else {
						$$renderer.push("<!--[-1-->");
						icon($$renderer);
						$$renderer.push(`<!---->`);
					}
					$$renderer.push(`<!--]--></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div class="flex-1 min-w-0">`);
				if (title) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<h3 class="text-lg font-semibold" style="color:var(--karbon-text);">${escape_html(title)}</h3>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (description) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<p class="text-sm mt-0.5" style="color:var(--karbon-text-3);">${escape_html(description)}</p>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> `);
				if (closable) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<button aria-label="Fermer" class="shrink-0 rounded-lg p-1.5 transition-colors cursor-pointer" style="color:var(--karbon-text-4);"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div${attr_class(`px-6 py-4 flex-1 overflow-y-auto text-sm ${stringify(classes?.body ?? "")}`)} style="color:var(--karbon-text-2);">`);
			children($$renderer);
			$$renderer.push(`<!----></div> `);
			if (footer) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div${attr_class(`px-6 py-4 flex items-center justify-end gap-2 ${stringify(classes?.footer ?? "")}`)} style="border-top:1px solid var(--karbon-border);">`);
				footer($$renderer);
				$$renderer.push(`<!----></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { open });
	});
}
//#endregion
//#region ../packages/ui-svelte/src/overlay/Dialog.svelte
function Dialog($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { open = false, title, message = "", variant = "info", backdrop = "blur", color, confirmLabel = "Confirmer", cancelLabel = "Annuler", confirmInput, confirmInputLabel, confirmInputPlaceholder, loading = false, class: className = "", classes = {}, onconfirm, oncancel, icon, children } = $$props;
		let inputValue = "";
		const confirmInputLabelText = derived(() => confirmInputLabel ?? `Tapez "${confirmInput}" pour confirmer`);
		const isConfirmDisabled = derived(() => loading || (confirmInput ? inputValue !== confirmInput : false));
		const variantColors = {
			info: {
				bg: "var(--karbon-blue-500)",
				text: "var(--karbon-blue-400)",
				btn: "var(--karbon-blue-500)",
				btnHover: "var(--karbon-blue-600)"
			},
			warning: {
				bg: "var(--karbon-amber-500)",
				text: "var(--karbon-amber-400)",
				btn: "var(--karbon-amber-500)",
				btnHover: "var(--karbon-amber-600)"
			},
			danger: {
				bg: "var(--karbon-red-500)",
				text: "var(--karbon-red-400)",
				btn: "var(--karbon-red-500)",
				btnHover: "var(--karbon-red-600)"
			},
			success: {
				bg: "var(--karbon-emerald-500)",
				text: "var(--karbon-emerald-400)",
				btn: "var(--karbon-emerald-500)",
				btnHover: "var(--karbon-emerald-600)"
			}
		};
		const vc = derived(() => color ? {
			bg: `var(--karbon-${color}-500)`,
			text: `var(--karbon-${color}-400)`,
			btn: `var(--karbon-${color}-500)`,
			btnHover: `var(--karbon-${color}-600)`
		} : variantColors[variant]);
		const variantIcons = {
			info: "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 16v-4\"/><path d=\"M12 8h.01\"/>",
			warning: "<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/>",
			danger: "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m15 9-6 6\"/><path d=\"m9 9 6 6\"/>",
			success: "<path d=\"M22 11.08V12a10 10 0 1 1-5.93-9.14\"/><path d=\"m9 11 3 3L22 4\"/>"
		};
		const backdropStyles = {
			blur: "background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);",
			dark: "background:rgba(0,0,0,0.6);",
			transparent: "background:transparent;"
		};
		if (open) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"${attr_style(`opacity:${stringify(0)};transition:opacity 0.15s ease;`)}><div${attr_class(`fixed inset-0 ${stringify(classes?.overlay ?? "")}`)}${attr_style(`${stringify(backdropStyles[backdrop])}transition:opacity 0.15s ease;opacity:${stringify(0)};`)}></div> <div${attr_class(`relative z-10 w-full max-w-md rounded-2xl p-6 ${stringify(classes?.content ?? className)}`)}${attr_style(`background:var(--karbon-bg-card);border:1px solid var(--karbon-border); box-shadow:0 25px 60px -12px rgba(0,0,0,0.4); transform:${stringify("scale(0.95)")}; transition:transform 0.2s cubic-bezier(0.16,1,0.3,1); opacity:${stringify(0)};`)} role="alertdialog" aria-modal="true"><div class="flex flex-col items-center text-center"><div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"${attr_style(`background:color-mix(in srgb,${stringify(vc().bg)} 12%,transparent);`)}>`);
			if (icon) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span${attr_style(`color:${stringify(vc().text)};`)}>`);
				icon($$renderer);
				$$renderer.push(`<!----></span>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"${attr("stroke", vc().text)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${html(variantIcons[variant] || variantIcons.info)}</svg>`);
			}
			$$renderer.push(`<!--]--></div> <h3 class="text-lg font-semibold" style="color:var(--karbon-text);">${escape_html(title)}</h3> `);
			if (message) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="mt-2 text-sm leading-relaxed" style="color:var(--karbon-text-3);">${escape_html(message)}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (children) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="mt-4">`);
				children($$renderer);
				$$renderer.push(`<!----></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (confirmInput) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="mt-5 text-left"><label class="block text-xs font-medium mb-1.5" style="color:var(--karbon-text-2);">${escape_html(confirmInputLabelText())}</label> <input type="text"${attr("value", inputValue)}${attr("placeholder", confirmInputPlaceholder ?? confirmInput)} class="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-colors"${attr_style(`background:var(--karbon-bg-input);border:1px solid ${stringify(inputValue === confirmInput ? vc().bg : "var(--karbon-border-input)")};color:var(--karbon-text);`)}/> `);
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="mt-6 flex gap-3"><button${attr("disabled", loading, true)} class="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed" style="color:var(--karbon-text-2);border:1px solid var(--karbon-border);">${escape_html(cancelLabel)}</button> <button${attr("disabled", isConfirmDisabled(), true)} class="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"${attr_style(`background:${stringify(vc().btn)};`)}>`);
			if (loading) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> ${escape_html(confirmLabel)}</button></div></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { open });
	});
}
//#endregion
//#region ../packages/ui-svelte/src/overlay/Toast.svelte
function Toast($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { type = "info", variant = "default", color, title = "", message = "", duration = 5e3, dismissible = true, showProgress = true, position = "top-right", icon, action, class: className = "", classes = {}, onclose, children } = $$props;
		let progress = 100;
		const typeColors = {
			success: {
				bg: "var(--karbon-emerald-500)",
				text: "var(--karbon-emerald-400)",
				border: "var(--karbon-emerald-500)"
			},
			error: {
				bg: "var(--karbon-red-500)",
				text: "var(--karbon-red-400)",
				border: "var(--karbon-red-500)"
			},
			warning: {
				bg: "var(--karbon-amber-500)",
				text: "var(--karbon-amber-400)",
				border: "var(--karbon-amber-500)"
			},
			info: {
				bg: "var(--karbon-blue-500)",
				text: "var(--karbon-blue-400)",
				border: "var(--karbon-blue-500)"
			}
		};
		const tc = derived(() => color ? {
			bg: `var(--karbon-${color}-500)`,
			text: `var(--karbon-${color}-400)`,
			border: `var(--karbon-${color}-500)`
		} : typeColors[type]);
		const typeIcons = {
			success: "<path d=\"M22 11.08V12a10 10 0 1 1-5.93-9.14\"/><path d=\"m9 11 3 3L22 4\"/>",
			error: "<circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\"/><line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\"/>",
			warning: "<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/>",
			info: "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 16v-4\"/><path d=\"M12 8h.01\"/>"
		};
		const posStyles = {
			"top-right": "top:1rem;right:1rem;",
			"top-left": "top:1rem;left:1rem;",
			"top-center": "top:1rem;left:50%;transform:translateX(-50%);",
			"bottom-right": "bottom:1rem;right:1rem;",
			"bottom-left": "bottom:1rem;left:1rem;",
			"bottom-center": "bottom:1rem;left:50%;transform:translateX(-50%);"
		};
		const isTop = derived(() => position.startsWith("top"));
		const slideFrom = derived(() => isTop() ? "-20px" : "20px");
		const toastStyle = derived(() => {
			switch (variant) {
				case "filled": return `background:${tc().bg};color:white;border:none;`;
				case "bordered": return `background:var(--karbon-bg-card);color:var(--karbon-text);border-left:3px solid ${tc().border};border-top:1px solid var(--karbon-border);border-right:1px solid var(--karbon-border);border-bottom:1px solid var(--karbon-border);`;
				default: return `background:var(--karbon-bg-card);color:var(--karbon-text);border:1px solid var(--karbon-border);`;
			}
		});
		const iconColor = derived(() => variant === "filled" ? "white" : tc().text);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="fixed z-[60] w-full max-w-sm pointer-events-auto"${attr_style(posStyles[position])} role="alert" aria-live="assertive"><div${attr_class(`rounded-xl shadow-xl overflow-hidden ${stringify(classes?.root ?? className)}`)}${attr_style(`${stringify(toastStyle())} opacity:${stringify(0)}; transform:translateY(${stringify(slideFrom())}); transition:transform 0.25s cubic-bezier(0.16,1,0.3,1),opacity 0.2s ease;`)}><div class="flex items-start gap-3 px-4 py-3">`);
		if (icon !== false) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`shrink-0 mt-0.5 ${stringify(classes?.icon ?? "")}`)}>`);
			if (icon) {
				$$renderer.push("<!--[0-->");
				icon($$renderer);
				$$renderer.push(`<!---->`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"${attr("stroke", iconColor())} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${html(typeIcons[type] || typeIcons.info)}</svg>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="flex-1 min-w-0">`);
		if (title) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p${attr_class(`text-sm font-semibold ${stringify(message || children ? "mb-0.5" : "")}`)} style="color:white;">${escape_html(title)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (children) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="text-[13px]" style="color:rgba(255,255,255,0.75);">`);
			children($$renderer);
			$$renderer.push(`<!----></div>`);
		} else if (message) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<p class="text-[13px]" style="color:rgba(255,255,255,0.75);">${escape_html(message)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (action) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="mt-2">`);
			action($$renderer);
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (dismissible) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button aria-label="Fermer"${attr_class(`shrink-0 rounded-md p-0.5 transition-opacity opacity-50 hover:opacity-100 cursor-pointer ${stringify(classes?.close ?? "")}`)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (showProgress && duration > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`h-[2px] w-full ${stringify(classes?.progress ?? "")}`)}${attr_style(`background:color-mix(in srgb,${stringify(tc().bg)} 15%,transparent);`)}><div class="h-full transition-none"${attr_style(`width:${stringify(progress)}%;background:${stringify(variant === "filled" ? "rgba(255,255,255,0.4)" : tc().bg)};`)}></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div>`);
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/overlay/ImgBox.svelte
function ImgBox($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { images, index = 0, open = false, backdrop = "blur", captions = [], class: className = "", classes = {}, onclose } = $$props;
		let scale = 1;
		let translateX = 0;
		let translateY = 0;
		const backdropClasses = {
			blur: "bg-black/70 backdrop-blur-xl",
			dark: "bg-black/90",
			transparent: "bg-black/40 backdrop-blur-sm",
			none: ""
		};
		const hasPrev = derived(() => index > 0);
		const hasNext = derived(() => index < images.length - 1);
		const caption = derived(() => captions[index] ?? "");
		if (open && images.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div data-imgbox-root=""${attr_class(`imgbox-root ${stringify(classes?.root ?? className)}`, "svelte-hkftep")}${attr_style(`opacity: ${stringify(0)};`)}><div${attr_class(`imgbox-backdrop ${stringify(backdropClasses[backdrop])} ${stringify(classes?.backdrop ?? "")}`, "svelte-hkftep")} role="presentation"></div> <button aria-label="Fermer" class="imgbox-close svelte-hkftep"${attr_style(`opacity:${stringify(0)};transition:opacity 0.3s ease 0.15s,background 0.15s ease,color 0.15s ease;`)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button> `);
			if (hasPrev()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<button aria-label="Image precedente" class="imgbox-nav imgbox-nav-prev svelte-hkftep"${attr_style(`opacity:${stringify(0)};transition:opacity 0.3s ease 0.2s,background 0.15s ease,color 0.15s ease;`)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg></button>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (hasNext()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<button aria-label="Image suivante" class="imgbox-nav imgbox-nav-next svelte-hkftep"${attr_style(`opacity:${stringify(0)};transition:opacity 0.3s ease 0.2s,background 0.15s ease,color 0.15s ease;`)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg></button>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->  <div${attr_class(`imgbox-stage ${stringify(scale > 1 ? "cursor-grab" : "")} ${stringify("")}`, "svelte-hkftep")}><img${attr("src", images[index])}${attr("alt", caption() || `Image ${index + 1}`)}${attr_class(`imgbox-image ${stringify(classes?.image ?? "")}`, "svelte-hkftep")}${attr_style(` transform: scale(${stringify(.7)}) translate(${stringify(translateX / scale)}px, ${stringify(translateY / scale)}px); opacity: ${stringify(0)}; filter: ${stringify("blur(8px)")}; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, filter 0.3s ease; `)} draggable="false"/></div> `);
			if (caption()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="imgbox-caption svelte-hkftep"><span style="background:rgba(0,0,0,0.5);color:rgba(255,255,255,0.85);backdrop-filter:blur(8px);padding:6px 14px;border-radius:8px;font-size:13px;">${escape_html(caption())}</span></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (images.length > 1) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="imgbox-counter svelte-hkftep"><div style="display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.4);border-radius:9999px;padding:4px 12px;backdrop-filter:blur(8px);"><span style="color:rgba(255,255,255,0.5);font-size:12px;">${escape_html(index + 1)} / ${escape_html(images.length)}</span> <button${attr_style(`color:rgba(255,255,255,${stringify("0.4")});cursor:pointer;background:none;border:none;padding:2px;`)} aria-label="Afficher les miniatures"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect></svg></button></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="imgbox-controls svelte-hkftep"${attr_style(`opacity: ${stringify(0)};`)}><div class="flex items-center gap-1 bg-black/40 rounded-full px-3 py-1.5 svelte-hkftep"><button aria-label="Dezoomer" class="text-white/60 hover:text-white transition-colors cursor-pointer p-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line><line x1="8" x2="14" y1="11" y2="11"></line></svg></button> <span class="text-white/80 text-xs font-medium min-w-[3rem] text-center">${escape_html(Math.round(scale * 100))}%</span> <button aria-label="Zoomer" class="text-white/60 hover:text-white transition-colors cursor-pointer p-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line><line x1="11" x2="11" y1="8" y2="14"></line><line x1="8" x2="14" y1="11" y2="11"></line></svg></button> <button aria-label="Reinitialiser" class="text-white/60 hover:text-white transition-colors cursor-pointer p-1 ml-1 border-l border-white/20 pl-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg></button></div></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, {
			index,
			open
		});
	});
}
//#endregion
//#region ../packages/ui-svelte/src/layout/Card.svelte
function Card($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { variant = "default", padding = "md", hoverable = false, noPadding = false, title = "", icon: Icon, class: className = "", classes = {}, children, header, footer } = $$props;
		const variantClasses = {
			default: "bg-[var(--karbon-bg-card,#fff)] border border-[var(--karbon-border,rgba(0,0,0,0.07))] shadow-sm",
			elevated: "bg-[var(--karbon-bg-card,#fff)] border border-[var(--karbon-border,rgba(0,0,0,0.07))] shadow-lg",
			outlined: "border-2 border-[var(--karbon-border,rgba(0,0,0,0.07))]",
			ghost: "bg-transparent"
		};
		const paddingClasses = {
			none: "",
			sm: "p-3",
			md: "p-5",
			lg: "p-8"
		};
		const bodyPadding = derived(() => noPadding ? "" : paddingClasses[padding]);
		$$renderer.push(`<div${attr_class(`rounded-xl overflow-hidden ${stringify(variantClasses[variant])} ${stringify(hoverable ? "transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5" : "")} ${stringify(classes?.root ?? className)}`)}>`);
		if (header) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`px-5 py-3.5 border-b border-[var(--karbon-border,rgba(0,0,0,0.07))] ${stringify(classes?.header ?? "")}`)}>`);
			header($$renderer);
			$$renderer.push(`<!----></div>`);
		} else if (title) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<div${attr_class(`flex items-center gap-2 px-5 py-3.5 border-b border-[var(--karbon-border,rgba(0,0,0,0.07))] text-[var(--karbon-text-2,#5a567e)] text-[0.825rem] font-semibold ${stringify(classes?.header ?? "")}`)}>`);
			if (Icon) {
				$$renderer.push("<!--[0-->");
				if (Icon) {
					$$renderer.push("<!--[-->");
					Icon($$renderer, { class: "w-4 h-4" });
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <span>${escape_html(title)}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div${attr_class(`${stringify(bodyPadding())} ${stringify(classes?.body ?? "")}`)}>`);
		children($$renderer);
		$$renderer.push(`<!----></div> `);
		if (footer) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="px-5 py-3.5 border-t border-[var(--karbon-border,rgba(0,0,0,0.07))]">`);
			footer($$renderer);
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/layout/PageHeader.svelte
function PageHeader($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { title, description = "", icon, color, size = "md", variant = "default", backHref, backLabel = "Retour", badge, breadcrumbs, actions, class: className = "", classes = {} } = $$props;
		const accent = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		const accentLight = derived(() => color ? `var(--karbon-${color}-400)` : "var(--karbon-primary)");
		const sizeMap = {
			sm: {
				title: "text-lg",
				desc: "text-xs",
				iconBox: 32,
				iconSize: 16,
				pad: "pb-3",
				gap: "gap-2.5"
			},
			md: {
				title: "text-xl",
				desc: "text-sm",
				iconBox: 40,
				iconSize: 20,
				pad: "pb-4",
				gap: "gap-3"
			},
			lg: {
				title: "text-2xl",
				desc: "text-base",
				iconBox: 48,
				iconSize: 24,
				pad: "pb-5",
				gap: "gap-4"
			}
		};
		const s = derived(() => sizeMap[size]);
		function rootStyle() {
			switch (variant) {
				case "default": return `padding-bottom:${size === "sm" ? "0.75rem" : size === "lg" ? "1.25rem" : "1rem"};border-bottom:1px solid var(--karbon-border);margin-bottom:0.25rem;`;
				case "bordered": return `padding:${size === "sm" ? "0.75rem" : size === "lg" ? "1.25rem" : "1rem"};border:1px solid var(--karbon-border);border-radius:0.75rem;background:var(--karbon-bg-card);`;
				case "filled": return `padding:${size === "sm" ? "0.75rem" : size === "lg" ? "1.5rem" : "1rem"};border-radius:0.75rem;background:color-mix(in srgb,${accent()} 8%,transparent);border:1px solid color-mix(in srgb,${accent()} 15%,transparent);`;
				case "clean": return "";
				default: return "";
			}
		}
		$$renderer.push(`<div${attr_class(classes?.root ?? className)}${attr_style(rootStyle())}>`);
		if (breadcrumbs && breadcrumbs.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<nav${attr_class(`flex items-center gap-1.5 mb-2 ${stringify(classes?.breadcrumb ?? "")}`)} aria-label="Breadcrumb"><!--[-->`);
			const each_array = ensure_array_like(breadcrumbs);
			for (let i = 0, $$length = each_array.length; i < $$length; i++) {
				let crumb = each_array[i];
				if (i > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--karbon-text-4);"><path d="m9 18 6-6-6-6"></path></svg>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (crumb.href && i < breadcrumbs.length - 1) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<a${attr("href", crumb.href)} class="text-xs transition-colors" style="color:var(--karbon-text-3);">${escape_html(crumb.label)}</a>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<span class="text-xs font-medium" style="color:var(--karbon-text-2);">${escape_html(crumb.label)}</span>`);
				}
				$$renderer.push(`<!--]-->`);
			}
			$$renderer.push(`<!--]--></nav>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (backHref) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<a${attr("href", backHref)} class="inline-flex items-center gap-1.5 text-xs font-medium mb-2 transition-colors" style="color:var(--karbon-text-3);"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg> ${escape_html(backLabel)}</a>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div${attr_class(`flex items-start ${stringify(s().gap)}`)}>`);
		if (icon) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`shrink-0 rounded-xl flex items-center justify-center ${stringify(classes?.icon ?? "")}`)}${attr_style(`width:${stringify(s().iconBox)}px;height:${stringify(s().iconBox)}px;background:color-mix(in srgb,${stringify(accent())} 12%,transparent);color:${stringify(accentLight())};`)}>`);
			icon($$renderer);
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="flex-1 min-w-0"><div class="flex items-center gap-2"><h1${attr_class(`${stringify(s().title)} font-bold ${stringify(classes?.title ?? "")}`)} style="color:var(--karbon-text);margin:0;">${escape_html(title)}</h1> `);
		if (badge) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="rounded-full px-2 py-0.5 text-[10px] font-semibold"${attr_style(`background:color-mix(in srgb,${stringify(accent())} 15%,transparent);color:${stringify(accentLight())};`)}>${escape_html(badge)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (description) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p${attr_class(`${stringify(s().desc)} mt-1 ${stringify(classes?.description ?? "")}`)} style="color:var(--karbon-text-3);margin:0;">${escape_html(description)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (actions) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`shrink-0 flex items-center gap-2 ${stringify(classes?.actions ?? "")}`)}>`);
			actions($$renderer);
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/layout/EmptyState.svelte
function EmptyState($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { title, description = "", icon, color, size = "md", variant = "default", actions, illustration, class: className = "", classes = {} } = $$props;
		const accent = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		const accentLight = derived(() => color ? `var(--karbon-${color}-400)` : "var(--karbon-text-4)");
		const sizeMap = {
			sm: {
				py: "py-8",
				title: "text-sm",
				desc: "text-xs",
				iconBox: 40,
				iconSize: 20,
				maxW: "18rem",
				gap: "gap-2"
			},
			md: {
				py: "py-12",
				title: "text-base",
				desc: "text-sm",
				iconBox: 52,
				iconSize: 24,
				maxW: "22rem",
				gap: "gap-3"
			},
			lg: {
				py: "py-16",
				title: "text-lg",
				desc: "text-base",
				iconBox: 64,
				iconSize: 28,
				maxW: "26rem",
				gap: "gap-4"
			}
		};
		const s = derived(() => sizeMap[size]);
		function rootStyle() {
			switch (variant) {
				case "bordered": return `border:1px solid var(--karbon-border);border-radius:0.75rem;background:var(--karbon-bg-card);`;
				case "filled": return `border-radius:0.75rem;background:color-mix(in srgb,${accent()} 5%,transparent);border:1px solid color-mix(in srgb,${accent()} 10%,transparent);`;
				case "minimal": return "";
				default: return "";
			}
		}
		$$renderer.push(`<div${attr_class(`text-center ${stringify(s().py)} px-6 ${stringify(classes?.root ?? className)}`)}${attr_style(rootStyle())}>`);
		if (illustration) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="mb-4 flex justify-center">`);
			illustration($$renderer);
			$$renderer.push(`<!----></div>`);
		} else if (icon) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<div${attr_class(`mx-auto mb-4 rounded-2xl flex items-center justify-center ${stringify(classes?.icon ?? "")}`)}${attr_style(`width:${stringify(s().iconBox)}px;height:${stringify(s().iconBox)}px;background:color-mix(in srgb,${stringify(accent())} 10%,transparent);color:${stringify(accentLight())};`)}>`);
			icon($$renderer);
			$$renderer.push(`<!----></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attr_class(`mx-auto mb-4 rounded-2xl flex items-center justify-center ${stringify(classes?.icon ?? "")}`)}${attr_style(`width:${stringify(s().iconBox)}px;height:${stringify(s().iconBox)}px;background:var(--karbon-nav-hover-bg);color:var(--karbon-text-4);`)}><svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().iconSize)}${attr("height", s().iconSize)} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg></div>`);
		}
		$$renderer.push(`<!--]--> <p${attr_class(`${stringify(s().title)} font-semibold ${stringify(classes?.title ?? "")}`)} style="color:var(--karbon-text);margin:0;">${escape_html(title)}</p> `);
		if (description) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p${attr_class(`${stringify(s().desc)} mt-1.5 mx-auto ${stringify(classes?.description ?? "")}`)}${attr_style(`color:var(--karbon-text-3);margin-top:0.375rem;max-width:${stringify(s().maxW)};`)}>${escape_html(description)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (actions) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`mt-5 flex items-center justify-center ${stringify(s().gap)} ${stringify(classes?.actions ?? "")}`)}>`);
			actions($$renderer);
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/code/CodeBlock.svelte
function CodeBlock($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { code, language = "text", title = "", showLineNumbers = true, showCopy = true, showLanguage = true, highlightLines = [], lineCopy = false, maxHeight = "500px", wrap = false, color, variant = "default", class: className = "", classes = {} } = $$props;
		let copiedLine = -1;
		const accent = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		const lines = derived(() => code.split("\n"));
		const C = {
			kw: "color:#a78bfa;font-weight:500",
			fn: "color:#60a5fa",
			str: "color:#34d399",
			num: "color:#fbbf24",
			com: "color:#6b7280;font-style:italic",
			type: "color:#22d3ee",
			op: "color:#f472b6",
			tag: "color:#f87171",
			attr: "color:#fbbf24",
			deco: "color:#fbbf24;font-style:italic",
			prop: "color:#67e8f9",
			bool: "color:#fbbf24;font-weight:500",
			builtin: "color:#22d3ee",
			var: "color:#fca5a5",
			punct: "color:#9ca3af"
		};
		const sp = (cls, text) => `<span style="${cls}">${text}</span>`;
		function highlight(line, lang) {
			if (lang === "text" || lang === "plain" || !line.trim()) return escapeHtml(line);
			const l = {
				javascript: "js",
				typescript: "ts",
				jsx: "js",
				tsx: "ts",
				sh: "bash",
				scss: "css",
				xml: "html"
			}[lang] || lang;
			const keywordSets = {
				js: new Set([
					"const",
					"let",
					"var",
					"function",
					"return",
					"if",
					"else",
					"for",
					"while",
					"do",
					"class",
					"import",
					"export",
					"from",
					"default",
					"async",
					"await",
					"new",
					"this",
					"super",
					"try",
					"catch",
					"throw",
					"finally",
					"typeof",
					"instanceof",
					"switch",
					"case",
					"break",
					"continue",
					"of",
					"in",
					"yield",
					"delete",
					"void"
				]),
				ts: new Set([
					"const",
					"let",
					"var",
					"function",
					"return",
					"if",
					"else",
					"for",
					"while",
					"do",
					"class",
					"import",
					"export",
					"from",
					"default",
					"async",
					"await",
					"new",
					"this",
					"super",
					"try",
					"catch",
					"throw",
					"finally",
					"typeof",
					"instanceof",
					"interface",
					"type",
					"enum",
					"as",
					"extends",
					"implements",
					"abstract",
					"readonly",
					"declare",
					"keyof",
					"infer",
					"is",
					"satisfies",
					"namespace"
				]),
				python: new Set([
					"def",
					"class",
					"return",
					"if",
					"elif",
					"else",
					"for",
					"while",
					"import",
					"from",
					"as",
					"try",
					"except",
					"finally",
					"with",
					"yield",
					"lambda",
					"pass",
					"raise",
					"del",
					"global",
					"nonlocal",
					"assert",
					"break",
					"continue",
					"and",
					"or",
					"not",
					"in",
					"is"
				]),
				rust: new Set([
					"fn",
					"let",
					"mut",
					"const",
					"struct",
					"enum",
					"impl",
					"trait",
					"pub",
					"use",
					"mod",
					"crate",
					"if",
					"else",
					"for",
					"while",
					"loop",
					"match",
					"return",
					"self",
					"Self",
					"async",
					"await",
					"where",
					"type",
					"move",
					"ref",
					"static",
					"unsafe",
					"extern",
					"dyn",
					"as",
					"in"
				]),
				go: new Set([
					"func",
					"var",
					"const",
					"type",
					"struct",
					"interface",
					"return",
					"if",
					"else",
					"for",
					"range",
					"switch",
					"case",
					"import",
					"package",
					"defer",
					"go",
					"chan",
					"select",
					"map",
					"make",
					"nil",
					"fallthrough",
					"break",
					"continue",
					"default"
				]),
				php: new Set([
					"function",
					"class",
					"return",
					"if",
					"else",
					"elseif",
					"foreach",
					"for",
					"while",
					"new",
					"public",
					"private",
					"protected",
					"static",
					"use",
					"namespace",
					"echo",
					"require",
					"include",
					"extends",
					"implements",
					"abstract",
					"final",
					"match",
					"throw",
					"try",
					"catch"
				]),
				bash: new Set([
					"if",
					"then",
					"else",
					"elif",
					"fi",
					"for",
					"do",
					"done",
					"while",
					"until",
					"case",
					"esac",
					"in",
					"function",
					"return",
					"local",
					"declare",
					"echo",
					"exit",
					"export",
					"source",
					"set"
				]),
				sql: new Set([
					"SELECT",
					"FROM",
					"WHERE",
					"INSERT",
					"UPDATE",
					"DELETE",
					"CREATE",
					"TABLE",
					"ALTER",
					"DROP",
					"JOIN",
					"LEFT",
					"RIGHT",
					"INNER",
					"ON",
					"AND",
					"OR",
					"NOT",
					"ORDER",
					"BY",
					"GROUP",
					"HAVING",
					"LIMIT",
					"AS",
					"INTO",
					"VALUES",
					"SET",
					"COUNT",
					"MAX",
					"MIN",
					"AVG",
					"SUM",
					"DISTINCT",
					"BETWEEN",
					"LIKE",
					"IN",
					"EXISTS",
					"CASE",
					"WHEN",
					"THEN",
					"ELSE",
					"END",
					"NULL",
					"IS"
				]),
				css: new Set(["important"]),
				html: /* @__PURE__ */ new Set(),
				svelte: new Set([
					"const",
					"let",
					"function",
					"return",
					"if",
					"else",
					"each",
					"await",
					"then",
					"catch",
					"import",
					"export",
					"from",
					"as",
					"snippet",
					"render"
				])
			};
			const builtins = {
				js: new Set([
					"console",
					"document",
					"window",
					"Math",
					"JSON",
					"Object",
					"Array",
					"Promise",
					"Map",
					"Set",
					"Error",
					"RegExp",
					"Date",
					"parseInt",
					"parseFloat",
					"setTimeout",
					"setInterval",
					"fetch",
					"require",
					"undefined",
					"NaN",
					"Infinity"
				]),
				ts: new Set([
					"console",
					"document",
					"window",
					"Math",
					"JSON",
					"Object",
					"Array",
					"Promise",
					"Map",
					"Set",
					"Error",
					"RegExp",
					"Date",
					"parseInt",
					"parseFloat",
					"setTimeout",
					"setInterval",
					"fetch",
					"require",
					"undefined",
					"NaN",
					"Infinity",
					"Record",
					"Partial",
					"Required",
					"Pick",
					"Omit",
					"Readonly"
				]),
				python: new Set([
					"print",
					"len",
					"range",
					"int",
					"str",
					"float",
					"list",
					"dict",
					"tuple",
					"set",
					"bool",
					"type",
					"isinstance",
					"super",
					"open",
					"enumerate",
					"zip",
					"map",
					"filter",
					"sorted",
					"reversed",
					"any",
					"all",
					"input",
					"format",
					"hasattr",
					"getattr",
					"setattr",
					"True",
					"False",
					"None"
				]),
				rust: new Set([
					"println",
					"eprintln",
					"format",
					"vec",
					"Box",
					"Rc",
					"Arc",
					"Option",
					"Result",
					"Ok",
					"Err",
					"Some",
					"None",
					"String",
					"Vec",
					"HashMap",
					"HashSet",
					"BTreeMap",
					"anyhow"
				]),
				go: new Set([
					"fmt",
					"log",
					"http",
					"io",
					"os",
					"strings",
					"strconv",
					"errors",
					"context",
					"sync",
					"time",
					"nil"
				])
			};
			const booleans = new Set([
				"true",
				"false",
				"null",
				"undefined",
				"nil",
				"None",
				"True",
				"False",
				"NaN",
				"Infinity"
			]);
			const kw = keywordSets[l] || keywordSets.js || /* @__PURE__ */ new Set();
			const bi = builtins[l] || /* @__PURE__ */ new Set();
			const trimmed = line.trimStart();
			if ([
				"js",
				"ts",
				"svelte",
				"java",
				"c",
				"cpp",
				"go",
				"rust",
				"php"
			].includes(l) && trimmed.startsWith("//")) return sp(C.com, escapeHtml(line));
			if ([
				"python",
				"ruby",
				"bash",
				"yaml",
				"toml"
			].includes(l) && trimmed.startsWith("#")) return sp(C.com, escapeHtml(line));
			if (["sql"].includes(l) && trimmed.startsWith("--")) return sp(C.com, escapeHtml(line));
			const tokens = [];
			let i = 0;
			while (i < line.length) {
				const ch = line[i];
				const rest = line.slice(i);
				if (rest.startsWith("//") && [
					"js",
					"ts",
					"svelte",
					"go",
					"rust",
					"java",
					"c",
					"cpp",
					"php"
				].includes(l)) {
					tokens.push({
						type: "comment",
						text: line.slice(i)
					});
					break;
				}
				if (ch === "#" && [
					"python",
					"bash",
					"ruby",
					"yaml",
					"toml"
				].includes(l)) {
					tokens.push({
						type: "comment",
						text: line.slice(i)
					});
					break;
				}
				if (ch === "\"" || ch === "'" || ch === "`") {
					let end = i + 1;
					while (end < line.length && line[end] !== ch) {
						if (line[end] === "\\") end++;
						end++;
					}
					tokens.push({
						type: "string",
						text: line.slice(i, end + 1)
					});
					i = end + 1;
					continue;
				}
				if (/\d/.test(ch) && (i === 0 || /[\s,;:(=+\-*/<>!&|^~%]/.test(line[i - 1]))) {
					let end = i;
					while (end < line.length && /[\d.xXa-fA-F_]/.test(line[end])) end++;
					if (end < line.length && /[a-z%]/.test(line[end])) while (end < line.length && /[a-z%]/.test(line[end])) end++;
					tokens.push({
						type: "number",
						text: line.slice(i, end)
					});
					i = end;
					continue;
				}
				if (/[a-zA-Z_$@]/.test(ch)) {
					let end = i;
					if (ch === "@") end++;
					while (end < line.length && /[\w$]/.test(line[end])) end++;
					const word = line.slice(i, end);
					if (ch === "$" && ["php", "bash"].includes(l)) tokens.push({
						type: "variable",
						text: word
					});
					else if (ch === "@") tokens.push({
						type: "decorator",
						text: word
					});
					else if (kw.has(word) || l === "sql" && kw.has(word.toUpperCase())) tokens.push({
						type: "keyword",
						text: word
					});
					else if (booleans.has(word)) tokens.push({
						type: "boolean",
						text: word
					});
					else if (bi.has(word)) tokens.push({
						type: "builtin",
						text: word
					});
					else if (/^[A-Z]/.test(word) && word.length > 1) tokens.push({
						type: "type",
						text: word
					});
					else if (end < line.length && line[end] === "(") tokens.push({
						type: "function",
						text: word
					});
					else tokens.push({
						type: "ident",
						text: word
					});
					i = end;
					continue;
				}
				const op2 = line.slice(i, i + 3);
				const op1 = line.slice(i, i + 2);
				if ([
					"===",
					"!==",
					"...",
					"<<=",
					">>="
				].includes(op2)) {
					tokens.push({
						type: "operator",
						text: op2
					});
					i += 3;
					continue;
				}
				if ([
					"=>",
					"==",
					"!=",
					"<=",
					">=",
					"&&",
					"||",
					"??",
					"?.",
					"::",
					"->",
					"..",
					"+=",
					"-=",
					"*=",
					"/=",
					"%=",
					"|=",
					"&=",
					"<<",
					">>"
				].includes(op1)) {
					tokens.push({
						type: "operator",
						text: op1
					});
					i += 2;
					continue;
				}
				if ("=+-*/%<>!&|^~?:".includes(ch)) {
					tokens.push({
						type: "operator",
						text: ch
					});
					i++;
					continue;
				}
				if (ch === ".") {
					tokens.push({
						type: "punct",
						text: "."
					});
					i++;
					continue;
				}
				if ("{}[]();,".includes(ch)) {
					tokens.push({
						type: "punct",
						text: ch
					});
					i++;
					continue;
				}
				if (ch === "<" && [
					"html",
					"svelte",
					"jsx",
					"tsx"
				].includes(l)) {
					const tagMatch = rest.match(/^(<\/?)([\w-]+)/);
					if (tagMatch) {
						tokens.push({
							type: "punct",
							text: tagMatch[1]
						});
						tokens.push({
							type: "tag",
							text: tagMatch[2]
						});
						i += tagMatch[0].length;
						continue;
					}
				}
				if (/\s/.test(ch)) {
					let end = i;
					while (end < line.length && /\s/.test(line[end])) end++;
					tokens.push({
						type: "space",
						text: line.slice(i, end)
					});
					i = end;
					continue;
				}
				tokens.push({
					type: "text",
					text: ch
				});
				i++;
			}
			return tokens.map((t) => {
				const escaped = escapeHtml(t.text);
				switch (t.type) {
					case "keyword": return sp(C.kw, escaped);
					case "function": return sp(C.fn, escaped);
					case "string": return sp(C.str, escaped);
					case "number": return sp(C.num, escaped);
					case "comment": return sp(C.com, escaped);
					case "type": return sp(C.type, escaped);
					case "operator": return sp(C.op, escaped);
					case "boolean": return sp(C.bool, escaped);
					case "builtin": return sp(C.builtin, escaped);
					case "variable": return sp(C.var, escaped);
					case "decorator": return sp(C.deco, escaped);
					case "tag": return sp(C.tag, escaped);
					case "punct": return sp(C.punct, escaped);
					case "prop": return sp(C.prop, escaped);
					default: return escaped;
				}
			}).join("");
		}
		function escapeHtml(str) {
			return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
		}
		const langLabels = {
			js: "JavaScript",
			javascript: "JavaScript",
			ts: "TypeScript",
			typescript: "TypeScript",
			jsx: "JSX",
			tsx: "TSX",
			html: "HTML",
			css: "CSS",
			scss: "SCSS",
			python: "Python",
			rust: "Rust",
			go: "Go",
			php: "PHP",
			sql: "SQL",
			bash: "Bash",
			sh: "Shell",
			json: "JSON",
			yaml: "YAML",
			toml: "TOML",
			xml: "XML",
			svelte: "Svelte",
			text: "Text",
			plain: "Plain",
			java: "Java",
			c: "C",
			cpp: "C++",
			ruby: "Ruby",
			swift: "Swift",
			kotlin: "Kotlin"
		};
		const langLabel = derived(() => langLabels[language] || language);
		function rootStyle() {
			switch (variant) {
				case "default": return "background:var(--karbon-bg-2);border:1px solid var(--karbon-border);";
				case "bordered": return `background:var(--karbon-bg-card);border:1px solid ${accent()};`;
				case "filled": return `background:color-mix(in srgb,${accent()} 6%,transparent);border:1px solid color-mix(in srgb,${accent()} 15%,transparent);`;
				case "minimal": return "background:transparent;border:none;";
				default: return "";
			}
		}
		$$renderer.push(`<div${attr_class(`rounded-xl overflow-hidden ${stringify(classes?.root ?? className)}`, "svelte-1wvorsi")}${attr_style(rootStyle())}>`);
		if (title || showLanguage || showCopy) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`flex items-center gap-2 px-4 py-2 ${stringify(classes?.header ?? "")}`, "svelte-1wvorsi")} style="border-bottom:1px solid var(--karbon-border);">`);
			if (title) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span style="font-size:12px;font-weight:600;color:var(--karbon-text);">${escape_html(title)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (showLanguage) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span${attr_style(`font-size:10px;font-weight:600;padding:2px 6px;border-radius:4px; background:color-mix(in srgb,${stringify(accent())} 12%,transparent);color:${stringify(accent())}; text-transform:uppercase;letter-spacing:0.04em;`)}>${escape_html(langLabel())}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div style="flex:1;"></div> `);
			if (showCopy) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<button type="button"${attr_style(`display:flex;align-items:center;gap:4px;padding:3px 8px;border-radius:6px;border:none; font-size:11px;font-weight:500;cursor:pointer;transition:all 0.15s; background:${stringify("var(--karbon-bg-card)")}; color:${stringify("var(--karbon-text-3)")};`)} aria-label="Copier le code">`);
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg> Copier`);
				$$renderer.push(`<!--]--></button>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div${attr_style(`overflow:auto;max-height:${stringify(maxHeight)};${stringify(classes?.code ?? "")}`)}><pre style="margin:0;padding:0;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:13px;line-height:1.6;"><code><!--[-->`);
		const each_array = ensure_array_like(lines());
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let line = each_array[i];
			$$renderer.push(`<div${attr_class(`karbon-code-line ${stringify(classes?.line ?? "")}`, "svelte-1wvorsi")}${attr_style(`display:flex;position:relative;${stringify(highlightLines.includes(i + 1) ? `background:color-mix(in srgb,${accent()} 10%,transparent);` : "")}${stringify(wrap ? "white-space:pre-wrap;word-break:break-all;" : "white-space:pre;")}`)}>`);
			if (showLineNumbers) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span${attr_style(`display:inline-block;min-width:3ch;padding:0 12px 0 16px;text-align:right;color:${stringify(highlightLines.includes(i + 1) ? accent() : "var(--karbon-text-4)")};user-select:none;flex-shrink:0;font-size:12px;`)}>${escape_html(i + 1)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--><span${attr_style(`padding:0 ${stringify(lineCopy ? "36px" : "16px")} 0 ${stringify(showLineNumbers ? "0" : "16px")};flex:1;color:var(--karbon-text);`)}>${html(highlight(line, language))}</span>`);
			if (lineCopy && line.trim()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<button type="button" class="karbon-code-line-copy svelte-1wvorsi"${attr_style(`position:absolute;right:10px;top:50%;transform:translateY(-50%); display:flex;align-items:center;justify-content:center; width:22px;height:22px;border-radius:5px;border:none;cursor:pointer; transition:all 0.1s;opacity:0; background:${stringify(copiedLine === i ? "color-mix(in srgb, var(--karbon-emerald-500) 20%, transparent)" : "var(--karbon-bg-card)")}; color:${stringify(copiedLine === i ? "var(--karbon-emerald-400)" : "var(--karbon-text-4)")};`)}${attr("aria-label", `Copier la ligne ${stringify(i + 1)}`)}>`);
				if (copiedLine === i) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>`);
				}
				$$renderer.push(`<!--]--></button>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></code></pre></div></div>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/image/ImgZoom.svelte
function ImgZoom($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { src, zoomSrc, alt = "", zoom = 2.5, trigger = "hover", mode = "overlay", lensSize = 120, rounded = "md", showHint = true, color, width, height, class: className = "", classes = {} } = $$props;
		derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		derived(() => zoomSrc || src);
		const roundedMap = {
			none: "0",
			sm: "0.25rem",
			md: "0.5rem",
			lg: "0.75rem",
			xl: "1rem",
			full: "9999px"
		};
		const rad = derived(() => roundedMap[rounded]);
		$$renderer.push(`<div${attr_class(`karbon-imgzoom relative overflow-hidden inline-block ${stringify(classes?.root ?? className)}`)}${attr_style(`border-radius:${stringify(rad())};${stringify(width ? `width:${width};` : "")}${stringify(height ? `height:${height};` : "")}cursor:${stringify(trigger === "click" ? "zoom-in" : "crosshair")};`)} role="img"${attr("aria-label", alt || "Image zoomable")}${attr("tabindex", 0)}><img${attr("src", src)}${attr("alt", alt)}${attr_class(`w-full h-full object-cover block transition-transform duration-200 ${stringify(classes?.img ?? "")}`)}${attr_style("")} loading="lazy" draggable="false"/> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->  `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/image/ImageCompare.svelte
function ImageCompare($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { before, after, beforeLabel = "Avant", afterLabel = "Apres", initialPosition = 50, orientation = "horizontal", color, rounded = "lg", showLabels = true, showHandle = true, width, height, class: className = "", classes = {} } = $$props;
		let position = initialPosition;
		const accent = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		const isHorizontal = derived(() => orientation === "horizontal");
		const roundedMap = {
			none: "0",
			sm: "0.25rem",
			md: "0.5rem",
			lg: "0.75rem",
			xl: "1rem"
		};
		const rad = derived(() => roundedMap[rounded]);
		$$renderer.push(`<div${attr_class(`karbon-imgcompare relative select-none overflow-hidden ${stringify(classes?.root ?? className)}`)}${attr_style(`border-radius:${stringify(rad())};${stringify(width ? `width:${width};` : "width:100%;")}${stringify(height ? `height:${height};` : "")}aspect-ratio:${stringify(height ? "auto" : "16/10")};cursor:${stringify("col-resize")};`)} role="slider"${attr("aria-valuenow", Math.round(position))}${attr("aria-valuemin", 0)}${attr("aria-valuemax", 100)} aria-label="Comparateur d'images"${attr("tabindex", 0)}><img${attr("src", after)}${attr("alt", afterLabel)}${attr_class(`absolute inset-0 w-full h-full object-cover ${stringify(classes?.after ?? "")}`)} draggable="false"/> <img${attr("src", before)}${attr("alt", beforeLabel)}${attr_class(`absolute inset-0 w-full h-full object-cover ${stringify(classes?.before ?? "")}`)}${attr_style(`clip-path:${stringify(isHorizontal() ? `inset(0 ${100 - position}% 0 0)` : `inset(0 0 ${100 - position}% 0)`)};`)} draggable="false"/> <div class="absolute"${attr_style(`${stringify(isHorizontal() ? `left:${position}%;top:0;bottom:0;width:2px;transform:translateX(-1px);` : `top:${position}%;left:0;right:0;height:2px;transform:translateY(-1px);`)}background:${stringify(accent())};z-index:5;pointer-events:none;`)}></div> `);
		if (showHandle) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="absolute z-10"${attr_style(`${stringify(isHorizontal() ? `left:${position}%;top:50%;transform:translate(-50%,-50%);` : `top:${position}%;left:50%;transform:translate(-50%,-50%);`)}pointer-events:none;`)}><div${attr_class(`rounded-full flex items-center justify-center shadow-lg ${stringify(classes?.handle ?? "")}`)}${attr_style(`width:36px;height:36px;background:${stringify(accent())};color:white;box-shadow:0 2px 10px rgba(0,0,0,0.3),0 0 0 3px rgba(255,255,255,0.3);`)}>`);
			if (isHorizontal()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15-5-5 5-5"></path><path d="m17 9 5 5-5 5"></path></svg>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 7-5-5-5 5"></path><path d="m9 17 5 5 5-5"></path></svg>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (showLabels) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`absolute z-5 pointer-events-none ${stringify(classes?.label ?? "")}`)}${attr_style(isHorizontal() ? "top:12px;left:12px;" : "top:12px;left:12px;")}><span class="rounded-md px-2 py-1 text-[11px] font-semibold" style="background:rgba(0,0,0,0.5);color:white;backdrop-filter:blur(4px);">${escape_html(beforeLabel)}</span></div> <div${attr_class(`absolute z-5 pointer-events-none ${stringify(classes?.label ?? "")}`)}${attr_style(isHorizontal() ? "top:12px;right:12px;" : "bottom:12px;right:12px;")}><span class="rounded-md px-2 py-1 text-[11px] font-semibold" style="background:rgba(0,0,0,0.5);color:white;backdrop-filter:blur(4px);">${escape_html(afterLabel)}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/carousel/Carousel.svelte
function Carousel($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** Image URLs for simple image carousel */
		/** Number of slides to show at once */
		/** Gap between slides in px */
		/** Peek amount — show edges of prev/next slides */
		/** Transition mode */
		/** Custom slides via snippet — receives (index, goTo, total) */
		/** Alternative: render function per slide index */
		/** Total slides when using slot mode */
		let { images = [], slidesPerView = 1, gap = 0, peek = 0, transition = "slide", autoplay = 0, loop = false, arrows = true, indicators = true, color, rounded = "lg", aspectRatio, draggable = true, class: className = "", classes = {}, onchange, slide, total: totalProp, children } = $$props;
		let current = 0;
		let trackEl;
		let dragDelta = 0;
		const accent = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		const roundedMap = {
			none: "0",
			sm: "0.25rem",
			md: "0.5rem",
			lg: "0.75rem",
			xl: "1rem"
		};
		const rad = derived(() => roundedMap[rounded]);
		const total = derived(() => totalProp ?? images.length);
		const maxIndex = derived(() => Math.max(0, total() - slidesPerView));
		const hasPrev = derived(() => loop || current > 0);
		const hasNext = derived(() => loop || current < maxIndex());
		derived(() => !!slide || !!children);
		const slideWidth = derived(() => 100 / slidesPerView);
		const trackOffset = derived(() => {
			if (transition === "fade") return 0;
			const peekOffset = peek > 0 ? peek : 0;
			return -(current * slideWidth()) + (peekOffset > 0 ? peekOffset / (trackEl?.offsetWidth || 1) * 100 : 0);
		});
		$$renderer.push(`<div role="region" aria-label="Carousel" aria-roledescription="carousel"${attr_class(`relative overflow-hidden ${stringify(classes?.root ?? className)}`)}${attr_style(`border-radius:${stringify(rad())};`)}${attr("tabindex", 0)}>`);
		if (children) {
			$$renderer.push("<!--[0-->");
			children($$renderer);
			$$renderer.push(`<!---->`);
		} else if (transition === "fade") {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<div${attr_class(`relative ${stringify(classes?.track ?? "")}`)}${attr_style(aspectRatio ? `aspect-ratio:${aspectRatio};` : "")}><!--[-->`);
			const each_array = ensure_array_like(Array(total()));
			for (let i = 0, $$length = each_array.length; i < $$length; i++) {
				each_array[i];
				$$renderer.push(`<div${attr_class(`absolute inset-0 transition-opacity duration-500 ${stringify(classes?.slide ?? "")}`)}${attr_style(`opacity:${stringify(i === current ? 1 : 0)};z-index:${stringify(i === current ? 1 : 0)};`)}>`);
				if (slide) {
					$$renderer.push("<!--[0-->");
					slide($$renderer, i);
					$$renderer.push(`<!---->`);
				} else if (images[i]) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<img${attr("src", images[i])}${attr("alt", `Slide ${stringify(i + 1)}`)} class="w-full h-full object-cover" loading="lazy" draggable="false"/>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attr_class(`flex ${stringify(classes?.track ?? "")}`)}${attr_style(`transform:translateX(calc(${stringify(trackOffset())}% + ${stringify(dragDelta)}px));transition:${stringify("transform 0.4s cubic-bezier(0.16,1,0.3,1)")};gap:${stringify(gap)}px;${stringify(peek ? `padding:0 ${peek}px;` : "")}`)}><!--[-->`);
			const each_array_1 = ensure_array_like(Array(total()));
			for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
				each_array_1[i];
				$$renderer.push(`<div${attr_class(`shrink-0 ${stringify(classes?.slide ?? "")}`)}${attr_style(`width:calc(${stringify(slideWidth())}% - ${stringify(gap * (slidesPerView - 1) / slidesPerView)}px);${stringify(aspectRatio ? `aspect-ratio:${aspectRatio};` : "")}cursor:${stringify(draggable ? "grab" : "default")};`)}>`);
				if (slide) {
					$$renderer.push("<!--[0-->");
					slide($$renderer, i);
					$$renderer.push(`<!---->`);
				} else if (images[i]) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<img${attr("src", images[i])}${attr("alt", `Slide ${stringify(i + 1)}`)} class="w-full h-full object-cover select-none"${attr_style(`border-radius:${stringify(slidesPerView > 1 ? rad() : "0")};`)} loading="lazy" draggable="false"/>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--> `);
		if (arrows && total() > slidesPerView) {
			$$renderer.push("<!--[0-->");
			if (hasPrev()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<button aria-label="Precedent"${attr_class(`absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2.5 transition-all cursor-pointer ${stringify(classes?.arrow ?? "")}`)} style="background:rgba(0,0,0,0.4);color:white;backdrop-filter:blur(4px);"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg></button>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (hasNext()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<button aria-label="Suivant"${attr_class(`absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2.5 transition-all cursor-pointer ${stringify(classes?.arrow ?? "")}`)} style="background:rgba(0,0,0,0.4);color:white;backdrop-filter:blur(4px);"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg></button>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (indicators && total() > 1) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 ${stringify(classes?.indicators ?? "")}`)}><!--[-->`);
			const each_array_2 = ensure_array_like(Array(Math.min(total(), total() - slidesPerView + 1)));
			for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
				each_array_2[i];
				$$renderer.push(`<button${attr("aria-label", `Slide ${stringify(i + 1)}`)} class="rounded-full transition-all duration-300 cursor-pointer"${attr_style(`width:${stringify(i === current ? "20px" : "8px")};height:8px;background:${stringify(i === current ? accent() : "rgba(255,255,255,0.4)")};`)}></button>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/dropdown/Dropdown.svelte
function Dropdown($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { items, align = "left", position = "bottom", width = "14rem", color, searchable = false, searchPlaceholder = "Rechercher...", class: className = "", classes = {}, trigger, onselect } = $$props;
		derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		const filteredItems = derived(() => items);
		derived(() => {
			const groups = [];
			let currentGroup = null;
			for (const item of filteredItems()) {
				if (item.group && item.group !== currentGroup) {
					currentGroup = item.group;
					groups.push({
						label: currentGroup,
						items: []
					});
				}
				if (groups.length === 0) groups.push({
					label: null,
					items: []
				});
				groups[groups.length - 1].items.push(item);
			}
			return groups;
		});
		derived(() => position === "top" ? "bottom-full mb-1" : "top-full mt-1");
		derived(() => align === "right" ? "right-0" : "left-0");
		$$renderer.push(`<div${attr_class(`relative inline-block ${stringify(classes?.root ?? className)}`)}><button type="button" class="cursor-pointer bg-transparent border-none p-0 m-0">`);
		trigger($$renderer);
		$$renderer.push(`<!----></button> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/accordion/Accordion.svelte
function Accordion($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { items, multiple = false, variant = "default", bg = false, border = false, highlightActive = true, color, size = "md", arrow = "chevron", arrowPosition = "right", class: className = "", classes = {}, onchange, children } = $$props;
		function sanitizeSvg(html) {
			return html.replace(/on\w+\s*=/gi, "").replace(/<script/gi, "&lt;script");
		}
		const accent = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		const accentBg = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		let openIds = new Set(items.filter((i) => i.defaultOpen).map((i) => i.id));
		const sizeMap = {
			sm: {
				px: "px-3",
				py: "py-2.5",
				text: "text-xs",
				content: "text-xs",
				icon: 14,
				arrowBox: 20
			},
			md: {
				px: "px-4",
				py: "py-3.5",
				text: "text-sm",
				content: "text-sm",
				icon: 16,
				arrowBox: 24
			},
			lg: {
				px: "px-5",
				py: "py-4",
				text: "text-base",
				content: "text-base",
				icon: 18,
				arrowBox: 28
			}
		};
		const s = derived(() => sizeMap[size]);
		const arrows = {
			chevron: {
				closed: "<path d=\"m6 9 6 6 6-6\"/>",
				open: "<path d=\"m6 9 6 6 6-6\"/>"
			},
			plus: {
				closed: "<path d=\"M12 5v14\"/><path d=\"M5 12h14\"/>",
				open: "<path d=\"M5 12h14\"/>"
			},
			arrow: {
				closed: "<path d=\"m9 18 6-6-6-6\"/>",
				open: "<path d=\"m9 18 6-6-6-6\"/>"
			},
			dot: {
				closed: "<circle cx=\"12\" cy=\"12\" r=\"4\"/>",
				open: "<circle cx=\"12\" cy=\"12\" r=\"4\"/>"
			}
		};
		function arrowRotation(isOpen) {
			if (arrow === "plus" || arrow === "dot") return "";
			if (arrow === "arrow") return isOpen ? "rotate(90deg)" : "rotate(0deg)";
			return isOpen ? "rotate(180deg)" : "rotate(0deg)";
		}
		function rootStyle() {
			switch (variant) {
				case "default": return `border-radius:0.75rem;border:1px solid ${border ? typeof border === "string" ? border : "var(--karbon-border)" : "var(--karbon-border)"};overflow:hidden;`;
				case "bordered": return `border-radius:0.75rem;border:1px solid ${border ? typeof border === "string" ? border : "var(--karbon-border)" : "var(--karbon-border)"};overflow:hidden;`;
				case "separated": return "";
				case "ghost": return "";
				case "filled": return `border-radius:0.75rem;overflow:hidden;`;
				case "colored": return `border-radius:0.75rem;overflow:hidden;`;
				default: return "";
			}
		}
		function itemStyle(isOpen, isLast) {
			switch (variant) {
				case "separated": return `border-radius:0.75rem;border:1px solid ${border ? typeof border === "string" ? border : "var(--karbon-border)" : isOpen ? accent() : "var(--karbon-border)"};overflow:hidden;margin-bottom:0.5rem;${isOpen ? `box-shadow:0 0 0 1px color-mix(in srgb,${accent()} 15%,transparent),0 2px 8px color-mix(in srgb,${accent()} 8%,transparent);` : ""}`;
				case "filled": {
					const bc = border ? typeof border === "string" ? border : "var(--karbon-border)" : isOpen ? `color-mix(in srgb,${accent()} 15%,transparent)` : "var(--karbon-border)";
					return `background:${isOpen ? `color-mix(in srgb,${accentBg()} 6%,transparent)` : "transparent"};${!isLast ? `border-bottom:1px solid ${bc};` : ""}`;
				}
				case "colored": {
					const bc = border ? typeof border === "string" ? border : "var(--karbon-border)" : isOpen ? `color-mix(in srgb,${accent()} 20%,transparent)` : "var(--karbon-border)";
					return `background:${isOpen ? `color-mix(in srgb,${accentBg()} 12%,transparent)` : "var(--karbon-bg-2)"};${!isLast ? `border-bottom:1px solid ${bc};` : ""}${isOpen ? `box-shadow:inset 3px 0 0 ${accent()};` : ""}transition:all 0.2s ease;`;
				}
				case "ghost": return `${!isLast ? `border-bottom:1px solid ${border ? typeof border === "string" ? border : "var(--karbon-border)" : "var(--karbon-border)"};` : ""}`;
				default: return `${!isLast ? `border-bottom:1px solid ${border ? typeof border === "string" ? border : "var(--karbon-border)" : "var(--karbon-border)"};` : ""}`;
			}
		}
		function triggerStyle(isOpen) {
			if (!highlightActive) return "color:var(--karbon-text);";
			if (variant === "bordered" && isOpen) return `background:color-mix(in srgb,${accent()} 6%,transparent);color:${accent()};`;
			if (variant === "colored" && isOpen) return `color:${accent()};`;
			return `color:${isOpen ? accent() : "var(--karbon-text)"};`;
		}
		function arrowStyle(isOpen) {
			const base = `width:${s().arrowBox}px;height:${s().arrowBox}px;display:inline-flex;align-items:center;justify-content:center;border-radius:6px;transition:all 0.25s cubic-bezier(0.16,1,0.3,1);flex-shrink:0;`;
			if (isOpen) return `${base}background:color-mix(in srgb,${accent()} 15%,transparent);color:${accent()};transform:${arrowRotation(true)};`;
			return `${base}background:transparent;color:var(--karbon-text-4);transform:${arrowRotation(false)};`;
		}
		$$renderer.push(`<div${attr_class(classes?.root ?? className)}${attr_style(`${stringify(rootStyle())}${stringify(bg === true ? "background:var(--karbon-bg-card);" : typeof bg === "string" ? `background:${bg};` : "")}`)}><!--[-->`);
		const each_array = ensure_array_like(items);
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let item = each_array[index];
			const isOpen = openIds.has(item.id);
			const isLast = index === items.length - 1;
			$$renderer.push(`<div${attr_class(classes?.item ?? "")}${attr_style(itemStyle(isOpen, isLast))}><button type="button"${attr("disabled", item.disabled, true)}${attr_class(`w-full flex items-center gap-3 ${stringify(s().px)} ${stringify(s().py)} ${stringify(s().text)} font-medium text-left transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${stringify(classes?.trigger ?? "")}`)}${attr_style(triggerStyle(isOpen))}>`);
			if (arrowPosition === "left" && arrow !== "none") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span${attr_style(arrowStyle(isOpen))}${attr_class(classes?.arrow ?? "")}><svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24"${attr("fill", arrow === "dot" ? "currentColor" : "none")}${attr("stroke", arrow === "dot" ? "none" : "currentColor")} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${html(isOpen ? arrows[arrow].open : arrows[arrow].closed)}</svg></span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (item.icon) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="shrink-0 opacity-60">${html(sanitizeSvg(item.icon))}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="flex-1 min-w-0"><div class="flex items-center gap-2"><span>${escape_html(item.title)}</span> `);
			if (item.description && !isOpen) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="font-normal truncate hidden sm:inline" style="color:var(--karbon-text-4);font-size:0.85em;">— ${escape_html(item.description)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (item.description && isOpen) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="font-normal mt-0.5" style="color:var(--karbon-text-3);font-size:0.85em;">${escape_html(item.description)}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (arrowPosition === "right" && arrow !== "none") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span${attr_style(arrowStyle(isOpen))}${attr_class(classes?.arrow ?? "")}><svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24"${attr("fill", arrow === "dot" ? "currentColor" : "none")}${attr("stroke", arrow === "dot" ? "none" : "currentColor")} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${html(isOpen ? arrows[arrow].open : arrows[arrow].closed)}</svg></span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></button> `);
			if (isOpen) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div${attr_class(`${stringify(s().px)} pb-4 ${stringify(s().content)} ${stringify(classes?.content ?? "")}`)} style="color:var(--karbon-text-2);animation:karbon-accordion-slide 0.25s cubic-bezier(0.16,1,0.3,1);">`);
				if (children) {
					$$renderer.push("<!--[0-->");
					children($$renderer, {
						item,
						index
					});
					$$renderer.push(`<!---->`);
				} else if (item.content) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<p class="leading-relaxed">${escape_html(item.content)}</p>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/tabs/Tabs.svelte
function Tabs($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { tabs, active = tabs[0]?.id ?? "", variant = "underline", color, size = "md", fullWidth = false, vertical = false, class: className = "", classes = {}, onchange, panel } = $$props;
		const accent = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		derived(() => color ? `var(--karbon-${color}-400)` : "var(--karbon-primary)");
		const sizeMap = {
			sm: {
				px: "px-3",
				py: "py-1.5",
				text: "text-xs",
				badge: "text-[9px] px-1 py-px",
				gap: "gap-1.5"
			},
			md: {
				px: "px-4",
				py: "py-2.5",
				text: "text-sm",
				badge: "text-[10px] px-1.5 py-px",
				gap: "gap-2"
			},
			lg: {
				px: "px-5",
				py: "py-3",
				text: "text-base",
				badge: "text-xs px-1.5 py-0.5",
				gap: "gap-2"
			}
		};
		const s = derived(() => sizeMap[size]);
		function sanitizeSvg(html) {
			return html.replace(/on\w+\s*=/gi, "").replace(/<script/gi, "&lt;script");
		}
		function tabStyle(isActive) {
			switch (variant) {
				case "underline": return isActive ? `color:${accent()};` : "color:var(--karbon-text-3);";
				case "pills": return isActive ? `background:${accent()};color:white;` : "color:var(--karbon-text-3);background:transparent;";
				case "bordered": return isActive ? `background:var(--karbon-bg-card);color:${accent()};border-color:var(--karbon-border);border-bottom-color:var(--karbon-bg-card);` : "color:var(--karbon-text-3);border-color:transparent;";
				case "segment": return isActive ? `background:var(--karbon-bg-card);color:${accent()};box-shadow:0 1px 3px rgba(0,0,0,0.1);` : "color:var(--karbon-text-3);background:transparent;";
				default: return "";
			}
		}
		function listStyle() {
			switch (variant) {
				case "underline": return `border-bottom:1px solid var(--karbon-border);`;
				case "pills": return "";
				case "bordered": return `border-bottom:1px solid var(--karbon-border);`;
				case "segment": return `background:var(--karbon-bg-2);padding:3px;border-radius:0.625rem;`;
				default: return "";
			}
		}
		function tabShapeClass() {
			switch (variant) {
				case "pills": return "rounded-lg";
				case "bordered": return "rounded-t-lg border border-b-0";
				case "segment": return "rounded-lg";
				default: return "";
			}
		}
		$$renderer.push(`<div${attr_class(`${stringify(vertical ? "flex gap-4" : "")} ${stringify(classes?.root ?? className)}`)}><div${attr_class(`${stringify(vertical ? "flex flex-col shrink-0" : "flex")} ${stringify(fullWidth && !vertical ? "[&>*]:flex-1" : "")} ${stringify(s().gap)} ${stringify(classes?.list ?? "")}`)}${attr_style(listStyle())} role="tablist"${attr("aria-orientation", vertical ? "vertical" : "horizontal")}><!--[-->`);
		const each_array = ensure_array_like(tabs);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let tab = each_array[$$index];
			const isActive = active === tab.id;
			$$renderer.push(`<button type="button" role="tab"${attr("aria-selected", isActive)}${attr("disabled", tab.disabled, true)}${attr_class(`relative ${stringify(s().px)} ${stringify(s().py)} ${stringify(s().text)} font-medium transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${stringify(tabShapeClass())} ${stringify(fullWidth ? "text-center" : "")} inline-flex items-center ${stringify(s().gap)} whitespace-nowrap ${stringify(classes?.tab ?? "")}`)}${attr_style(tabStyle(isActive))}>`);
			if (tab.icon) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="shrink-0">${html(sanitizeSvg(tab.icon))}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <span>${escape_html(tab.label)}</span> `);
			if (tab.badge != null) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span${attr_class(`rounded-full font-semibold ${stringify(s().badge)}`)}${attr_style(`background:${stringify(isActive ? `color-mix(in srgb,${accent()} 20%,transparent)` : "var(--karbon-bg-2)")};color:${stringify(isActive ? accent() : "var(--karbon-text-3)")};`)}>${escape_html(tab.badge)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (variant === "underline" && isActive) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span${attr_class(`absolute ${stringify(vertical ? "right-0 top-0 bottom-0 w-0.5" : "bottom-0 left-0 right-0 h-0.5")} ${stringify(classes?.indicator ?? "")}`)}${attr_style(`background:${stringify(accent())};border-radius:1px;animation:karbon-tab-indicator 0.2s ease;`)}></span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></button>`);
		}
		$$renderer.push(`<!--]--></div> `);
		if (panel) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`${stringify(vertical ? "flex-1" : "mt-4")} ${stringify(classes?.panel ?? "")}`)} role="tabpanel" style="animation:karbon-tab-panel 0.2s ease;">`);
			panel($$renderer, active);
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { active });
	});
}
//#endregion
//#region ../packages/ui-svelte/src/breadcrumb/Breadcrumb.svelte
function Breadcrumb($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { items, separator = "chevron", variant = "default", color, size = "md", collapse = 0, class: className = "", classes = {} } = $$props;
		function sanitizeSvg(html) {
			return html.replace(/on\w+\s*=/gi, "").replace(/<script/gi, "&lt;script");
		}
		const accent = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		const sizeMap = {
			sm: {
				text: "text-xs",
				gap: "gap-1",
				icon: 12,
				sepSize: 10,
				px: "px-1.5 py-0.5"
			},
			md: {
				text: "text-sm",
				gap: "gap-1.5",
				icon: 14,
				sepSize: 12,
				px: "px-2 py-0.5"
			},
			lg: {
				text: "text-base",
				gap: "gap-2",
				icon: 16,
				sepSize: 14,
				px: "px-2.5 py-1"
			}
		};
		const s = derived(() => sizeMap[size]);
		const separators = {
			chevron: "<path d=\"m9 18 6-6-6-6\"/>",
			slash: "<line x1=\"16\" y1=\"4\" x2=\"8\" y2=\"20\"/>",
			dot: "<circle cx=\"12\" cy=\"12\" r=\"3\"/>",
			arrow: "<path d=\"M5 12h14\"/><path d=\"m12 5 7 7-7 7\"/>",
			dash: "<line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/>"
		};
		const displayItems = derived(() => {
			if (collapse <= 0 || items.length <= collapse + 2) return items;
			return [
				items[0],
				{
					label: "...",
					href: void 0,
					icon: void 0
				},
				...items.slice(-collapse)
			];
		});
		const finalItems = derived(() => displayItems());
		$$renderer.push(`<nav aria-label="Breadcrumb"${attr_class(classes?.root ?? className)}><ol${attr_class(`flex flex-wrap items-center ${stringify(s().gap)} ${stringify(s().text)}`)}><!--[-->`);
		const each_array = ensure_array_like(finalItems());
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let item = each_array[i];
			const isLast = i === finalItems().length - 1;
			const isEllipsis = item.label === "...";
			if (i > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<li${attr_class(`select-none ${stringify(classes?.separator ?? "")}`)} aria-hidden="true" style="color:var(--karbon-text-4);">`);
				if (separators[separator]) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().sepSize)}${attr("height", s().sepSize)} viewBox="0 0 24 24"${attr("fill", separator === "dot" ? "currentColor" : "none")}${attr("stroke", separator === "dot" ? "none" : "currentColor")} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${html(separators[separator])}</svg>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<span>${escape_html(separator)}</span>`);
				}
				$$renderer.push(`<!--]--></li>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <li${attr_class(classes?.item ?? "")}>`);
			if (isEllipsis) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<button${attr_class(`rounded-md transition-colors cursor-pointer ${stringify(s().px)}`)} style="color:var(--karbon-text-3);" aria-label="Afficher le chemin complet">···</button>`);
			} else if (isLast) {
				$$renderer.push("<!--[1-->");
				if (variant === "pills") {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span${attr_class(`inline-flex items-center ${stringify(s().gap)} rounded-full font-medium ${stringify(s().px)}`)}${attr_style(`background:color-mix(in srgb,${stringify(accent())} 15%,transparent);color:${stringify(accent())};`)}>`);
					if (item.icon) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="shrink-0">${html(sanitizeSvg(item.icon))}</span>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> ${escape_html(item.label)}</span>`);
				} else if (variant === "bordered") {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<span${attr_class(`inline-flex items-center ${stringify(s().gap)} rounded-md font-medium ${stringify(s().px)}`)}${attr_style(`border:1px solid ${stringify(accent())};color:${stringify(accent())};`)}>`);
					if (item.icon) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="shrink-0">${html(sanitizeSvg(item.icon))}</span>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> ${escape_html(item.label)}</span>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<span${attr_class(`inline-flex items-center ${stringify(s().gap)} font-semibold ${stringify(classes?.active ?? "")}`)}${attr_style(`color:${stringify(color ? accent() : "var(--karbon-text)")};`)}>`);
					if (item.icon) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="shrink-0">${html(sanitizeSvg(item.icon))}</span>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> ${escape_html(item.label)}</span>`);
				}
				$$renderer.push(`<!--]-->`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<a${attr("href", item.href || "#")}${attr_class(`inline-flex items-center ${stringify(s().gap)} transition-colors ${stringify(classes?.link ?? "")} ${stringify(variant === "pills" ? `rounded-full ${s().px}` : "")} ${stringify(variant === "bordered" ? `rounded-md ${s().px}` : "")}`)} style="color:var(--karbon-text-3);">`);
				if (item.icon) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="shrink-0">${html(sanitizeSvg(item.icon))}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> ${escape_html(item.label)}</a>`);
			}
			$$renderer.push(`<!--]--></li>`);
		}
		$$renderer.push(`<!--]--></ol></nav>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/tooltip/Tooltip.svelte
function Tooltip($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { text = "", position = "top", color, variant = "dark", size = "md", delay = 200, arrow = true, maxWidth = "250px", nowrap = false, content, class: className = "", classes = {}, children } = $$props;
		const sizeMap = {
			sm: {
				px: "6px 10px",
				text: "11px",
				arrow: 4
			},
			md: {
				px: "8px 12px",
				text: "12px",
				arrow: 5
			},
			lg: {
				px: "10px 14px",
				text: "13px",
				arrow: 6
			}
		};
		derived(() => sizeMap[size]);
		const accent = derived(() => color ? `var(--karbon-${color}-500)` : "");
		derived(() => {
			switch (variant) {
				case "dark": return "rgba(15,10,30,0.95)";
				case "light": return "rgba(255,255,255,0.97)";
				case "colored": return accent() || "var(--karbon-primary)";
				default: return "rgba(15,10,30,0.95)";
			}
		});
		derived(() => {
			switch (variant) {
				case "dark": return "rgba(255,255,255,0.92)";
				case "light": return "rgba(15,10,30,0.85)";
				case "colored": return "white";
				default: return "rgba(255,255,255,0.92)";
			}
		});
		$$renderer.push(`<div${attr_class(`relative inline-flex ${stringify(classes?.root ?? className)}`)}>`);
		children($$renderer);
		$$renderer.push(`<!----> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/avatar/Avatar.svelte
function Avatar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { src = "", alt = "", name = "", size = "md", color, class: className = "", classes = {} } = $$props;
		const sizeClasses = {
			xs: "w-6 h-6 text-[10px]",
			sm: "w-8 h-8 text-xs",
			md: "w-10 h-10 text-sm",
			lg: "w-14 h-14 text-lg",
			xl: "w-20 h-20 text-2xl"
		};
		const initials = derived(() => (name || alt || "A").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase());
		const showImage = derived(() => src && true);
		const colorStyle = derived(() => {
			if (!color) return "";
			return `background:color-mix(in srgb,var(--karbon-${color}-500) 15%,transparent);color:var(--karbon-${color}-400)`;
		});
		const defaultBgClass = derived(() => color ? "" : "bg-[var(--karbon-bg-2,#e8e6f0)] text-[var(--karbon-text-2,#5a567e)]");
		$$renderer.push(`<div${attr_class(`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden font-semibold ${stringify(defaultBgClass())} ${stringify(sizeClasses[size])} ${stringify(classes?.root ?? className)}`)}${attr_style(colorStyle())}>`);
		if (showImage()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img${attr("src", src)}${attr("alt", alt || name)} class="w-full h-full object-cover" onerror="this.__e=event"/>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<span>${escape_html(initials())}</span>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/progress/Progress.svelte
function Progress($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value = 0, max = 100, color, size = "md", variant = "default", shape = "rounded", label = false, labelFormat, indeterminate = false, animated = false, segments, class: className = "", classes = {}, children } = $$props;
		const percent = derived(() => Math.min(Math.max(value / max * 100, 0), 100));
		const accent = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		const accentLight = derived(() => color ? `var(--karbon-${color}-400)` : "var(--karbon-primary)");
		const sizeMap = {
			xs: {
				track: 2,
				fontSize: "9px",
				showInside: false
			},
			sm: {
				track: 4,
				fontSize: "10px",
				showInside: false
			},
			md: {
				track: 8,
				fontSize: "11px",
				showInside: false
			},
			lg: {
				track: 12,
				fontSize: "11px",
				showInside: true
			},
			xl: {
				track: 20,
				fontSize: "12px",
				showInside: true
			}
		};
		const s = derived(() => sizeMap[size]);
		const shapeMap = {
			rounded: "9999px",
			square: "0",
			pill: "9999px"
		};
		const radius = derived(() => shapeMap[shape]);
		function formatLabel(v, m) {
			if (labelFormat) return labelFormat(v, m);
			return `${Math.round(v / m * 100)}%`;
		}
		function barStyle(clr) {
			const bg = clr ? `var(--karbon-${clr}-500)` : accent();
			const bgLight = clr ? `var(--karbon-${clr}-400)` : accentLight();
			switch (variant) {
				case "striped": return `background:repeating-linear-gradient(45deg,${bg},${bg} 10px,color-mix(in srgb,${bg} 70%,transparent) 10px,color-mix(in srgb,${bg} 70%,transparent) 20px);`;
				case "gradient": return `background:linear-gradient(90deg,color-mix(in srgb,${bg} 60%,transparent),${bg},${bgLight});`;
				case "glow": return `background:${bg};box-shadow:0 0 8px color-mix(in srgb,${bg} 50%,transparent),0 0 20px color-mix(in srgb,${bg} 20%,transparent);`;
				default: return `background:${bg};`;
			}
		}
		const showLabel = derived(() => label === true || label === "outside" || label === "top" || label === "inside");
		const labelPos = derived(() => label === "inside" ? "inside" : label === "top" ? "top" : "outside");
		$$renderer.push(`<div${attr_class(classes?.root ?? className, "svelte-14kici9")}>`);
		if (showLabel() && labelPos() === "top") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex items-center justify-between mb-1.5 svelte-14kici9">`);
			if (children) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span${attr_class(`text-xs font-medium ${stringify(classes?.label ?? "")}`, "svelte-14kici9")} style="color:var(--karbon-text-2);">`);
				children($$renderer);
				$$renderer.push(`<!----></span>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<span class="svelte-14kici9"></span>`);
			}
			$$renderer.push(`<!--]--> <span${attr_class(`text-xs font-semibold ${stringify(classes?.label ?? "")}`, "svelte-14kici9")}${attr_style(`color:${stringify(accent())};`)}>${escape_html(formatLabel(value, max))}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div${attr_class(`w-full overflow-hidden relative ${stringify(classes?.track ?? "")}`, "svelte-14kici9")}${attr_style(`height:${stringify(s().track)}px;border-radius:${stringify(radius())};background:var(--karbon-border,rgba(255,255,255,0.08));`)} role="progressbar"${attr("aria-valuenow", indeterminate ? void 0 : value)}${attr("aria-valuemax", max)}>`);
		if (indeterminate) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`absolute h-full ${stringify(classes?.bar ?? "")}`, "svelte-14kici9")}${attr_style(`${stringify(barStyle())};border-radius:${stringify(radius())};animation:karbon-progress-indeterminate 1.5s ease-in-out infinite;width:40%;`)}></div>`);
		} else if (segments && segments.length > 0) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<div class="flex h-full svelte-14kici9"><!--[-->`);
			const each_array = ensure_array_like(segments);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let seg = each_array[$$index];
				const segPercent = Math.min(Math.max(seg.value / max * 100, 0), 100);
				$$renderer.push(`<div${attr_class(`h-full transition-all duration-500 ease-out first:rounded-l-inherit last:rounded-r-inherit ${stringify(classes?.bar ?? "")}`, "svelte-14kici9")}${attr_style(`width:${stringify(segPercent)}%;${stringify(barStyle(seg.color))}`)}${attr("title", seg.label || `${Math.round(segPercent)}%`)}></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attr_class(`h-full transition-all duration-500 ease-out ${stringify(classes?.bar ?? "")} ${stringify(animated ? "karbon-progress-animated" : "")}`, "svelte-14kici9")}${attr_style(`width:${stringify(percent())}%;border-radius:${stringify(radius())};${stringify(barStyle())}`)}></div> `);
			if (showLabel() && labelPos() === "inside" && s().showInside && percent() > 10) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span${attr_class(`absolute right-2 top-1/2 -translate-y-1/2 font-bold ${stringify(classes?.label ?? "")}`, "svelte-14kici9")}${attr_style(`font-size:${stringify(s().fontSize)};color:white;text-shadow:0 1px 2px rgba(0,0,0,0.3);`)}>${escape_html(formatLabel(value, max))}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></div> `);
		if (showLabel() && labelPos() === "outside") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex items-center justify-between mt-1.5 svelte-14kici9">`);
			if (children) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span${attr_class(`text-xs ${stringify(classes?.label ?? "")}`, "svelte-14kici9")} style="color:var(--karbon-text-3);">`);
				children($$renderer);
				$$renderer.push(`<!----></span>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<span class="svelte-14kici9"></span>`);
			}
			$$renderer.push(`<!--]--> <span${attr_class(`text-xs font-semibold ${stringify(classes?.label ?? "")}`, "svelte-14kici9")}${attr_style(`color:${stringify(accent())};`)}>${escape_html(formatLabel(value, max))}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/skeleton/Skeleton.svelte
function Skeleton($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { variant = "text", width = "100%", height, lines = 1, class: className = "", classes = {} } = $$props;
		const baseClass = "animate-pulse bg-[var(--karbon-border,rgba(0,0,0,0.07))]";
		const variantDefaults = {
			text: {
				h: "0.875rem",
				rounded: "rounded"
			},
			circle: {
				h: "3rem",
				rounded: "rounded-full"
			},
			rect: {
				h: "8rem",
				rounded: "rounded-lg"
			}
		};
		const v = derived(() => variantDefaults[variant]);
		if (variant === "text" && lines > 1) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`space-y-2 ${stringify(classes?.root ?? className)}`)}><!--[-->`);
			const each_array = ensure_array_like(Array(lines));
			for (let i = 0, $$length = each_array.length; i < $$length; i++) {
				each_array[i];
				$$renderer.push(`<div${attr_class(`${stringify(baseClass)} ${stringify(v().rounded)}`)}${attr_style(`width: ${stringify(i === lines - 1 ? "66%" : width)}; height: ${stringify(height ?? v().h)}`)}></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else if (variant === "circle") {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<div${attr_class(`${stringify(baseClass)} ${stringify(v().rounded)} aspect-square ${stringify(classes?.root ?? className)}`)}${attr_style(`width: ${stringify(width === "100%" ? height ?? v().h : width)}; height: ${stringify(height ?? v().h)}`)}></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attr_class(`${stringify(baseClass)} ${stringify(v().rounded)} ${stringify(classes?.root ?? className)}`)}${attr_style(`width: ${stringify(width)}; height: ${stringify(height ?? v().h)}`)}></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/divider/Divider.svelte
function Divider($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { direction = "horizontal", variant = "solid", color, thickness = 1, label = "", labelPosition = "center", icon, spacing = "md", class: className = "", classes = {} } = $$props;
		const lineColor = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-border)");
		const labelColor = derived(() => color ? `var(--karbon-${color}-400)` : "var(--karbon-text-4)");
		const spacingMap = {
			none: "0",
			sm: "0.5rem",
			md: "1rem",
			lg: "1.5rem",
			xl: "2.5rem"
		};
		const pad = derived(() => spacingMap[spacing]);
		function lineStyle() {
			switch (variant) {
				case "solid": return `background:${lineColor()};`;
				case "dashed": return `background:transparent;border-top:${thickness}px dashed ${lineColor()};height:0;`;
				case "dotted": return `background:transparent;border-top:${thickness}px dotted ${lineColor()};height:0;`;
				case "gradient": return `background:linear-gradient(90deg,transparent,${lineColor()},transparent);`;
				default: return `background:${lineColor()};`;
			}
		}
		function verticalLineStyle() {
			switch (variant) {
				case "solid": return `background:${lineColor()};`;
				case "dashed": return `background:transparent;border-left:${thickness}px dashed ${lineColor()};width:0;`;
				case "dotted": return `background:transparent;border-left:${thickness}px dotted ${lineColor()};width:0;`;
				case "gradient": return `background:linear-gradient(180deg,transparent,${lineColor()},transparent);`;
				default: return `background:${lineColor()};`;
			}
		}
		const hasLabel = derived(() => !!label || !!icon);
		if (direction === "vertical") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`inline-flex self-stretch items-center ${stringify(classes?.root ?? className)}`)}${attr_style(`padding:0 ${stringify(pad())};`)}>`);
			if (hasLabel()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="flex flex-col items-center gap-2 h-full"><div class="flex-1"${attr_style(`${stringify(verticalLineStyle())}width:${stringify(variant === "solid" || variant === "gradient" ? `${thickness}px` : "0")};min-height:8px;`)}></div> `);
				if (icon) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="shrink-0"${attr_style(`color:${stringify(labelColor())};`)}>`);
					icon($$renderer);
					$$renderer.push(`<!----></span>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<span${attr_class(`text-[10px] font-medium shrink-0 [writing-mode:vertical-lr] ${stringify(classes?.label ?? "")}`)}${attr_style(`color:${stringify(labelColor())};`)}>${escape_html(label)}</span>`);
				}
				$$renderer.push(`<!--]--> <div class="flex-1"${attr_style(`${stringify(verticalLineStyle())}width:${stringify(variant === "solid" || variant === "gradient" ? `${thickness}px` : "0")};min-height:8px;`)}></div></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div${attr_style(`${stringify(verticalLineStyle())}width:${stringify(variant === "solid" || variant === "gradient" ? `${thickness}px` : "0")};height:100%;`)}></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else if (hasLabel()) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<div${attr_class(`flex items-center gap-3 ${stringify(classes?.root ?? className)}`)}${attr_style(`padding:${stringify(pad())} 0;`)}><div${attr_class(`${stringify(labelPosition === "left" ? "w-8" : "flex-1")} ${stringify(classes?.line ?? "")}`)}${attr_style(`${stringify(lineStyle())}height:${stringify(variant === "solid" || variant === "gradient" ? `${thickness}px` : "0")};min-width:8px;`)}></div> <div class="flex items-center gap-2 shrink-0">`);
			if (icon) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span${attr_style(`color:${stringify(labelColor())};`)}>`);
				icon($$renderer);
				$$renderer.push(`<!----></span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (label) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span${attr_class(`text-xs font-medium ${stringify(classes?.label ?? "")}`)}${attr_style(`color:${stringify(labelColor())};`)}>${escape_html(label)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div${attr_class(`${stringify(labelPosition === "right" ? "w-8" : "flex-1")} ${stringify(classes?.line ?? "")}`)}${attr_style(`${stringify(lineStyle())}height:${stringify(variant === "solid" || variant === "gradient" ? `${thickness}px` : "0")};min-width:8px;`)}></div></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attr_class(`w-full ${stringify(classes?.root ?? className)}`)}${attr_style(`${stringify(lineStyle())}height:${stringify(variant === "solid" || variant === "gradient" ? `${thickness}px` : "0")};margin:${stringify(pad())} 0;`)}></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/kbd/Kbd.svelte
function Kbd($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { keys, class: className = "", classes = {} } = $$props;
		$$renderer.push(`<span${attr_class(`inline-flex items-center gap-1 ${stringify(classes?.root ?? className)}`)}><!--[-->`);
		const each_array = ensure_array_like(keys);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let key = each_array[i];
			if (i > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="text-[var(--karbon-text-4,#b5b2cc)] text-xs">+</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <kbd${attr_class(`inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-md border border-[var(--karbon-border,rgba(0,0,0,0.07))] bg-[var(--karbon-bg-2,#e8e6f0)] text-[var(--karbon-text-2,#5a567e)] text-[11px] font-mono font-medium shadow-sm ${stringify(classes?.key ?? "")}`)}>${escape_html(key)}</kbd>`);
		}
		$$renderer.push(`<!--]--></span>`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/editor/RichTextEditor.svelte
function RichTextEditor($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value = "", placeholder = "Rédigez votre contenu...", media, theme = "default", toolbar = "standard", toolbarMode = "fixed", tokens = [], class: className = "" } = $$props;
		const toolbarPresets = {
			minimal: [[
				"bold",
				"italic",
				"underline"
			], ["link"]],
			standard: [
				[
					"bold",
					"italic",
					"underline",
					"strikethrough"
				],
				[
					"h2",
					"h3",
					"h4"
				],
				[
					"bulletList",
					"orderedList",
					"blockquote"
				],
				["link", "image"],
				["code", "hr"],
				["source"]
			],
			full: [
				[
					"bold",
					"italic",
					"underline",
					"strikethrough"
				],
				[
					"h2",
					"h3",
					"h4"
				],
				[
					"bulletList",
					"orderedList",
					"blockquote"
				],
				[
					"alignLeft",
					"alignCenter",
					"alignRight"
				],
				[
					"link",
					"image",
					"video",
					"table"
				],
				[
					"code",
					"hr",
					"color"
				],
				[
					"clearFormat",
					"source",
					"fullscreen"
				]
			]
		};
		const resolvedToolbar = derived(() => typeof toolbar === "string" ? toolbarPresets[toolbar] ?? toolbarPresets.standard : toolbar);
		derived(() => resolvedToolbar().flat());
		derived(() => {
			const groups = [];
			for (const t of tokens) if (t.group && !groups.includes(t.group)) groups.push(t.group);
			return groups;
		});
		derived(() => tokens);
		let activeFormats = /* @__PURE__ */ new Set();
		let wordCount = 0;
		let charCount = 0;
		let mediaCurrentPath = "";
		let mediaEntries = [];
		derived(() => {
			const parts = mediaCurrentPath.split("/").filter(Boolean);
			return parts.map((part, i) => ({
				label: part,
				path: parts.slice(0, i + 1).join("/")
			}));
		});
		derived(() => mediaEntries);
		const FONT_SIZES = [
			"10px",
			"12px",
			"14px",
			"16px",
			"18px",
			"20px",
			"24px",
			"28px",
			"32px",
			"36px",
			"48px"
		];
		function isActive(cmd) {
			return activeFormats.has(cmd) ? "rte-btn rte-btn-active" : "rte-btn";
		}
		$$renderer.push(`<div role="toolbar" aria-label="Éditeur de texte riche"${attr_class(`rte-wrapper ${stringify("")} ${stringify(className)}`, "svelte-1dm7ezo")}><div class="rte-toolbar svelte-1dm7ezo"${attr_style(`${stringify(toolbarMode === "floating" ? "display:none;" : "")}${stringify(toolbarMode === "bottom" ? "order:2;" : "")}`)}><button type="button" class="rte-btn svelte-1dm7ezo" title="Annuler (Ctrl+Z)" aria-label="Annuler"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg></button> <button type="button" class="rte-btn svelte-1dm7ezo" title="Rétablir" aria-label="Rétablir"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"></path></svg></button> <span class="rte-sep svelte-1dm7ezo"></span> <button type="button"${attr_class(clsx(isActive("p")), "svelte-1dm7ezo")} title="Paragraphe" aria-label="Paragraphe"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4v16"></path><path d="M17 4v16"></path><path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"></path></svg></button> <button type="button"${attr_class(`${stringify(isActive("h2"))} text-xs font-bold`, "svelte-1dm7ezo")} title="Titre 2">H2</button> <button type="button"${attr_class(`${stringify(isActive("h3"))} text-xs font-bold`, "svelte-1dm7ezo")} title="Titre 3">H3</button> <button type="button"${attr_class(`${stringify(isActive("h4"))} text-xs font-bold`, "svelte-1dm7ezo")} title="Titre 4">H4</button> <span class="rte-sep svelte-1dm7ezo"></span> <select class="rte-select svelte-1dm7ezo" title="Taille">`);
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`Taille`);
		});
		$$renderer.push(`<!--[-->`);
		const each_array = ensure_array_like(FONT_SIZES);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let size = each_array[$$index];
			$$renderer.option({ value: size }, ($$renderer) => {
				$$renderer.push(`${escape_html(size)}`);
			});
		}
		$$renderer.push(`<!--]--></select> <span class="rte-sep svelte-1dm7ezo"></span> <button type="button"${attr_class(clsx(isActive("bold")), "svelte-1dm7ezo")} title="Gras (Ctrl+B)" aria-label="Gras"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"></path></svg></button> <button type="button"${attr_class(clsx(isActive("italic")), "svelte-1dm7ezo")} title="Italique (Ctrl+I)" aria-label="Italique"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="10" y1="4" y2="4"></line><line x1="14" x2="5" y1="20" y2="20"></line><line x1="15" x2="9" y1="4" y2="20"></line></svg></button> <button type="button"${attr_class(clsx(isActive("underline")), "svelte-1dm7ezo")} title="Souligné (Ctrl+U)" aria-label="Souligné"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"></path><line x1="4" x2="20" y1="20" y2="20"></line></svg></button> <button type="button"${attr_class(clsx(isActive("strikeThrough")), "svelte-1dm7ezo")} title="Barré" aria-label="Barré"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"></path><path d="M14 12a4 4 0 0 1 0 8H6"></path><line x1="4" x2="20" y1="12" y2="12"></line></svg></button> <button type="button"${attr_class(clsx(isActive("subscript")), "svelte-1dm7ezo")} title="Indice" aria-label="Indice"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 5 8 8"></path><path d="m12 5-8 8"></path><path d="M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"></path></svg></button> <button type="button"${attr_class(clsx(isActive("superscript")), "svelte-1dm7ezo")} title="Exposant" aria-label="Exposant"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 19 8-8"></path><path d="m12 19-8-8"></path><path d="M20 9h-4c0-1.5.44-2 1.5-2.5S20 5.33 20 4c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"></path></svg></button> <span class="rte-sep svelte-1dm7ezo"></span> <div class="relative"><button type="button" class="rte-btn svelte-1dm7ezo" title="Couleur" aria-label="Couleur du texte"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"></path><path d="m5 2 5 5"></path><path d="M2 13h15"></path><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"></path></svg></button> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <button type="button" class="rte-btn svelte-1dm7ezo" title="Effacer formatage" aria-label="Effacer le formatage"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21a4.6 4.6 0 0 1 0-9h10a4.6 4.6 0 1 1 0 9H7Z"></path><path d="m3 3 18 18"></path></svg></button> <span class="rte-sep svelte-1dm7ezo"></span> <button type="button"${attr_class(clsx(isActive("justifyLeft")), "svelte-1dm7ezo")} title="Gauche" aria-label="Aligner à gauche"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"></line><line x1="15" x2="3" y1="12" y2="12"></line><line x1="17" x2="3" y1="18" y2="18"></line></svg></button> <button type="button"${attr_class(clsx(isActive("justifyCenter")), "svelte-1dm7ezo")} title="Centre" aria-label="Centrer"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"></line><line x1="17" x2="7" y1="12" y2="12"></line><line x1="19" x2="5" y1="18" y2="18"></line></svg></button> <button type="button"${attr_class(clsx(isActive("justifyRight")), "svelte-1dm7ezo")} title="Droite" aria-label="Aligner à droite"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"></line><line x1="21" x2="9" y1="12" y2="12"></line><line x1="21" x2="7" y1="18" y2="18"></line></svg></button> <button type="button"${attr_class(clsx(isActive("justifyFull")), "svelte-1dm7ezo")} title="Justifier" aria-label="Justifier"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"></line><line x1="21" x2="3" y1="12" y2="12"></line><line x1="21" x2="3" y1="18" y2="18"></line></svg></button> <span class="rte-sep svelte-1dm7ezo"></span> <button type="button"${attr_class(clsx(isActive("insertunorderedlist")), "svelte-1dm7ezo")} title="Puces" aria-label="Liste à puces"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"></line><line x1="8" x2="21" y1="12" y2="12"></line><line x1="8" x2="21" y1="18" y2="18"></line><line x1="3" x2="3.01" y1="6" y2="6"></line><line x1="3" x2="3.01" y1="12" y2="12"></line><line x1="3" x2="3.01" y1="18" y2="18"></line></svg></button> <button type="button"${attr_class(clsx(isActive("insertorderedlist")), "svelte-1dm7ezo")} title="Numéros" aria-label="Liste numérotée"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="21" y1="6" y2="6"></line><line x1="10" x2="21" y1="12" y2="12"></line><line x1="10" x2="21" y1="18" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg></button> <button type="button" class="rte-btn svelte-1dm7ezo" title="Indenter" aria-label="Indenter"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 8 7 12 3 16"></polyline><line x1="21" x2="11" y1="12" y2="12"></line><line x1="21" x2="11" y1="6" y2="6"></line><line x1="21" x2="11" y1="18" y2="18"></line></svg></button> <button type="button" class="rte-btn svelte-1dm7ezo" title="Désindenter" aria-label="Désindenter"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 8 3 12 7 16"></polyline><line x1="21" x2="11" y1="12" y2="12"></line><line x1="21" x2="11" y1="6" y2="6"></line><line x1="21" x2="11" y1="18" y2="18"></line></svg></button> <button type="button"${attr_class(clsx(isActive("blockquote")), "svelte-1dm7ezo")} title="Citation" aria-label="Citation"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z"></path></svg></button> <button type="button" class="rte-btn svelte-1dm7ezo" title="Bloc de code" aria-label="Bloc de code"><code class="text-[11px]">&lt;/></code></button> <button type="button" class="rte-btn svelte-1dm7ezo" title="Séparateur" aria-label="Séparateur"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path></svg></button> <span class="rte-sep svelte-1dm7ezo"></span> <button type="button" class="rte-btn svelte-1dm7ezo" title="Lien (Ctrl+K)" aria-label="Insérer un lien"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></button> <button type="button" class="rte-btn svelte-1dm7ezo" title="Image" aria-label="Insérer une image"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg></button> `);
		if (media) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button type="button" class="rte-btn svelte-1dm7ezo" title="Médias" aria-label="Explorer les médias"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"></path></svg></button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <button type="button" class="rte-btn svelte-1dm7ezo" title="Tableau" aria-label="Insérer un tableau"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M3 15h18"></path></svg></button> <button type="button" class="rte-btn svelte-1dm7ezo" title="Vidéo / Embed" aria-label="Insérer une vidéo"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg></button> `);
		if (tokens.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="rte-sep svelte-1dm7ezo"></span> <div style="position:relative;display:inline-flex;"><button type="button" class="rte-btn svelte-1dm7ezo" title="Inserer un bloc" aria-label="Inserer un bloc"${attr_style(`gap:4px;padding:0 8px;${stringify("")}`)}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg> <span style="font-size:11px;font-weight:600;">Bloc</span> <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"${attr_style(`opacity:0.5;margin-left:2px;transition:transform 0.15s;${stringify("")}`)}><path d="m6 9 6 6 6-6"></path></svg></button> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="flex-1"></div> <button type="button"${attr_class("rte-btn", "svelte-1dm7ezo")} title="Rechercher (Ctrl+H)" aria-label="Rechercher et remplacer"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg></button> <button type="button"${attr_class("rte-btn", "svelte-1dm7ezo")} title="Source" aria-label="Mode source HTML"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="m10 13-2 2 2 2"></path><path d="m14 17 2-2-2-2"></path></svg></button> <button type="button" class="rte-btn svelte-1dm7ezo" title="Plein écran" aria-label="Plein écran">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" x2="14" y1="3" y2="10"></line><line x1="3" x2="10" y1="21" y2="14"></line></svg>`);
		$$renderer.push(`<!--]--></button></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->  `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<div contenteditable="true"${attr_class(`rte-content rte-${stringify(theme)} outline-none ${stringify("")}`, "svelte-1dm7ezo")}${attr_style("min-height: 500px; max-height: 800px; overflow-y: auto;")}${attr("data-placeholder", placeholder)} role="textbox" aria-multiline="true"></div>`);
		$$renderer.push(`<!--]--> <div class="rte-statusbar svelte-1dm7ezo"><span>${escape_html(wordCount)} mot${escape_html(wordCount !== 1 ? "s" : "")}</span> <span>${escape_html(charCount)} caractère${escape_html(charCount !== 1 ? "s" : "")}</span> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="flex-1"></div> <span>Double-clic : propriétés · Clic droit : menu contextuel</span></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { value });
	});
}
//#endregion
//#region ../packages/ui-svelte/src/data/DataTable.svelte
function DataTable($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data = [], columns = [], selectable = false, searchable = false, striped = false, hoverable = true, stickyHeader = false, loading = false, loadingRows = 5, compact = false, bordered = false, color, perPage = 0, showPerPage = false, exportable = false, exportFilename = "export", class: className = "", classes = {}, onselect, onrowclick, onsort, cell, empty, children } = $$props;
		const accent = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		let search = "";
		let sortKey = "";
		let sortDir = null;
		let currentPage = 1;
		let itemsPerPage = perPage || 20;
		let selected = /* @__PURE__ */ new Set();
		let activeFilters = {};
		derived(() => columns.filter((c) => c.searchable !== false && c.type !== "actions" && c.type !== "image").map((c) => c.key));
		const filteredData = derived(() => {
			let result = [...data];
			for (const [key, filterVal] of Object.entries(activeFilters)) if (filterVal) result = result.filter((row) => String(row[key]) === filterVal);
			return result;
		});
		const totalPages = derived(() => perPage > 0 ? Math.ceil(filteredData().length / itemsPerPage) : 1);
		const paginatedData = derived(() => perPage > 0 ? filteredData().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : filteredData());
		const visibleColumns = derived(() => columns.filter((c) => !c.hidden));
		const allSelected = derived(() => filteredData().length > 0 && selected.size === filteredData().length);
		const someSelected = derived(() => selected.size > 0 && !allSelected());
		function formatCell(col, row) {
			const val = row[col.key];
			if (col.render) return col.render(val, row);
			if (col.type === "boolean") return val ? "✓" : "✗";
			if (col.type === "date" && val) try {
				return new Date(val).toLocaleDateString("fr-FR");
			} catch {
				return String(val);
			}
			if (col.type === "number" && val != null) return Number(val).toLocaleString("fr-FR");
			return val != null ? String(val) : "";
		}
		const pad = derived(() => compact ? "px-3 py-1.5" : "px-4 py-3");
		const hpad = derived(() => compact ? "px-3 py-2" : "px-4 py-3");
		if (children) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`rounded-xl overflow-hidden ${stringify(classes?.root ?? className)}`)} style="background:var(--karbon-bg-card);border:1px solid var(--karbon-border);"><div class="overflow-x-auto"><table class="min-w-full [&amp;_thead_tr]:border-b [&amp;_thead_tr]:border-[var(--karbon-border)] [&amp;_thead_tr]:bg-[var(--karbon-bg-2)] [&amp;_thead_th]:text-xs [&amp;_thead_th]:font-semibold [&amp;_thead_th]:uppercase [&amp;_thead_th]:tracking-wider [&amp;_thead_th]:px-4 [&amp;_thead_th]:py-3 [&amp;_thead_th]:text-left [&amp;_thead_th]:text-[var(--karbon-text-3)] [&amp;_tbody_tr]:border-b [&amp;_tbody_tr]:border-[var(--karbon-border)] [&amp;_tbody_tr:last-child]:border-b-0 [&amp;_tbody_tr:hover]:bg-[var(--karbon-nav-hover-bg)] [&amp;_td]:px-4 [&amp;_td]:py-3 [&amp;_td]:text-sm [&amp;_td]:text-[var(--karbon-text-2)]">`);
			children($$renderer);
			$$renderer.push(`<!----></table></div></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attr_class(`rounded-xl overflow-hidden ${stringify(classes?.root ?? className)}`)} style="background:var(--karbon-bg-card);border:1px solid var(--karbon-border);">`);
			if (searchable || selectable || exportable || showPerPage) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div${attr_class(`flex items-center gap-3 px-4 py-3 ${stringify(classes?.search ?? "")}`)} style="border-bottom:1px solid var(--karbon-border);">`);
				if (searchable) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="relative flex-1 max-w-xs"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-2.5 top-1/2 -translate-y-1/2" style="color:var(--karbon-text-4);"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg> <input type="text"${attr("value", search)} placeholder="Rechercher..." class="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none" style="background:var(--karbon-bg-input);border:1px solid var(--karbon-border-input);color:var(--karbon-text);"/></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (someSelected() || allSelected()) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="text-xs font-medium"${attr_style(`color:${stringify(accent())};`)}>${escape_html(selected.size)} selectionne${escape_html(selected.size > 1 ? "s" : "")}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div class="flex-1"></div> `);
				if (showPerPage) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<select class="text-xs rounded-md px-2 py-1 outline-none" style="background:var(--karbon-bg-input);border:1px solid var(--karbon-border-input);color:var(--karbon-text);"><!--[-->`);
					const each_array = ensure_array_like([
						10,
						20,
						50,
						100
					]);
					for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
						let n = each_array[$$index];
						$$renderer.option({
							value: n,
							selected: n === itemsPerPage
						}, ($$renderer) => {
							$$renderer.push(`${escape_html(n)}/page`);
						});
					}
					$$renderer.push(`<!--]--></select>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (exportable) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<button class="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors" style="color:var(--karbon-text-2);background:var(--karbon-bg-input);" aria-label="Exporter CSV"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg> CSV</button>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <span class="text-[11px]" style="color:var(--karbon-text-4);">${escape_html(filteredData().length)} resultat${escape_html(filteredData().length > 1 ? "s" : "")}</span></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="overflow-x-auto"><table class="w-full"><thead><tr style="background:var(--karbon-bg-2);border-bottom:1px solid var(--karbon-border);"${attr_class(stickyHeader ? "sticky top-0 z-10" : "")}>`);
			if (selectable) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<th${attr_class(`${stringify(hpad())} w-10`)}><div class="w-4 h-4 rounded border cursor-pointer"${attr_style(`display:grid;place-items:center;box-sizing:border-box;border-color:${stringify(allSelected() || someSelected() ? accent() : "var(--karbon-border-input)")};background:${stringify(allSelected() ? accent() : "transparent")};`)} role="checkbox"${attr("aria-checked", allSelected() ? "true" : someSelected() ? "mixed" : "false")}${attr("tabindex", 0)}>`);
				if (allSelected()) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`);
				} else if (someSelected()) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"${attr("stroke", accent())} stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></th>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--><!--[-->`);
			const each_array_1 = ensure_array_like(visibleColumns());
			for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
				let col = each_array_1[$$index_2];
				$$renderer.push(`<th${attr_class(`${stringify(hpad())} text-left text-[11px] font-semibold uppercase tracking-wider ${stringify(col.sortable ? "cursor-pointer select-none" : "")}`)}${attr_style(`color:var(--karbon-text-3);${stringify(col.width ? `width:${col.width};` : "")}${stringify(col.align ? `text-align:${col.align};` : "")}${stringify(col.sticky ? "position:sticky;left:0;z-index:5;background:var(--karbon-bg-2);" : "")}`)}><div class="flex items-center gap-1.5"><span>${escape_html(col.label || col.key)}</span> `);
				if (col.sortable) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="inline-flex flex-col" style="line-height:0;"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24"${attr("fill", sortKey === col.key && sortDir === "asc" ? accent() : "var(--karbon-text-4)")} stroke="none"><path d="M12 5l7 9H5z"></path></svg> <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24"${attr("fill", sortKey === col.key && sortDir === "desc" ? accent() : "var(--karbon-text-4)")} stroke="none"><path d="M12 19l7-9H5z"></path></svg></span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (col.filterable && col.options) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<select class="text-[10px] rounded px-1 py-0.5 outline-none ml-1" style="background:var(--karbon-bg-input);border:1px solid var(--karbon-border-input);color:var(--karbon-text-2);">`);
					$$renderer.option({ value: "" }, ($$renderer) => {
						$$renderer.push(`Tous`);
					});
					$$renderer.push(`<!--[-->`);
					const each_array_2 = ensure_array_like(col.options);
					for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
						let opt = each_array_2[$$index_1];
						$$renderer.option({ value: opt }, ($$renderer) => {
							$$renderer.push(`${escape_html(opt)}`);
						});
					}
					$$renderer.push(`<!--]--></select>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></th>`);
			}
			$$renderer.push(`<!--]--></tr></thead><tbody>`);
			if (loading) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<!--[-->`);
				const each_array_3 = ensure_array_like(Array(loadingRows));
				for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
					each_array_3[i];
					$$renderer.push(`<tr style="border-bottom:1px solid var(--karbon-border);">`);
					if (selectable) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<td${attr_class(pad())}><div class="w-4 h-4 rounded animate-pulse" style="background:var(--karbon-bg-2);"></div></td>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--><!--[-->`);
					const each_array_4 = ensure_array_like(visibleColumns());
					for (let $$index_3 = 0, $$length = each_array_4.length; $$index_3 < $$length; $$index_3++) {
						let col = each_array_4[$$index_3];
						$$renderer.push(`<td${attr_class(pad())}><div class="h-4 rounded animate-pulse"${attr_style(`background:var(--karbon-bg-2);width:${stringify(col.type === "actions" ? "60px" : `${40 + Math.random() * 40}%`)};animation-delay:${stringify(i * 80)}ms;`)}></div></td>`);
					}
					$$renderer.push(`<!--]--></tr>`);
				}
				$$renderer.push(`<!--]-->`);
			} else if (paginatedData().length === 0) {
				$$renderer.push("<!--[1-->");
				$$renderer.push(`<tr><td${attr("colspan", visibleColumns().length + (selectable ? 1 : 0))} class="text-center py-12">`);
				if (empty) {
					$$renderer.push("<!--[0-->");
					empty($$renderer);
					$$renderer.push(`<!---->`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<div style="color:var(--karbon-text-4);"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2 opacity-50"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg> <p class="text-sm">Aucun resultat</p> `);
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div>`);
				}
				$$renderer.push(`<!--]--></td></tr>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--[-->`);
				const each_array_5 = ensure_array_like(paginatedData());
				for (let i = 0, $$length = each_array_5.length; i < $$length; i++) {
					let row = each_array_5[i];
					const gi = perPage > 0 ? (currentPage - 1) * itemsPerPage + i : i;
					const isSel = selected.has(gi);
					$$renderer.push(`<tr${attr_class(hoverable && !isSel ? "transition-colors" : "")}${attr_style(`border-bottom:1px solid var(--karbon-border);background:${stringify(isSel ? `color-mix(in srgb,${accent()} 8%,transparent)` : striped && i % 2 ? "var(--karbon-bg-2)" : "transparent")};${stringify(onrowclick ? "cursor:pointer;" : "")}`)}>`);
					if (selectable) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<td${attr_class(pad())}><div class="w-4 h-4 rounded border cursor-pointer"${attr_style(`display:grid;place-items:center;box-sizing:border-box;border-color:${stringify(isSel ? accent() : "var(--karbon-border-input)")};background:${stringify(isSel ? accent() : "transparent")};`)} role="checkbox"${attr("aria-checked", isSel)}${attr("tabindex", 0)}>`);
						if (isSel) {
							$$renderer.push("<!--[0-->");
							$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`);
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--></div></td>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--><!--[-->`);
					const each_array_6 = ensure_array_like(visibleColumns());
					for (let $$index_5 = 0, $$length = each_array_6.length; $$index_5 < $$length; $$index_5++) {
						let col = each_array_6[$$index_5];
						$$renderer.push(`<td${attr_class(`${stringify(pad())} text-sm ${stringify(classes?.cell ?? "")}`)}${attr_style(`color:var(--karbon-text-2);${stringify(col.align ? `text-align:${col.align};` : "")}${stringify(col.sticky ? "position:sticky;left:0;z-index:1;background:inherit;" : "")}`)}>`);
						if (cell) {
							$$renderer.push("<!--[0-->");
							cell($$renderer, col, row, i);
							$$renderer.push(`<!---->`);
						} else if (col.type === "image") {
							$$renderer.push("<!--[1-->");
							if (row[col.key]) {
								$$renderer.push("<!--[0-->");
								$$renderer.push(`<img${attr("src", row[col.key])} alt="" class="h-8 w-8 rounded object-cover"/>`);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]-->`);
						} else if (col.type === "boolean") {
							$$renderer.push("<!--[2-->");
							if (row[col.key]) {
								$$renderer.push("<!--[0-->");
								$$renderer.push(`<span class="inline-flex items-center justify-center w-5 h-5 rounded-full" style="background:color-mix(in srgb,var(--karbon-success) 15%,transparent);color:var(--karbon-success);"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>`);
							} else {
								$$renderer.push("<!--[-1-->");
								$$renderer.push(`<span class="inline-flex items-center justify-center w-5 h-5 rounded-full" style="background:color-mix(in srgb,var(--karbon-danger) 15%,transparent);color:var(--karbon-danger);"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></span>`);
							}
							$$renderer.push(`<!--]-->`);
						} else {
							$$renderer.push("<!--[-1-->");
							$$renderer.push(`${escape_html(formatCell(col, row))}`);
						}
						$$renderer.push(`<!--]--></td>`);
					}
					$$renderer.push(`<!--]--></tr>`);
				}
				$$renderer.push(`<!--]-->`);
			}
			$$renderer.push(`<!--]--></tbody></table></div> `);
			if (perPage > 0 && totalPages() > 1) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div${attr_class(`flex items-center justify-between px-4 py-3 ${stringify(classes?.footer ?? "")}`)} style="border-top:1px solid var(--karbon-border);"><span class="text-xs" style="color:var(--karbon-text-4);">${escape_html((currentPage - 1) * itemsPerPage + 1)}–${escape_html(Math.min(currentPage * itemsPerPage, filteredData().length))} sur ${escape_html(filteredData().length)}</span> <div class="flex items-center gap-1"><button${attr("disabled", currentPage <= 1, true)} class="px-2 py-1 rounded text-xs cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" style="color:var(--karbon-text-2);" aria-label="Precedent"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg></button> <!--[-->`);
				const each_array_7 = ensure_array_like(Array(Math.min(totalPages(), 7)));
				for (let i = 0, $$length = each_array_7.length; i < $$length; i++) {
					each_array_7[i];
					const p = totalPages() <= 7 ? i + 1 : currentPage <= 4 ? i + 1 : currentPage >= totalPages() - 3 ? totalPages() - 6 + i : currentPage - 3 + i;
					if (p >= 1 && p <= totalPages()) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<button class="w-7 h-7 rounded text-xs font-medium cursor-pointer transition-all"${attr_style(`background:${stringify(p === currentPage ? accent() : "transparent")};color:${stringify(p === currentPage ? "white" : "var(--karbon-text-3)")};`)}>${escape_html(p)}</button>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]-->`);
				}
				$$renderer.push(`<!--]--> <button${attr("disabled", currentPage >= totalPages(), true)} class="px-2 py-1 rounded text-xs cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" style="color:var(--karbon-text-2);" aria-label="Suivant"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg></button></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region ../packages/ui-svelte/src/data/Pagination.svelte
function Pagination($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** If set, renders <a> links instead of buttons */
		let { page = 1, total, perPage = 20, baseUrl, color, size = "md", variant = "default", showTotal = true, showFirstLast = true, showInfo = true, siblings = 1, class: className = "", classes = {}, onchange } = $$props;
		const accent = derived(() => color ? `var(--karbon-${color}-500)` : "var(--karbon-primary)");
		const totalPages = derived(() => Math.max(1, Math.ceil(total / perPage)));
		const pages = derived(() => {
			const items = [];
			const left = Math.max(2, page - siblings);
			const right = Math.min(totalPages() - 1, page + siblings);
			items.push(1);
			if (left > 2) items.push("...");
			for (let i = left; i <= right; i++) items.push(i);
			if (right < totalPages() - 1) items.push("...");
			if (totalPages() > 1) items.push(totalPages());
			return items;
		});
		const sizeMap = {
			sm: {
				btn: "w-7 h-7 text-xs",
				arrow: "w-7 h-7",
				icon: 14,
				gap: "gap-0.5"
			},
			md: {
				btn: "w-8 h-8 text-sm",
				arrow: "w-8 h-8",
				icon: 16,
				gap: "gap-1"
			},
			lg: {
				btn: "w-10 h-10 text-base",
				arrow: "w-10 h-10",
				icon: 18,
				gap: "gap-1.5"
			}
		};
		const s = derived(() => sizeMap[size]);
		function btnStyle(p) {
			const isActive = p === page;
			switch (variant) {
				case "default": return isActive ? `background:${accent()};color:white;` : "background:transparent;color:var(--karbon-text-3);";
				case "outline": return isActive ? `background:transparent;color:${accent()};border:1.5px solid ${accent()};` : "background:transparent;color:var(--karbon-text-3);border:1.5px solid transparent;";
				case "flat": return isActive ? `background:color-mix(in srgb,${accent()} 15%,transparent);color:${accent()};` : "background:transparent;color:var(--karbon-text-3);";
				case "minimal": return isActive ? `background:transparent;color:${accent()};font-weight:700;` : "background:transparent;color:var(--karbon-text-3);";
				default: return "";
			}
		}
		function arrowStyle(enabled) {
			return enabled ? "color:var(--karbon-text-2);cursor:pointer;" : "color:var(--karbon-text-4);opacity:0.4;cursor:not-allowed;pointer-events:none;";
		}
		const startItem = derived(() => (page - 1) * perPage + 1);
		const endItem = derived(() => Math.min(page * perPage, total));
		if (totalPages() > 1 || showInfo) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<nav${attr_class(`flex items-center justify-between flex-wrap gap-3 ${stringify(classes?.root ?? className)}`)}>`);
			if (showInfo) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="text-xs" style="color: var(--karbon-text-4);">${escape_html(startItem())}–${escape_html(endItem())} sur ${escape_html(total)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div${attr_class(`flex items-center ${stringify(s().gap)}`)}>`);
			if (showFirstLast) {
				$$renderer.push("<!--[0-->");
				if (baseUrl) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<a${attr("href", `${stringify(baseUrl)}?page=1`)}${attr_class(`inline-flex items-center justify-center rounded-lg transition-colors ${stringify(s().arrow)} ${stringify(classes?.button ?? "")}`)}${attr_style(arrowStyle(page > 1))} aria-label="Premiere page"><svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17-5-5 5-5"></path><path d="m18 17-5-5 5-5"></path></svg></a>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<button${attr("disabled", page <= 1, true)}${attr_class(`inline-flex items-center justify-center rounded-lg transition-colors ${stringify(s().arrow)} ${stringify(classes?.button ?? "")}`)}${attr_style(arrowStyle(page > 1))} aria-label="Premiere page"><svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17-5-5 5-5"></path><path d="m18 17-5-5 5-5"></path></svg></button>`);
				}
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (baseUrl) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<a${attr("href", `${stringify(baseUrl)}?page=${stringify(Math.max(1, page - 1))}`)}${attr_class(`inline-flex items-center justify-center rounded-lg transition-colors ${stringify(s().arrow)} ${stringify(classes?.button ?? "")}`)}${attr_style(arrowStyle(page > 1))} aria-label="Page precedente"><svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg></a>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<button${attr("disabled", page <= 1, true)}${attr_class(`inline-flex items-center justify-center rounded-lg transition-colors ${stringify(s().arrow)} ${stringify(classes?.button ?? "")}`)}${attr_style(arrowStyle(page > 1))} aria-label="Page precedente"><svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg></button>`);
			}
			$$renderer.push(`<!--]--> <!--[-->`);
			const each_array = ensure_array_like(pages());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let p = each_array[$$index];
				if (p === "...") {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span${attr_class(`${stringify(s().btn)} inline-flex items-center justify-center`)} style="color: var(--karbon-text-4);">…</span>`);
				} else if (baseUrl) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<a${attr("href", `${stringify(baseUrl)}?page=${stringify(p)}`)}${attr_class(`inline-flex items-center justify-center rounded-lg font-medium transition-all ${stringify(s().btn)} ${stringify(p === page ? classes?.active ?? "" : classes?.button ?? "")}`)}${attr_style(btnStyle(p))}>${escape_html(p)}</a>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<button${attr_class(`inline-flex items-center justify-center rounded-lg font-medium transition-all cursor-pointer ${stringify(s().btn)} ${stringify(p === page ? classes?.active ?? "" : classes?.button ?? "")}`)}${attr_style(btnStyle(p))}>${escape_html(p)}</button>`);
				}
				$$renderer.push(`<!--]-->`);
			}
			$$renderer.push(`<!--]--> `);
			if (baseUrl) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<a${attr("href", `${stringify(baseUrl)}?page=${stringify(Math.min(totalPages(), page + 1))}`)}${attr_class(`inline-flex items-center justify-center rounded-lg transition-colors ${stringify(s().arrow)} ${stringify(classes?.button ?? "")}`)}${attr_style(arrowStyle(page < totalPages()))} aria-label="Page suivante"><svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg></a>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<button${attr("disabled", page >= totalPages(), true)}${attr_class(`inline-flex items-center justify-center rounded-lg transition-colors ${stringify(s().arrow)} ${stringify(classes?.button ?? "")}`)}${attr_style(arrowStyle(page < totalPages()))} aria-label="Page suivante"><svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg></button>`);
			}
			$$renderer.push(`<!--]--> `);
			if (showFirstLast) {
				$$renderer.push("<!--[0-->");
				if (baseUrl) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<a${attr("href", `${stringify(baseUrl)}?page=${stringify(totalPages())}`)}${attr_class(`inline-flex items-center justify-center rounded-lg transition-colors ${stringify(s().arrow)} ${stringify(classes?.button ?? "")}`)}${attr_style(arrowStyle(page < totalPages()))} aria-label="Derniere page"><svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 17 5-5-5-5"></path><path d="m6 17 5-5-5-5"></path></svg></a>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<button${attr("disabled", page >= totalPages(), true)}${attr_class(`inline-flex items-center justify-center rounded-lg transition-colors ${stringify(s().arrow)} ${stringify(classes?.button ?? "")}`)}${attr_style(arrowStyle(page < totalPages()))} aria-label="Derniere page"><svg xmlns="http://www.w3.org/2000/svg"${attr("width", s().icon)}${attr("height", s().icon)} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 17 5-5-5-5"></path><path d="m6 17 5-5-5-5"></path></svg></button>`);
				}
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></nav>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { page });
	});
}
//#endregion
export { Toggle as A, Dialog as C, Slider as D, Badge as E, Button as F, Select as M, Input as N, Radio as O, ButtonBrand as P, Toast as S, AlertMessage as T, CodeBlock as _, Divider as a, Card as b, Avatar as c, Tabs as d, Accordion as f, ImgZoom as g, ImageCompare as h, Kbd as i, Checkbox as j, Textarea as k, Tooltip as l, Carousel as m, DataTable as n, Skeleton as o, Dropdown as p, RichTextEditor as r, Progress as s, Pagination as t, Breadcrumb as u, EmptyState as v, Modal as w, ImgBox as x, PageHeader as y };
