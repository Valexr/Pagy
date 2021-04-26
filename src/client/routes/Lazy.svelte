<script>
    import { router, meta } from "tinro";
    import { routes, cpath, cmeta, chistory } from "@routes";

    export let component = null;

    $: $cmeta = meta();
    $: $chistory = { ...$chistory, [$cpath.alias]: $cmeta.match };
    $: $cpath =
        routes.find((route) =>
            $cmeta.pattern
                ? $cmeta.pattern === route.match
                : $cmeta.url === route.match
        ) || routes[routes.length - 1];
</script>

{#await component()}
    Loading component...
{:then Cmp}
    <svelte:component this={Cmp.default} router={$router} meta={$cmeta} />
{/await}
