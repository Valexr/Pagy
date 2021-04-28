import { writable, derived, get } from 'svelte/store';
import { router, meta } from "tinro";

export const chistory = writable(JSON.parse(sessionStorage.getItem("chistory")) || {});
chistory.subscribe(val => sessionStorage.setItem("chistory", JSON.stringify(val)));

export const cmeta = writable(JSON.parse(sessionStorage.getItem("cmeta")) || {});
cmeta.subscribe(val => sessionStorage.setItem("cmeta", JSON.stringify(val)));

export const cpath = writable(JSON.parse(sessionStorage.getItem("cpath")) || {});
cpath.subscribe(val => sessionStorage.setItem("cpath", JSON.stringify(val)));

// export const cpath = derived(cmeta, $cmeta => routes.find((route) => $cmeta.pattern ? $cmeta.pattern === route.match : $cmeta.url === route.match) || routes[routes.length - 1]);

export const routes = [
    {
        match: '/',
        alias: 'auth',
        menu: true,
        navbar: false,
        component: () => import('@pages/auth.svelte'),
        props: { title: 'auth', keywords: 'keywords', description: 'description' }
    },
    {
        match: '/users/:role',
        default: '/users/admin',
        alias: 'users',
        menu: true,
        navbar: true,
        component: () => import('@pages/users.svelte'),
        props: { title: 'users', keywords: 'keywords', description: 'description' }
    },
    {
        match: '/pages/:locale/:menu',
        default: '/pages/ru/header',
        alias: 'pages',
        menu: true,
        navbar: true,
        component: () => import('@pages/pages.svelte'),
        props: { title: 'pages', keywords: 'keywords', description: 'description' }
    },
    {
        match: '/plugins',
        alias: 'plugins',
        menu: true,
        navbar: true,
        component: () => import('@pages/plugins.svelte'),
        props: { title: 'plugins', keywords: 'keywords', description: 'description' }
    },
    {
        match: '/locales',
        alias: 'locales',
        menu: true,
        navbar: true,
        component: () => import('@/client/pages/locales.svelte'),
        props: { title: 'locales', keywords: 'keywords', description: 'description' }
    },
    {
        match: '/repository',
        alias: 'repository',
        menu: true,
        navbar: true,
        component: () => import('@/client/pages/repository.svelte'),
        props: { title: 'repository', keywords: 'keywords', description: 'description' }
    },
    {
        match: '/system',
        alias: 'system',
        menu: true,
        navbar: false,
        component: () => import('@/client/pages/system.svelte'),
        props: { title: 'system', keywords: 'keywords', description: 'description' }
    },
    {
        match: '*',
        alias: '404',
        menu: false,
        navbar: false,
        component: () => import('@pages/404.svelte'),
        props: { title: '404', keywords: 'keywords', description: 'description' }
    },
];