export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33'),
	() => import('./nodes/34'),
	() => import('./nodes/35'),
	() => import('./nodes/36'),
	() => import('./nodes/37'),
	() => import('./nodes/38')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/accordion": [3],
		"/alert": [4],
		"/avatar": [5],
		"/badge": [6],
		"/breadcrumb": [7],
		"/buttonbrand": [9],
		"/button": [8],
		"/card": [10],
		"/carousel": [11],
		"/checkbox": [12],
		"/codeblock": [13],
		"/colors": [14],
		"/datatable": [15],
		"/dialog": [16],
		"/divider": [17],
		"/dropdown": [18],
		"/editor": [19],
		"/emptystate": [20],
		"/imagecompare": [22],
		"/image": [21],
		"/imgbox": [23],
		"/input": [24],
		"/kbd": [25],
		"/modal": [26],
		"/pageheader": [27],
		"/pagination": [28],
		"/progress": [29],
		"/radio": [30],
		"/select": [31],
		"/skeleton": [32],
		"/slider": [33],
		"/tabs": [34],
		"/textarea": [35],
		"/themes": [36],
		"/toast": [37],
		"/tooltip": [38]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';