<script>
    import { fade } from "svelte/transition";
    import { Route, router, meta } from "tinro";
    import { routes, Lazy, cpath, cmeta, chistory } from "@routes";

    $: id = $cpath ? $cpath.alias : $router.path === "/" ? "auth" : "404";
</script>

{#key $router}
    <main {id} class="container" in:fade={{ duration: 700 }}>
        <Route>
            {#each routes.filter((route) => route.menu) as route}
                <Route path={route.match} let:meta>
                    <Lazy {route} />
                </Route>
            {/each}
            <Route fallback let:meta>
                fallback
                <Lazy route={routes[routes.length - 1]} />
            </Route>
        </Route>
    </main>
{/key}

<style lang="scss">
    main {
        padding: 4em 0 4em;
        &#auth {
            padding: 0;
            overflow: hidden;
            height: 100%;
            display: flex;
            flex-flow: column;
            justify-content: center;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
    }
</style>
