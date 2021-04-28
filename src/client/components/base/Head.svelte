<script>
    import { cpath } from "@routes";
    export let name;
</script>

<svelte:head>
    {#if $cpath.props}
        <title>{`${name} — ${$cpath.props.title}`}</title>
        <meta name="keywords" content={$cpath.props.keywords} />
        <meta name="description" content={$cpath.props.description} />
    {/if}
</svelte:head>

<style lang="scss">
    :global(title) {
        text-transform: capitalize;
    }
</style>
