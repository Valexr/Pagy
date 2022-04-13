{#await component()}
    <div class="docs-demo columns">
        <div class="column col-12 text-center">
            <div class="loading loading-lg"></div>
        </div>
    </div>
{:then Cmp}
    <svelte:component this="{Cmp.default}" router="{$router}" meta="{$cmeta}" />
{/await}

<script lang="ts">
    import { router, meta } from 'tinro';
    import { routes, cpath, cmeta, chistory } from '@routes';
    import { addMessages, init, getLocaleFromNavigator, register, getLocaleFromPathname } from 'svelte-intl-precompile';

    register('en', () => import('@lang/en.json'));
    register('ru', () => import('@lang/ru.json'));
    init({
        fallbackLocale: 'en',
        // initialLocale: "getLocaleFromNavigator()",
        initialLocale: getLocaleFromPathname(/^\/(.*?)\//),
    });

    export let component = null;

    $: $cmeta = meta();

    $: $cpath =
        routes.find((route) =>
            $cmeta.pattern && $cmeta.params.lang !== 'api' ? $cmeta.pattern === route.match : $cmeta.url === route.match
        ) || routes[routes.length - 1];
</script>
