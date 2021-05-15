import { readable, writable, derived, get } from 'svelte/store';
import {
    url,
    path,
    query,
    pattern,
    fragment,
    state,
    click,
    goto,
} from "svelte-pathfinder";
import { session, refresh } from "@api/auth";

export const routes = readable([
    {
        match: '/:lang/auth',
        default: '/auth',
        alias: 'auth',
        menu: false,
        navbar: false,
        icon: 'emoji',
        component: () => import('@pages/auth.svelte'),
        props: { title: 'auth', keywords: 'keywords', description: 'description' }
    },
    {
        match: '/:lang/home',
        default: '/home',
        alias: 'home',
        menu: true,
        navbar: false,
        icon: 'home',
        component: () => import('@pages/home.svelte'),
        props: { title: 'home', keywords: 'keywords', description: 'description' }
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
]);

export const page = derived([routes, pattern], ([$routes, $pattern]) => $routes.find((route) => $pattern(route.match)) || null)

export const history = writable(JSON.parse(sessionStorage.getItem("history")) || { lang: 'en' });
history.subscribe(val => sessionStorage.setItem("history", JSON.stringify(val)));

export const authed = derived(
    [session, page],
    ([$session, $page], set) => {
        if ($session.access_token) {
            const refreshable = $session.refresh_token && $session.refresh_token !== "undefined"
            if (refreshable) {
                set(true)
            }
            else {
                set(false)
            }
            // if (!$session.isValid && refreshable) {
            //     refresh().then((res) => {
            //         const { status, user } = res;
            //         switch (status) {
            //             case 401:
            //                 set(false)
            //                 break;
            //             case 200:
            //                 set(true)
            //                 break;
            //         }
            //     })
            // } else if ($session.isValid && refreshable) {
            //     set(true)
            // } else if (!$session.isValid && !refreshable) (
            //     set(false)
            // )
        } else set(false)
    }, false);