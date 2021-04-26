<script>
    import { fade } from "svelte/transition";
    import { Route, router } from "tinro";
    import { Lazy, path } from "@routes";

    $: mainclass = $router.path.split("/").filter(Boolean).join("-");
</script>

{#key $path}
    <main class="container {$path.alias}" in:fade={{ duration: 700 }}>
        <Route>
            <Route path={$path.match} let:meta>
                $path.match
                <Lazy component={$path.component} />
            </Route>
            <!-- <Route path="/" let:meta>
                <Lazy component={() => import("@pages/auth.svelte")} />
            </Route>
            <Route path="/users/*" let:meta>
                <Lazy component={() => import("@pages/users.svelte")} />
            </Route>
            <Route path="/pages/:locale/:menu" let:meta>
                <Lazy component={() => import("@pages/pages.svelte")} />
            </Route>
            <Route path="/plugins/*" let:meta>
                <Lazy component={() => import("@pages/plugins.svelte")} />
            </Route>
            <Route path="/locales/*" let:meta>
                <Lazy component={() => import("@pages/locales.svelte")} />
            </Route>
            <Route path="/repository/*" let:meta>
                <Lazy component={() => import("@pages/repository.svelte")} />
            </Route>
            <Route path="/system/*" let:meta>
                <Lazy component={() => import("@pages/system.svelte")} />
            </Route> -->
            <Route fallback let:meta>
                Meta-fallback: {JSON.stringify(meta)}
                <Lazy component={() => import("@pages/404.svelte")} />
            </Route>
        </Route>

        <!-- <Route path="/"><Lazy component={$path.component} /></Route>
        <Route path="/portfolio/*">
            <Route path="/">
                <h1>Portfolio introduction</h1>
                <nav>
                    <a href="/portfolio/sites">Sites</a>
                    <a href="/portfolio/photos">Photos</a>
                </nav>
            </Route>
            <Route path="/sites"><h1>Portfolio: Sites</h1></Route>
            <Route path="/photos"><h1>Portfolio: Photos</h1></Route>
        </Route>
        <Route path="/contacts"><Contacts /></Route> -->
    </main>
{/key}

<style lang="scss">
    main {
        padding: 4em 0 4em;
        &.auth {
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
