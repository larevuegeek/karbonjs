
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/accordion" | "/alert" | "/avatar" | "/badge" | "/breadcrumb" | "/buttonbrand" | "/button" | "/card" | "/carousel" | "/checkbox" | "/codeblock" | "/colors" | "/datatable" | "/dialog" | "/divider" | "/dropdown" | "/editor" | "/emptystate" | "/imagecompare" | "/image" | "/imgbox" | "/input" | "/kbd" | "/modal" | "/pageheader" | "/pagination" | "/progress" | "/radio" | "/select" | "/skeleton" | "/slider" | "/tabs" | "/textarea" | "/themes" | "/toast" | "/tooltip";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/accordion": Record<string, never>;
			"/alert": Record<string, never>;
			"/avatar": Record<string, never>;
			"/badge": Record<string, never>;
			"/breadcrumb": Record<string, never>;
			"/buttonbrand": Record<string, never>;
			"/button": Record<string, never>;
			"/card": Record<string, never>;
			"/carousel": Record<string, never>;
			"/checkbox": Record<string, never>;
			"/codeblock": Record<string, never>;
			"/colors": Record<string, never>;
			"/datatable": Record<string, never>;
			"/dialog": Record<string, never>;
			"/divider": Record<string, never>;
			"/dropdown": Record<string, never>;
			"/editor": Record<string, never>;
			"/emptystate": Record<string, never>;
			"/imagecompare": Record<string, never>;
			"/image": Record<string, never>;
			"/imgbox": Record<string, never>;
			"/input": Record<string, never>;
			"/kbd": Record<string, never>;
			"/modal": Record<string, never>;
			"/pageheader": Record<string, never>;
			"/pagination": Record<string, never>;
			"/progress": Record<string, never>;
			"/radio": Record<string, never>;
			"/select": Record<string, never>;
			"/skeleton": Record<string, never>;
			"/slider": Record<string, never>;
			"/tabs": Record<string, never>;
			"/textarea": Record<string, never>;
			"/themes": Record<string, never>;
			"/toast": Record<string, never>;
			"/tooltip": Record<string, never>
		};
		Pathname(): "/" | "/accordion" | "/alert" | "/avatar" | "/badge" | "/breadcrumb" | "/buttonbrand" | "/button" | "/card" | "/carousel" | "/checkbox" | "/codeblock" | "/colors" | "/datatable" | "/dialog" | "/divider" | "/dropdown" | "/editor" | "/emptystate" | "/imagecompare" | "/image" | "/imgbox" | "/input" | "/kbd" | "/modal" | "/pageheader" | "/pagination" | "/progress" | "/radio" | "/select" | "/skeleton" | "/slider" | "/tabs" | "/textarea" | "/themes" | "/toast" | "/tooltip";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}