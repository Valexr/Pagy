export const routes = [
    {
        match: '/',
        menu: true,
        component: () => import('@pages/auth.svelte'),
        props: { title: 'auth', keywords: 'keywords', description: 'description' }
    },
    {
        match: '/pages',
        menu: true,
        component: () => import('@pages/pages.svelte'),
        props: { title: 'pages' }
    },
    {
        match: '/users',
        menu: true,
        component: () => import('@pages/users.svelte'),
        props: { title: 'users' }
    },
    {
        match: '*',
        menu: false,
        component: () => import('@pages/error404.svelte'),
        props: { title: '404', keywords: 'keywords', description: 'description' }
    },
];
