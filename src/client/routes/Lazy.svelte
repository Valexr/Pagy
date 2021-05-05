<script>
    import { router, meta } from "tinro";
    import { routes, cpath, cmeta, chistory } from "@routes";

    export let component = null;

    $: $cmeta = meta();
    $: $chistory = {
        ...$chistory,
        [$cpath.alias]: $router.url.substring(3),
        lang: $cmeta.params.lang || "en",
        url: $router.url.substring(3),
        query: "?" + $router.url.split(/[?#]/)[1],
    };
    $: $cpath =
        routes.find((route) =>
            $cmeta.pattern && $cmeta.params.lang !== "api"
                ? $cmeta.pattern === route.match
                : $cmeta.url === route.match
        ) || routes[routes.length - 1];
</script>

{#await component()}
    <div class="docs-demo columns">
        <div class="column col-12 text-center">
            <div class="loading loading-lg" />
        </div>
    </div>
{:then Cmp}
    <svelte:component this={Cmp.default} router={$router} meta={$cmeta} />
{/await}
