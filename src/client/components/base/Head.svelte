<script>
    import { url } from "svelte-pathfinder";
    import { page } from "@routes";
    export let name;
</script>

<svelte:head>
    {#if $page.props}
        <title>{`${name} — ${$page.props.title} + ${$url}`}</title>
        <meta name="keywords" content={$page.props.keywords} />
        <meta name="description" content={$page.props.description} />
    {/if}
</svelte:head>

<style lang="scss">
    :global(title) {
        text-transform: capitalize;
    }
</style>
