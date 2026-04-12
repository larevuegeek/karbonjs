

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CrKtPBQ8.js","_app/immutable/chunks/B6-asBX0.js","_app/immutable/chunks/CwV-_Shr.js","_app/immutable/chunks/BpAyAfhb.js"];
export const stylesheets = ["_app/immutable/assets/0.BePGNfnW.css"];
export const fonts = [];
