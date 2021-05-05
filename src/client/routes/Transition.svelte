<!-- Transition.svelte -->
<script>
    import { fade } from "svelte/transition";
    import { Route, router, meta } from "tinro";
    import { routes, Lazy, cpath, cmeta, chistory } from "@routes";

    $: id = $cpath ? $cpath.alias : $router.path === "/" ? "auth" : "404";
</script>

<!-- {#await $router.path}
    <div class="docs-demo columns">
        <div class="column col-12 text-center">
            <div class="loading loading-lg" />
        </div>
    </div>
{:then} -->
{#key $router.path}
    <main {id} class="container" in:fade={{ duration: 500 }}>
        <slot />
    </main>
{/key}

<!-- {/await} -->
<style lang="scss">
    main {
        padding-bottom: 5em;
        &#auth {
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
