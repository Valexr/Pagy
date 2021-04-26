<script>
    import { router, meta } from "tinro";
    import { routes, cpath, cmeta, chistory } from "@routes";
    import Viewpoint from "svelte-viewpoint";

    export let route = {},
        duration = 100;

    $: $cmeta = meta();
    $: $chistory = { ...$chistory, [$cpath.alias]: $cmeta.url };
</script>

<Viewpoint
    delay={duration}
    timeout={500}
    {...route}
    router={$router}
    meta={$cmeta}
/>
