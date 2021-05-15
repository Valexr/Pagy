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
    $: console.log(crumbs);
</script>

<ul class="breadcrumb">
    <li class="breadcrumb-item">
        <a href="/home"> <i class="icon icon-home" /></a>
    </li>
    {#each crumbs as link}
        <li class="breadcrumb-item">
            <a href="/{link}">{link}</a>
        </li>
    {/each}
</ul>

<style lang="scss">
</style>
