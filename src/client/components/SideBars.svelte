<script>
    import {
        url,
        path,
        pattern,
        query,
        fragment,
        click,
        state,
        back,
    } from "svelte-pathfinder";
    import { SideBar } from "@cmp";
</script>

{#if $fragment === "#sidebar"}
    <SideBar />
{/if}
