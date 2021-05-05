<script>
    import { Route, router, meta } from "tinro";
    import { routes, Lazy, Transition, cpath, cmeta, chistory } from "@routes";
    import {
        addMessages,
        init,
        getLocaleFromNavigator /*, register */,
        getLocaleFromPathname,
    } from "svelte-intl-precompile";
    import en from "@lang/en.json";
    import ru from "@lang/ru.json";
    // @ts-ignore
    addMessages("en", en);
    addMessages("ru", ru);
    // register('es', () => import('../../locales/en.js')); <-- use this approach if you want locales to be load lazily

    init({
        fallbackLocale: "en",
        // initialLocale: "getLocaleFromNavigator()",
        initialLocale: getLocaleFromPathname(/^\/(.*?)\//),
    });
    $: !$router.path.substring(0, 3).includes($chistory.lang)
        ? router.goto(`/${$chistory.lang + $router.url}`)
        : ``;
</script>

<Transition>
    <Route>
        {#each routes.filter((route) => route.menu) as route}
            <Route path={route.match} let:meta>
                <Lazy component={route.component} />
            </Route>
        {/each}
        <Route fallback let:meta>
            <Lazy component={routes[routes.length - 1].component} />
        </Route>
    </Route>
</Transition>

<style lang="scss"></style>
