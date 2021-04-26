<!-- Transition.svelte -->
<script>
    import { fade } from "svelte/transition";
    import { Route, router, meta } from "tinro";
    import { routes, Lazy, cpath, cmeta, chistory } from "@routes";

    $: id = $cpath ? $cpath.alias : $router.path === "/" ? "auth" : "404";
</script>

{#key $router.path}
    <main {id} class="container" in:fade={{ duration: 500 }}>
        <slot />
    </main>
{/key}

<style lang="scss">
    main {
        padding-top: 5em;
        &#auth {
            padding-top: 0;
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
