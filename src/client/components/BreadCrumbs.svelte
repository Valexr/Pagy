<script>
    import { router, meta } from "tinro";

    export let crumbs = [];
    $: crumbs = $router.path.split("/");
</script>

<ul class="breadcrumb">
    {#each crumbs as link}
        <li class="breadcrumb-item">
            <a href="/#">{link}</a>
        </li>
    {/each}
</ul>

<style lang="scss">
</style>
