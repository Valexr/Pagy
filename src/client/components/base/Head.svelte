<script>
    import { state } from 'svelte-pathfinder';
</script>

<svelte:head>
    <title>{$state.title}</title>
    <meta name="keywords" content={$state.keywords} />
    <meta name="description" content={$state.description} />
</svelte:head>
