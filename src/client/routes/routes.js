import { writable, derived, get } from 'svelte/store';
import { router, meta } from "tinro";

export const chistory = writable(JSON.parse(sessionStorage.getItem("chistory")) || { lang: 'en' });
chistory.subscribe(val => sessionStorage.setItem("chistory", JSON.stringify(val)));

export const cmeta = writable(JSON.parse(sessionStorage.getItem("cmeta")) || {});
cmeta.subscribe(val => sessionStorage.setItem("cmeta", JSON.stringify(val)));

export const cpath = writable(JSON.parse(sessionStorage.getItem("cpath")) || {});
cpath.subscribe(val => sessionStorage.setItem("cpath", JSON.stringify(val)));

export const routes = [
    {
        match: '/:lang',
        default: '/',
        alias: 'auth',
        menu: true,
        navbar: false,
        icon: 'emoji',
        component: () => import('@pages/auth.svelte'),
        props: { title: 'auth', keywords: 'keywords', description: 'description' }
    },
    {
        match: '/:lang/users',
        default: '/users?role=admin',
        alias: 'users',
        menu: true,
        navbar: true,
        icon: 'people',
        component: () => import('@pages/users.svelte'),
        props: { title: 'users', keywords: 'keywords', description: 'description' }
    },
    {
        match: '/:lang/pages',
        default: '/pages?locale=en&menu=header',
        alias: 'pages',
        menu: true,
        navbar: true,
        icon: 'bookmark',
        component: () => import('@pages/pages.svelte'),
        props: { title: 'pages', keywords: 'keywords', description: 'description' }
    },
    {
        match: '/:lang/plugins',
        default: '/plugins',
        alias: 'plugins',
        menu: true,
        navbar: true,
        icon: 'link',
        component: () => import('@pages/plugins.svelte'),
        props: { title: 'plugins', keywords: 'keywords', description: 'description' }
    },
    {
        match: '/:lang/locales',
        default: '/locales?region=Europe',
        alias: 'locales',
        menu: true,
        navbar: true,
        icon: 'location',
        component: () => import('@pages/locales.svelte'),
        props: { title: 'locales', keywords: 'keywords', description: 'description' }
    },
    {
        match: '/:lang/repository',
        default: '/repository',
        alias: 'repository',
        menu: true,
        navbar: true,
        icon: 'photo',
        component: () => import('@pages/repository.svelte'),
        props: { title: 'repository', keywords: 'keywords', description: 'description' }
    },
    {
        match: '/:lang/system',
        default: '/system',
        alias: 'system',
        menu: true,
        navbar: false,
        icon: 'time',
        component: () => import('@pages/system.svelte'),
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