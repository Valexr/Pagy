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

    export let crumbs = [];
    $: crumbs = $path.split("/").filter(Boolean);
</script>

<ul class="breadcrumb">
    <li class="breadcrumb-item">
        <a href="/"> <i class="icon icon-home" /></a>
    </li>
    {#each crumbs as link}
        <li class="breadcrumb-item">
            <a href="/">{link}</a>
        </li>
    {/each}
</ul>

<style lang="scss">
</style>
